import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Movie } from '../movie';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  apiKey: string = 'AIzaSyCO1Fp9-Aw7z6FNDN-LKIHOHSswVeQ3RTk';
  youtubeUrl: string = 'https://www.googleapis.com/youtube/v3/videos?id=';
  youtubePlayerUrl: string = 'http://www.youtube.com/embed/';

  getYoutubeData(movieId: string): Observable<any> {
    const url: string = `${this.youtubeUrl}${movieId}&key=${this.apiKey}&part=snippet,contentDetails,statistics`;
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
      iframeSrc: `${this.youtubePlayerUrl}${movieDetails.id}`,
      favourite: false,
      createdAt: Date.now()
    };
    return movie;
  }

  constructor(private http: HttpClient) { }
}
