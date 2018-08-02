import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieUtilsService {
  NO_VIMEO_MOVIES_MESSAGE = 'No movies found on Vimeo.';
  VIMEO_ERROR_MESSAGE = 'Sorry something went wrong with Vimeo api.';
  NO_YOUTUBE_MOVIES_MESSAGE = 'No movies found on Youtube.';
  YOUTUBE_ERROR_MESSAGE = 'Sorry something went wrong with Youtube api.';

  getMovieId(movieInput: string) {
    const inputSplit: string = movieInput.split('/')[movieInput.split('/').length - 1];
    const movieId: string = inputSplit.split('=').length > 1 ? inputSplit.split('=')[1] : inputSplit;
    return movieId;
  }  
}
