import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { v4 as uuid } from 'uuid';

import { MoviesService } from '../services/movies.service';
import { YoutubeService } from '../services/youtube.service';
import { VimeoService } from '../services/vimeo.service';
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
  messages: { general: string, vimeo: string, youtube: string } = {
    general: '',
    vimeo: '',
    youtube: '',
  };
  searchCompleted: { vimeo: boolean, youtube: boolean } = {
    vimeo: false,
    youtube: false
  };
  searchSubmit: boolean = false;

  getMovieId(movieInput: string): string {
    const inputSplit: string = movieInput.split('/')[movieInput.split('/').length - 1];
    const movieId: string = inputSplit.split('=').length > 1 ? inputSplit.split("=")[1] : inputSplit;
    return movieId;
  }

  handleVimeoSearch(movieId: string): void {
    this.vimeoService.getVimeoData(movieId)
    .subscribe(
      resp => {
        this.movieInput = '';
        this.searchCompleted.vimeo = true;

        this.moviesService.addMovie(this.vimeoService.vimeoResponseFormatter(resp));
        this.router.navigate([`movies-list`]);
      },
      err => {
        this.searchCompleted.vimeo = true;

        if (err.status === 404) {
          this.messages.vimeo = 'No movies found on Vimeo.';
        } else {
          this.messages.vimeo = 'Sorry something went wrong with Vimeo api.';
        }
      });
  }

  handleYoutubeSearch(movieId: string): void {
    this.youtubeService.getYoutubeData(movieId)
      .subscribe(
        resp => {
          this.searchCompleted.youtube = true;
          if (resp.items.length) {
            this.moviesService.addMovie(this.youtubeService.youtubeResponseFormatter(resp));
            this.movieInput = '';
            this.router.navigate([`movies-list`]);
          } else {
            this.messages.youtube = 'No movies found on Youtube.';
          }
        },
        err => {
          this.searchCompleted.youtube = true;
          this.messages.youtube = 'Sorry something went wrong with Youtube api.';
        }
      );
  }

  handleSubmit(): void {
    if (!this.movieInput.trim()) {
      this.messages.general = 'Please enter the movie id or url.';
      return;
    }
    const movieId: string = this.getMovieId(this.movieInput);

    this.searchSubmit = true;
    this.handleVimeoSearch(movieId);
    this.handleYoutubeSearch(movieId);
  }

  handleInputChange(): void {
    this.messages = { general: '', vimeo: '', youtube: ''};
    this.searchSubmit = false;
    this.searchCompleted = { vimeo: false, youtube: false };
  }

  constructor(
    private moviesService: MoviesService,
    private youtubeService: YoutubeService,
    private vimeoService: VimeoService,
    private router: Router
  ) { }

  ngOnInit() {
  }

}
