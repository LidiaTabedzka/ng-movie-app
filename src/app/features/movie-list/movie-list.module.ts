import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { MovieComponent } from './movie/movie.component';
import { MovieListComponent } from './movie-list.component';
import { MovieListPanelComponent } from './movie-list-panel/movie-list-panel.component';
import { MovieListRoutingModule } from './movie-list-routing.module';

@NgModule({
  declarations: [
    MovieComponent,
    MovieListComponent,
    MovieListPanelComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MovieListRoutingModule
  ],
  exports: [
    MovieComponent,
    MovieListComponent,
    MovieListPanelComponent,
    MovieListRoutingModule
  ]
})
export class MovieListModule { }
