import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule, MatDialogModule } from '@angular/material';

@NgModule({
  imports: [
    MatSelectModule,
    MatDialogModule,
    CommonModule
  ],
  exports: [
    MatSelectModule,
    MatDialogModule
  ]
})
export class MaterialModule { }
