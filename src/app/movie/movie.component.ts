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

  handleModalOpen() {
    this.openModal = !this.openModal;
  }

  getIframeSrc(movieId: string) {
    const url: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl('http://www.youtube.com/embed/' + movieId);
    return url;
  }

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

}
