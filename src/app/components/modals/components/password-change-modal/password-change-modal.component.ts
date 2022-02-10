import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserDto } from 'src/app/models/user.dto';
import { checkPasswords } from 'src/app/validators/custom.validator';

@Component({
  selector: 'app-password-change-modal',
  templateUrl: './password-change-modal.component.html',
  styleUrls: ['./password-change-modal.component.scss']
})
export class PasswordChangeModalComponent implements OnInit {

  passwordForm!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<PasswordChangeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserDto,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.passwordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, { validators: [checkPasswords] })
  }

  onYesClick() {
    this.dialogRef.close(this.passwordForm.value);
  }
  onNoClick() {
    this.dialogRef.close();
  }
}
