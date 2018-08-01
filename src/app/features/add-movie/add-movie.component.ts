import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MoviesService } from '../../core/movies.service';
import { YoutubeService } from '../../core/youtube.service';
import { VimeoService } from '../../core/vimeo.service';
import { MovieUtilsService } from '../../core/movie-utils.service';
import { MovieSearchService } from '../../core/movie-search.service';
import { Movie } from '../../shared/models/movie';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent {
  private readonly EMPTY_INPUT_MESSAGE = 'Please enter the movie id or url.';

  movie: Movie;
  movieInput = '';
  messages = { general: '', vimeo: '', youtube: '' };
  searchCompleted = { vimeo: false, youtube: false };
  searchSubmit = false;

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
      this.messages.general = this.EMPTY_INPUT_MESSAGE;
      return;
    }
    const movieId: string = this.movieUtilsService.getMovieId(this.movieInput);

    this.searchSubmit = true;
    this.movieSearchService.findMovie(movieId);
    
    console.log(this.movieSearchService.searchResults);
    
    const { searchResults } = this.movieSearchService;

    if (searchResults.vimeo || searchResults.youtube) {
      this.moviesService.addMovie(searchResults.vimeo ?
        this.vimeoService.vimeoResponseFormatter(searchResults.vimeo)
        :
        this.youtubeService.youtubeResponseFormatter(searchResults.youtube));
      
      this.movieInput = '';
      this.router.navigate([`movies-list`]);
    }

    this.messages.vimeo = searchResults.vimeoErrorMessage;
    this.messages.youtube = searchResults.youtubeErrorMessage;
    this.searchCompleted.vimeo = searchResults.searchCompleted.vimeo;
    this.searchCompleted.youtube = searchResults.searchCompleted.youtube;
  }

  handleInputChange(): void {
    this.messages = { general: '', vimeo: '', youtube: ''};
    this.searchSubmit = false;
    this.searchCompleted = { vimeo: false, youtube: false };
  }
}
