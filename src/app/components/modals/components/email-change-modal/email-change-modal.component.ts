import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserDto } from 'src/app/models/user.dto';
import { checkEmail } from 'src/app/validators/custom.validator';

@Component({
  selector: 'app-email-change-modal',
  templateUrl: './email-change-modal.component.html',
  styleUrls: ['./email-change-modal.component.scss']
})
export class EmailChangeModalComponent implements OnInit {
  emailForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EmailChangeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserDto,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.emailForm = this.formBuilder.group({
      email: [this.data.email, [Validators.required, Validators.email]],
      confirmEmail: [this.data.email, [Validators.required, Validators.email]],
    }, { validators: [checkEmail] })
  }

  onYesClick() {
    this.dialogRef.close(this.emailForm.value);
  }
   onNoClick() {
    this.dialogRef.close();
  }
}
