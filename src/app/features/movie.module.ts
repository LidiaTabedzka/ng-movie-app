import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { MovieComponent } from './movie/movie.component';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    MovieComponent,
    AddMovieComponent,
    MovieListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    AppRoutingModule
  ],
  exports: [
    MovieComponent,
    AddMovieComponent,
    MovieListComponent,
    AppRoutingModule
  ]
})
export class MovieModule { }
