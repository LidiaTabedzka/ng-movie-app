import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

import { MoviesService } from '../../core/services/movies.service';
import { MovieUtilsService } from '../../core/services/movie-utils.service';
import { MovieSearchService } from '../../core/services/movie-search.service';
import { Movie } from '../../shared/models/movie';
import { EMPTY_INPUT_MESSAGE } from '../../shared/constans/messages';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent {
  movie: Movie;
  movieInput = '';
  errorMessages = [];

  constructor(
    private moviesService: MoviesService,
    private movieUtilsService: MovieUtilsService,
    private movieSearchService: MovieSearchService,
    private router: Router
  ) { }

  handleSubmit() {
    if (!this.movieInput.trim()) {
      this.errorMessages.push(EMPTY_INPUT_MESSAGE);
      return;
    }
    const movieId = this.movieUtilsService.getMovieId(this.movieInput);

    this.movieSearchService.findMovie(movieId)
      .pipe(take(1))
      .subscribe(resp => {
        resp.map(response => {
          if (typeof response === 'object') {
            this.moviesService.addMovie(response);
            this.router.navigate([`movies-list`]);
          } else {
            this.errorMessages.push(response);
          }
        });
      });
  }

  handleInputChange() {
    this.errorMessages = [];
  }
}
