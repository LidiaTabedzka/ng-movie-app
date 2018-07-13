import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { v4 as uuid } from 'uuid';

import { MoviesService } from '../movies.service';
import { YoutubeService } from '../youtube.service';
import { Movie } from '../movie';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {
  movieInput: string = '';
  movie: Movie;
  error: boolean = false;
  errorMessage: string = '';

  handleSubmit(): void {
    if (!this.movieInput.trim()) {
      this.error = true;
      this.errorMessage = 'Please enter the movie id or url.'
      return;
    }
    this.youtubeService.getYoutubeData(this.movieInput)
      .subscribe(
        resp => {
          if (resp.items.length) {
            this.moviesService.addMovie(this.moviesService.responseFormatter(resp));
            this.movieInput = '';
            this.router.navigate([`movies-list`]);
          } else {
            this.error = true;
            this.errorMessage = 'No movies found. Check the correctness of your movie id or url.'
          }
        },
        err => {
          this.error = true;
          this.errorMessage = 'Sorry something went wrong. Please try again later.';
        }
      );
  }

  handleInputChange() {
    this.error = false;
    this.errorMessage = '';
  }

  constructor(
    private moviesService: MoviesService,
    private youtubeService: YoutubeService,
    private router: Router
  ) { }

  ngOnInit() {
  }

}
