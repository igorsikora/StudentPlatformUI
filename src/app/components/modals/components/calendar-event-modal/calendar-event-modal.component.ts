import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalendarEventDto } from 'src/app/models/calendar-event.dto';

@Component({
  selector: 'app-calendar-event-modal',
  templateUrl: './calendar-event-modal.component.html',
  styleUrls: ['./calendar-event-modal.component.scss']
})
export class CalendarEventModalComponent implements OnInit {
  isCreate = true;
  constructor(
    public dialogRef: MatDialogRef<CalendarEventModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CalendarEventDto,
    private formBuilder: FormBuilder
  ) {

  }
  calendarEventForm!: FormGroup;
  ngOnInit(): void {
    if(this.data.id) this.isCreate = false;
    this.calendarEventForm = this.formBuilder.group({
      title: [this.data.title, Validators.required],
      description: [this.data.description],
      createTask: [false, Validators.required]
 });
  }
  onYesClick() {
    this.data.title = this.calendarEventForm.get('title')!.value;
    this.data.description = this.calendarEventForm.get('description')!.value;
    this.dialogRef.close({
      action: 'create or update',
      newEvent: this.data,
      createTask: this.calendarEventForm.get('createTask')!.value
    });
  }
  onDeleteClick() {
    this.dialogRef.close({
      action: 'delete',
      newEvent: this.data,
      createTask: false
    });
  }
  onNoClick() {
    this.dialogRef.close({
      action: 'cancel',
      newEvent: null,
      createTask: false

    });
  }
}
