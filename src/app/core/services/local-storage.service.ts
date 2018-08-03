import { Injectable } from '@angular/core';
import { Movie } from '../../shared/models/movie';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  setItem(movies: Movie[]) {
    localStorage.setItem('moviesList', JSON.stringify(movies));
  }

  removeItem() {
    localStorage.removeItem('moviesList');
  }
}
