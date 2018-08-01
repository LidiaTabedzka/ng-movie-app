import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule, MatSelectModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [PaginationComponent],
  imports: [
    MatInputModule,
    MatSelectModule,
    BrowserAnimationsModule,
    CommonModule
  ],
  exports: [
    MatInputModule,
    MatSelectModule,
    BrowserAnimationsModule,
    PaginationComponent
  ]
})
export class SharedModule { }
