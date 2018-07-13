import { Component, OnInit } from '@angular/core';
import { last } from '@angular/router/src/utils/collection';

import { MoviesService } from '../movies.service';
import { Movie } from '../movie';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  totalMoviesCount: number;

  filterChecked: boolean = false;
  sortingOptions: Array<any> = [
    { value: '1', label: 'from oldest', sortingFormula: (movies: Movie[]) => movies.sort((a, b) => a.createdAt - b.createdAt) },
    { value: '2', label: 'from latest', sortingFormula: (movies: Movie[]) => movies.sort((a, b) => b.createdAt - a.createdAt) }
  ];
  paginationOptions: Array<number> = [5, 10, 20, 50, 100];

  moviesPerPage: number = 5;
  pagesRange: Array<number>;
  pageOffset: number = 0;
  currentPage: number = 1;

  getMovies(pageOffset: number, perPage: number): void {
    const { movies, totalMoviesCount } =  this.moviesService.getMovies(perPage, pageOffset);
    this.movies = movies;
    this.totalMoviesCount = totalMoviesCount;
  }

  resetState(pageOffset: number, perPage: number): void {
    this.getMovies(pageOffset, perPage);
    this.pagesRangeCreator(perPage);
  }

  delete(movieId: string): void {
    this.moviesService.deleteMovie(movieId);
    const isLastPage: boolean = this.pagesRange[this.pagesRange.length - 1 ] === this.currentPage;
    let pageOffset: number = this.pageOffset;
    if (isLastPage && this.movies.length === 1) {
      pageOffset = 1;
    }
    this.resetState(pageOffset, this.moviesPerPage);
  }

  clearList(): void {
    this.moviesService.clearMoviesList();
    this.getMovies(0, 0);
  }

  favouritesHandler(movieId: string, isFavourite: boolean): void {
    this.moviesService.favouritesHandler(movieId, isFavourite, this.filterChecked);
    this.resetState(0, this.moviesPerPage);
  }

  favouritesFilterHandler(filterChecked: boolean): void {
    this.filterChecked = filterChecked;
    this.moviesService.favouritesFilterHandler(filterChecked);
    this.resetState(0, this.moviesPerPage);
  }

  sortingHandler(selectedSortValue: string): void {  
    this.moviesService.sortingHandler(this.sortingOptions, selectedSortValue);
    this.resetState(0, this.moviesPerPage);
  }

  perPageHandler(perPage: number): void {
    this.moviesPerPage = perPage;
    this.resetState(0, perPage);
  }

  pagesRangeCreator(perPage: number): void {
    const pagesRange: Array<number> = [];
    for (let i = 1; i <= Math.ceil(this.totalMoviesCount / perPage); i++) {
      pagesRange.push(i);
    }
    this.pagesRange = pagesRange;
  }

  currentPageHandler(pageNumber: number) {
    this.currentPage = pageNumber;
    const pageOffset: number = (pageNumber - 1) * this.moviesPerPage;
    this.pageOffset = pageOffset;

    this.getMovies(pageOffset, this.moviesPerPage);
  }

  uploadListHandler(): void {
    this.moviesService.uploadSampleList()
      .subscribe(response => {
        response.map(resp => {
          if (resp.items.length) {
            this.moviesService.addMovie(this.moviesService.responseFormatter(resp));
            this.resetState(0, this.moviesPerPage);
          }
        });
      });
  }

  constructor(
    private moviesService: MoviesService
  ) { }

  ngOnInit() {
    this.resetState(0, 5);
  }

}
