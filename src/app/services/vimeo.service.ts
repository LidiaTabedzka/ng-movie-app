import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Movie } from '../movie';

@Injectable({
  providedIn: 'root'
})
export class VimeoService {
  vimeoUrl: string = 'https://api.vimeo.com/videos/';
  vimeoPlayerUrl: string = 'https://player.vimeo.com/video/';
  accessToken: string = '38df3f6069afd63ba401542c186816d3';

  getVimeoData(movieInput: string): Observable<any> {
    const url: string = `${this.vimeoUrl}${movieInput}`;
    return this.http.get(url, {
      headers: new HttpHeaders({ 'Authorization': `bearer ${this.accessToken}` })
    });
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
      iframeSrc: `${this.vimeoPlayerUrl}${movieId}`,
      favourite: false,
      createdAt: Date.now()
    };
    return movie;
  }

  constructor(private http: HttpClient) { }
}
