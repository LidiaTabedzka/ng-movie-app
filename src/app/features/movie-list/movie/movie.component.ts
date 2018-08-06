import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MovieModalComponent } from '../movie-modal/movie-modal.component';
import { Movie } from '../../../shared/models/movie';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent {
  @Input() movie: Movie;

  constructor(
    public dialog: MatDialog
  ) { }

  handleModalOpen() {
    this.dialog.open(MovieModalComponent, {
      data: { src: this.movie.iframeSrc, title: this.movie.title }
    });
  }
}
