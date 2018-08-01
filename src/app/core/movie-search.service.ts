import { Injectable, OnDestroy } from '@angular/core';

import { YoutubeService } from './youtube.service';
import { VimeoService } from './vimeo.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieSearchService implements OnDestroy {
  private readonly NO_VIMEO_MOVIES_MESSAGE = 'No movies found on Vimeo.';
  private readonly VIMEO_ERROR_MESSAGE = 'Sorry something went wrong with Vimeo api.';
  private readonly NO_YOUTUBE_MOVIES_MESSAGE = 'No movies found on Youtube.';
  private readonly YOUTUBE_ERROR_MESSAGE = 'Sorry something went wrong with Youtube api.';

  searchResults = {
    youtube: '',
    vimeo: '',
    vimeoErrorMessage: '',
    youtubeErrorMessage: '',
    searchCompleted: { vimeo: false, youtube: false }
  }

  constructor(
    private youtubeService: YoutubeService,
    private vimeoService: VimeoService,
  ) { }

  handleVimeoSearch(movieId: string): void {
    this.vimeoService.getVimeoData(movieId)
      .subscribe(
        resp => this.searchResults.vimeo = resp,
        err => {
          this.searchResults.searchCompleted.vimeo = true;
          if (err.status === 404) {
            this.searchResults.vimeoErrorMessage = this.NO_VIMEO_MOVIES_MESSAGE;
          } else {
            this.searchResults.vimeoErrorMessage = this.VIMEO_ERROR_MESSAGE ;
          }
        });
  }

  handleYoutubeSearch(movieId: string) {
    this.youtubeService.getYoutubeData(movieId)
      .subscribe(
        resp => {
          if (resp.items.length) {
            this.searchResults.youtube = resp;
          } else {
            this.searchResults.searchCompleted.youtube = true;
            this.searchResults.youtubeErrorMessage = this.NO_YOUTUBE_MOVIES_MESSAGE;
          }
        },
        err => {
          this.searchResults.searchCompleted.youtube = true;
          this.searchResults.youtubeErrorMessage = this.YOUTUBE_ERROR_MESSAGE;
        }
      );
  }

  findMovie(movieId: string) {
    this.handleVimeoSearch(movieId);
    this.handleYoutubeSearch(movieId);
  }

  ngOnDestroy() {
 
  }
}
