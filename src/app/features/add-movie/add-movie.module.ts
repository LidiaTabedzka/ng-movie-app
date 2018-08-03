import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AddMovieComponent } from './add-movie.component';
import { AddMovieRoutingModule } from './add-movie-routing.module';

@NgModule({
  declarations: [ AddMovieComponent ],
  imports: [
    CommonModule,
    FormsModule,
    AddMovieRoutingModule
  ],
  exports: [
    AddMovieComponent,
    AddMovieRoutingModule
  ]
})
export class AddMovieModule { }
