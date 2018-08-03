import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaginationComponent } from './components/pagination/pagination.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [PaginationComponent, PageNotFoundComponent],
  imports: [
    MaterialModule,
    BrowserAnimationsModule,
    CommonModule
  ],
  exports: [
    MaterialModule,
    BrowserAnimationsModule,
    PaginationComponent,
    PageNotFoundComponent
  ]
})
export class SharedModule { }
