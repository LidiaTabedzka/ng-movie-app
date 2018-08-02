import { Injectable } from '@angular/core';
import { Movie } from '../shared/models/movie';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  setItem(movies: Movie[]): void {
    localStorage.setItem('moviesList', JSON.stringify(movies));
  }

  removeItem(): void {
    localStorage.removeItem('moviesList');
  }
}
