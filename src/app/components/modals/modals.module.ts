import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';


@NgModule({
  imports: [
    ReactiveFormsModule,
    MaterialModule,
    CommonModule,

  ],
  exports: [],
  declarations: [],
  providers: [],
})
export class ModalsModule { }
