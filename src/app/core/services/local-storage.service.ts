import { Injectable } from '@angular/core';
import { Movie } from '../../shared/models/movie';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  setItem(movies: Movie[], key: string) {
    localStorage.setItem(key, JSON.stringify(movies));
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }
}
