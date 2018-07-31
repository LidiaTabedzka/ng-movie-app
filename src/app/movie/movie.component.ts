import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Movie } from '../movie';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  @Input() movie: Movie;
  openModal: boolean = false;

  handleModalOpen(): void {
    this.openModal = !this.openModal;
  }

  sanitizeIframeSrc(src: string): SafeResourceUrl {
    const url: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(src);
    return url;
  }

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

}
