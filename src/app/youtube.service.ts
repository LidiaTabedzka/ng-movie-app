import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  apiKey: string = 'AIzaSyCO1Fp9-Aw7z6FNDN-LKIHOHSswVeQ3RTk';
  youtubeUrl = 'https://www.googleapis.com/youtube/v3/videos?id=';

  getYoutubeData(movieInput: string): Observable<Object> {
    const inputSplit: string = movieInput.split('/')[movieInput.split('/').length - 1];
    const movieId: string = inputSplit.split('=').length > 1 ? inputSplit.split("=")[1] : inputSplit;
    const url: string = `${this.youtubeUrl}${movieId}&key=${this.apiKey}&part=snippet,contentDetails,statistics`;
    return this.http.get(url);
  }

  constructor(private http: HttpClient) { }
}
