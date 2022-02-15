import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';
import { UserComponent } from './components/user/user.component';
import { UserRoutingModule } from './user-routing.module';


@NgModule({
  imports: [
    UserRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    CommonModule
  ],
  exports: [],
  declarations: [UserComponent],
  providers: [],
})
export class UserModule { }
