import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';

import { YoutubeService } from './youtube.service';
import { Movie } from './movie';
import { Observable } from 'rxjs';
import { forkJoin } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  sampleList: Array<string> = ['gTX2IDeJHTU', 'EIA8j3debIQ', '2Vv-BfVoq4g', 'iWZmdoY1aTE', 'u3ePPA0yzSU', 'eiDiKwbGfIY'];
  movies: Movie[] = [];
  amendedMovies: Movie[] = [];

  getMovies(perPage: number, offset: number): { movies: Movie[], totalMoviesCount: number } {
    return { movies: this.amendedMovies.slice(offset, offset + perPage), totalMoviesCount: this.amendedMovies.length };
  }

  addMovie(movie: Movie): void {
    this.movies.push(movie);
    this.amendedMovies.push(movie);
  }

  deleteMovie(movieId: string): void {
    this.movies = this.movies.filter(movie => movie.id !== movieId);
    this.amendedMovies = this.amendedMovies.filter(movie => movie.id !== movieId);
  }

  clearMoviesList(): void {
    this.movies = [];
    this.amendedMovies = [];
  }

  favouritesHandler(movieId: string, isFavourite: boolean, filterChecked: boolean): void {
    this.movies = this.movies.map(movie => movie.id === movieId ? {...movie, favourite: !isFavourite } : movie);
    const movies: Movie[] = this.amendedMovies.map(movie => movie.id === movieId ? {...movie, favourite: !isFavourite } : movie);
    this.amendedMovies = filterChecked ? movies.filter(movie => movie.id !== movieId) : movies;
  }

  favouritesFilterHandler(filterChecked: boolean): void {
    this.amendedMovies = filterChecked ? this.movies.filter(movie => movie.favourite) : this.movies;
  }

  sortingHandler(sortingOptions: Array<any>, selectedSortValue: string): void {  
    this.amendedMovies = sortingOptions.find(option => option.value === selectedSortValue).sortingFormula(this.amendedMovies);
  }

  uploadSampleList(): Observable<any> {
    return forkJoin(this.sampleList.map(sample => this.youtubeService.getYoutubeData(sample)));
  }

  responseFormatter(resp): Movie {
    const movieDetails = resp.items[0];
    const movie: Movie = {
      id: uuid(),
      movieId: movieDetails.id,
      title: movieDetails.snippet.localized.title,
      imageUrl: movieDetails.snippet.thumbnails.medium.url,
      viewCount: movieDetails.statistics.viewCount,
      likeCount: movieDetails.statistics.likeCount,
      favourite: false,
      createdAt: Date.now()
    };
    return movie;
  }

  constructor(private youtubeService: YoutubeService) { }
}
