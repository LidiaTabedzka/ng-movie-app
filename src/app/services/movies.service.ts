import { Injectable } from '@angular/core';

import { YoutubeService } from './youtube.service';
import { LocalStorageService } from './local-storage.service';
import { Movie } from '../movie';
import { Observable } from 'rxjs';
import { forkJoin } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  sampleList: Array<string> = ['gTX2IDeJHTU', 'EIA8j3debIQ', '2Vv-BfVoq4g', 'iWZmdoY1aTE', 'u3ePPA0yzSU', 'eiDiKwbGfIY'];
  movies: Movie[] = JSON.parse(localStorage.getItem('moviesList')) || [];
  filteredMovies: Movie[] = JSON.parse(localStorage.getItem('moviesList')) || [];

  getMovies(perPage: number, offset: number): { movies: Movie[], totalMoviesCount: number } {
    return { movies: this.filteredMovies.slice(offset, offset + perPage), totalMoviesCount: this.filteredMovies.length };
  }

  addMovie(movie: Movie): void {
    this.movies.unshift(movie);
    this.filteredMovies.unshift(movie);
    this.localStorageServie.setItem(this.filteredMovies);
  }

  deleteMovie(movieId: string): void {
    this.movies = this.movies.filter(movie => movie.id !== movieId);
    this.filteredMovies = this.filteredMovies.filter(movie => movie.id !== movieId);
    this.localStorageServie.setItem(this.filteredMovies);
  }

  clearMoviesList(): void {
    this.movies = [];
    this.filteredMovies = [];
    this.localStorageServie.removeItem();
  }

  favouritesHandler(movieId: string, isFavourite: boolean, filterChecked: boolean): void {
    this.movies = this.movies.map(movie => movie.id === movieId ? {...movie, favourite: !isFavourite } : movie);
    const movies: Movie[] = this.filteredMovies.map(movie => movie.id === movieId ? {...movie, favourite: !isFavourite } : movie);
    this.filteredMovies = filterChecked ? movies.filter(movie => movie.id !== movieId) : movies;
    this.localStorageServie.setItem(this.filteredMovies);
  }

  favouritesFilterHandler(filterChecked: boolean): void {
    this.filteredMovies = filterChecked ? this.movies.filter(movie => movie.favourite) : this.movies;
  }

  sortingHandler(sortingOptions: Array<any>, selectedSortValue: string): void {  
    this.filteredMovies = sortingOptions.find(option => option.value === selectedSortValue).sortingFormula(this.filteredMovies);
  }

  uploadSampleList(): Observable<any> {
    return forkJoin(this.sampleList.map(sample => this.youtubeService.getYoutubeData(sample)));
  }

  constructor(
    private youtubeService: YoutubeService,
    private localStorageServie: LocalStorageService,
  ) { }
}
