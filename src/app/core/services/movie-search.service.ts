import { Injectable } from '@angular/core';

import { catchError } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';

import { YoutubeService } from './youtube.service';
import { VimeoService } from './vimeo.service';

@Injectable({
  providedIn: 'root'
})
export class MovieSearchService {
  constructor(
    private youtubeService: YoutubeService,
    private vimeoService: VimeoService
  ) { }

  findMovie(movieId: string) {
    return forkJoin([
      this.youtubeService.getYoutubeData(movieId).pipe(catchError(error => of(error))),
      this.vimeoService.getVimeoData(movieId).pipe(catchError(error => of(error)))]);
  }
}
