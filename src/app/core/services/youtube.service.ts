import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { Movie } from '../../shared/models/movie';
import { YOUTUBE_ERROR_MESSAGE, NO_YOUTUBE_MOVIES_MESSAGE } from '../../shared/constans/messages';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private readonly API_KEY = 'AIzaSyCO1Fp9-Aw7z6FNDN-LKIHOHSswVeQ3RTk';
  private readonly YOUTUBE_URL = 'https://www.googleapis.com/youtube/v3/videos?id=';
  private readonly YOUTUBE_PLAYER_URL = 'http://www.youtube.com/embed/';

  constructor(
    private http: HttpClient
  ) { }

  getYoutubeData(movieId: string) {
    const url = `${this.YOUTUBE_URL}${movieId}&key=${this.API_KEY}&part=snippet,contentDetails,statistics`;
    return this.http.get(url).pipe(
      map((resp: any) => {
        if (resp.items[0]) {
          return this.youtubeResponseFormatter(resp.items[0]);
        }
        return NO_YOUTUBE_MOVIES_MESSAGE;
      }),
      catchError(err => throwError(YOUTUBE_ERROR_MESSAGE))
    );
  }

  private youtubeResponseFormatter(movieDetails): Movie {
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
