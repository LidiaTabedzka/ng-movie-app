import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { MoviesService } from '../../core/movies.service';
import { YoutubeService } from '../../core/youtube.service';
import { VimeoService } from '../../core/vimeo.service';
import { MovieUtilsService } from '../../core/movie-utils.service';
import { MovieSearchService } from '../../core/movie-search.service';
import { Movie } from '../../shared/models/movie';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnDestroy {
  private readonly EMPTY_INPUT_MESSAGE = 'Please enter the movie id or url.';

  movie: Movie;
  movieInput = '';
  errorMessages = [];
  subscription: Subscription;

  constructor(
    private moviesService: MoviesService,
    private youtubeService: YoutubeService,
    private vimeoService: VimeoService,
    private movieUtilsService: MovieUtilsService,
    private movieSearchService: MovieSearchService,
    private router: Router
  ) { }

  handleSubmit(): void {
    if (!this.movieInput.trim()) {
      this.errorMessages.push(this.EMPTY_INPUT_MESSAGE);
      return;
    }
    const movieId: string = this.movieUtilsService.getMovieId(this.movieInput);

    this.subscription = this.movieSearchService.findMovie(movieId)
      .subscribe(resp => {
        resp.map(response => {
          if (response.searchResults) {
            this.moviesService.addMovie(response.provider === 'youtube' ?
              this.youtubeService.youtubeResponseFormatter(response.searchResults)
              :
              this.vimeoService.vimeoResponseFormatter(response.searchResults));
            this.router.navigate([`movies-list`]);
          }
          else this.errorMessages.push(response);
        })  
      });
  }

  handleInputChange(): void {
    this.errorMessages= [];
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
