import { Injectable } from '@angular/core';

import { YoutubeService } from './youtube.service';
import { LocalStorageService } from './local-storage.service';
import { Movie } from '../../shared/models/movie';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private readonly SAMPLE_LIST = ['gTX2IDeJHTU', 'EIA8j3debIQ', '2Vv-BfVoq4g', 'iWZmdoY1aTE', 'u3ePPA0yzSU', 'eiDiKwbGfIY'];

  movies: Movie[] = JSON.parse(localStorage.getItem('moviesList')) || [];
  filteredMovies: Movie[] = JSON.parse(localStorage.getItem('moviesList')) || [];

  constructor(
    private youtubeService: YoutubeService,
    private localStorageService: LocalStorageService
  ) { }

  getMovies(perPage: number, offset: number): { movies: Movie[], totalMoviesCount: number } {
    return { movies: this.filteredMovies.slice(offset, offset + perPage), totalMoviesCount: this.filteredMovies.length };
  }

  addMovie(movie: Movie) {
    this.movies.unshift(movie);
    this.filteredMovies.unshift(movie);
    this.localStorageService.setItem(this.filteredMovies);
  }

  deleteMovie(movieId: string) {
    this.movies = this.movies.filter(movie => movie.id !== movieId);
    this.filteredMovies = this.filteredMovies.filter(movie => movie.id !== movieId);
    this.localStorageService.setItem(this.filteredMovies);
  }

  clearMoviesList() {
    this.movies = [];
    this.filteredMovies = [];
    this.localStorageService.removeItem();
  }

  favouritesHandler(movieId: string, isFavourite: boolean, filterChecked: boolean) {
    this.movies = this.movies.map(movie => movie.id === movieId ? {...movie, favourite: !isFavourite } : movie);
    const movies: Movie[] = this.filteredMovies.map(movie => movie.id === movieId ? {...movie, favourite: !isFavourite } : movie);
    this.filteredMovies = filterChecked ? movies.filter(movie => movie.id !== movieId) : movies;
    this.localStorageService.setItem(this.filteredMovies);
  }

  favouritesFilterHandler(filterChecked: boolean) {
    this.filteredMovies = filterChecked ? this.movies.filter(movie => movie.favourite) : this.movies;
  }

  sortingHandler(sortingOptions: Array<any>, selectedSortValue: string) {
    this.filteredMovies = sortingOptions.find(option => option.value === selectedSortValue).sortingFormula(this.filteredMovies);
  }

  uploadSampleList() {
    return forkJoin(this.SAMPLE_LIST.map(sample => this.youtubeService.getYoutubeData(sample)));
  }
}
