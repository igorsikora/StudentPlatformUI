import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/shared/material.module';
import { CalendarEventModalComponent } from './components/calendar-event-modal/calendar-event-modal.component';
import { EmailChangeModalComponent } from './components/email-change-modal/email-change-modal.component';
import { PasswordChangeModalComponent } from './components/password-change-modal/password-change-modal.component';


@NgModule({
  imports: [
    ReactiveFormsModule,
    MaterialModule,
    CommonModule,
    MatDialogModule,

  ],
  exports: [MatDialogModule],
  declarations: [
    EmailChangeModalComponent,
    PasswordChangeModalComponent,
    CalendarEventModalComponent
  ],
  providers: [],
})
export class ModalsModule { }
