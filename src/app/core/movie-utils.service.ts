import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieUtilsService {

  getMovieId(movieInput: string) {
    const inputSplit: string = movieInput.split('/')[movieInput.split('/').length - 1];
    const movieId: string = inputSplit.split('=').length > 1 ? inputSplit.split('=')[1] : inputSplit;
    return movieId;
  }
  
}
