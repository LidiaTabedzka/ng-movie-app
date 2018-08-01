import { Component, OnInit } from '@angular/core';

import { Movie } from '../../shared/models/movie';
import { YoutubeService } from '../../core/youtube.service';
import { MoviesService } from '../../core/movies.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  private readonly PAGINATION_OPTIONS = [5, 10, 20, 50, 100];
  private readonly DISPLAY_OPTIONS = ['list', 'tiles'];
  private readonly SORTING_OPTIONS = [
    { value: '1', label: 'from latest', sortingFormula: (movies: Movie[]) => movies.sort((a, b) => b.createdAt - a.createdAt) },
    { value: '2', label: 'from oldest', sortingFormula: (movies: Movie[]) => movies.sort((a, b) => a.createdAt - b.createdAt) }
  ];
  private DEFAULT_SORTING_OPTION = '1';

  movies: Movie[] = [];
  totalMoviesCount: number;

  filterChecked = false;
  tilesDisplayChosen = false;

  moviesPerPage = 5;
  pageOffset = 0;
  currentPage = 1;
  pagesRange: Array<number>;

  constructor(
    private youtubeService: YoutubeService,
    private moviesService: MoviesService
  ) { }

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
    this.moviesService.sortingHandler(this.SORTING_OPTIONS, selectedSortValue);
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

  currentPageHandler(pageNumber: number): void {
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
            this.moviesService.addMovie(this.youtubeService.youtubeResponseFormatter(resp));
            this.resetState(0, this.moviesPerPage);
          }
        });
      });
  }

  displayHandler(displayOption: string): void {
    this.tilesDisplayChosen = displayOption === 'tiles';
  }

  ngOnInit() {
    this.resetState(0, 5);
  }
}
