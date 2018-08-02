import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

import { YoutubeService } from './youtube.service';
import { VimeoService } from './vimeo.service';
import { MovieUtilsService } from './movie-utils.service';

@Injectable({
  providedIn: 'root'
})
export class MovieSearchService {
  constructor(
    private youtubeService: YoutubeService,
    private vimeoService: VimeoService,
    private movieUtilsService: MovieUtilsService
  ) { }

  handleVimeoSearch(movieId: string): Observable<any> {
    return this.vimeoService.getVimeoData(movieId)
      .pipe(
        map(movie => ({ searchResults: movie, provider: 'vimeo' })),
      );
  }

  handleYoutubeSearch(movieId: string): Observable<any> {
    return this.youtubeService.getYoutubeData(movieId)
      .pipe(
        map(movie => {
          if (movie) {
            return { searchResults: movie, provider: 'youtube' };
          }
          return this.movieUtilsService.NO_YOUTUBE_MOVIES_MESSAGE
        })
      );
  }

  findMovie(movieId: string): Observable<any> {
    return forkJoin([
      this.handleYoutubeSearch(movieId).pipe(catchError(error => of(error))),
      this.handleVimeoSearch(movieId).pipe(catchError(error => of(error)))]);
  }
}
