import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MovieModalComponent } from './features/movie-list/movie-modal/movie-modal.component';
import { SharedModule } from './shared/shared.module';
import { MovieListModule } from './features/movie-list/movie-list.module';
import { AddMovieModule } from './features/add-movie/add-movie.module';
import { AppRoutingModule } from './core/app-routing.module';


@NgModule({
  declarations: [AppComponent, MovieModalComponent],
  imports: [
    SharedModule,
    MovieListModule,
    AddMovieModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  entryComponents: [
    MovieModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
