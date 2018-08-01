import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Movie } from '../shared/models/movie';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private readonly API_KEY = 'AIzaSyCO1Fp9-Aw7z6FNDN-LKIHOHSswVeQ3RTk';
  private readonly YOUTUBE_URL = 'https://www.googleapis.com/youtube/v3/videos?id=';
  private readonly YOUTUBE_PLAYER_URL = 'http://www.youtube.com/embed/';

  constructor(private http: HttpClient) { }

  getYoutubeData(movieId: string): Observable<any> {
    const url = `${this.YOUTUBE_URL}${movieId}&key=${this.API_KEY}&part=snippet,contentDetails,statistics`;
    return this.http.get(url);
  }

  youtubeResponseFormatter(resp): Movie {
    const movieDetails = resp.items[0];
    const movie: Movie = {
      id: uuid(),
      movieId: movieDetails.id,
      title: movieDetails.snippet.localized.title,
      imageUrl: movieDetails.snippet.thumbnails.medium.url,
      viewCount: movieDetails.statistics.viewCount,
      likeCount: movieDetails.statistics.likeCount,
      iframeSrc: `${this.YOUTUBE_PLAYER_URL}${movieDetails.id}`,
      favourite: false,
      createdAt: Date.now()
    };
    return movie;
  }
}
