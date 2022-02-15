import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  imports: [
    AuthRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [],
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  providers: [],
})
export class AuthModule { }
