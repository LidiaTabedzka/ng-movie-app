import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material';

@NgModule({
  imports: [
    MatSelectModule,
    CommonModule
  ],
  exports: [
    MatSelectModule,
  ]
})
export class MaterialModule { }
