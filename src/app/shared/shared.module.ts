import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaginationComponent } from './components/pagination/pagination.component';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [PaginationComponent],
  imports: [
    MaterialModule,
    BrowserAnimationsModule,
    CommonModule
  ],
  exports: [
    MaterialModule,
    BrowserAnimationsModule,
    PaginationComponent
  ]
})
export class SharedModule { }
