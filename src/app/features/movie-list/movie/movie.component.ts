import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Movie } from '../../../shared/models/movie';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent {
  @Input() movie: Movie;
  openModal = false;

  constructor(private sanitizer: DomSanitizer) { }

  handleModalOpen() {
    this.openModal = !this.openModal;
  }

  sanitizeIframeSrc(src: string) {
    const url: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(src);
    return url;
  }
}
