import { Component, Inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-movie-modal',
  templateUrl: './movie-modal.component.html',
  styleUrls: ['./movie-modal.component.css']
})
export class MovieModalComponent {

  constructor(
    public dialogRef: MatDialogRef<MovieModalComponent>,
    private sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data: object
  ) { }

  sanitizeIframeSrc(src: string) {
    const url: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(src);
    return url;
  }

}
