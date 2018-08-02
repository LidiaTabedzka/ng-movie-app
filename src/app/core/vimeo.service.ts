import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Movie } from '../shared/models/movie';
import { MovieUtilsService } from './movie-utils.service';

@Injectable({
  providedIn: 'root'
})
export class VimeoService {
  private readonly VIMEO_URL = 'https://api.vimeo.com/videos/';
  private readonly VIMEO_PLAYER_URL = 'https://player.vimeo.com/video/';
  private readonly ACCESS_TOKEN = '38df3f6069afd63ba401542c186816d3';

  constructor(
    private http: HttpClient,
    private movieUtilsService: MovieUtilsService
  ) { }

  getVimeoData(movieInput: string): Observable<any> {
    const url = `${this.VIMEO_URL}${movieInput}`;
    return this.http.get(url, {
      headers: new HttpHeaders({ 'Authorization': `bearer ${this.ACCESS_TOKEN}` })
    })
      .pipe(
        catchError(err => {
          if (err.status === 404) {
            return throwError(this.movieUtilsService.NO_VIMEO_MOVIES_MESSAGE);
          }
          return throwError(this.movieUtilsService.VIMEO_ERROR_MESSAGE);
        })
      );
  }

  vimeoResponseFormatter(resp): Movie {
    const movieId: string = resp.link.split('/')[resp.link.split('/').length - 1];

    const movie: Movie = {
      id: uuid(),
      movieId,
      title: resp.name,
      imageUrl: resp.pictures.sizes[3].link,
      viewCount: resp.stats.plays,
      likeCount: resp.metadata.connections.likes.total,
      iframeSrc: `${this.VIMEO_PLAYER_URL}${movieId}`,
      favourite: false,
      createdAt: Date.now()
    };
    return movie;
  }
}
