import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserUpdateDto } from 'src/app/models/user-update.dto';
import { UserDto } from 'src/app/models/user.dto';
import { AuthService } from 'src/app/services/auth.service';
 import { EmailChangeModalComponent } from '../modals/components/email-change-modal/email-change-modal.component';
import { PasswordChangeModalComponent } from '../modals/components/password-change-modal/password-change-modal.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private dialog: MatDialog) { }
  userForm!: FormGroup;
  userDto!: UserDto;
  userFormLoading: boolean = true;
  ngOnInit(): void {
    this.authService.getDetails().subscribe((result: UserDto) => {
      this.userDto = result
      this.userForm = this.formBuilder.group({
        userName: [this.userDto.userName, Validators.required],
        firstName: [this.userDto.firstName, Validators.required],
        lastName: [this.userDto.lastName, Validators.required],
        email: [this.userDto.email, [Validators.required, Validators.email]]
      });
      this.userFormLoading = false;
    });


  }

  onFormSubmit(): void {
    let userUpdateDto: UserUpdateDto = {
      userName: this.userForm.get('userName')!.value,
      firstName: this.userForm.get('firstName')!.value,
      lastName: this.userForm.get('lastName')!.value,
    }
    this.authService.updateUser(userUpdateDto);
  }

  onChangePassword() {
    const modalRef = this.dialog.open(PasswordChangeModalComponent, {
      width: '50vw',
      data: this.userDto
    });
    modalRef.afterClosed().subscribe((data: {
      oldPassword: string,
      password: string,
      confirmPassword: string
    }) => {
      if (data) {
        let userUpdateDto: UserUpdateDto = {
          ...this.userDto,
          currentPassword: data.oldPassword,
          newPassword: data.password
        }
        console.log(userUpdateDto);

        this.authService.updateUserPassword(userUpdateDto);
      }
    });
  }

  onChangeEmail() {
    const modalRef = this.dialog.open(EmailChangeModalComponent, {
      width: '50vw',
      data: this.userDto
    });

    modalRef.afterClosed().subscribe((data: {
      email: string,
      confirmEmail: string,
    }) => {
      if (data) {
        let userUpdateDto: UserUpdateDto = {
          ...this.userDto,
          email: data.email,
        }
        this.authService.updateUserEmail(userUpdateDto);
      }
    });
  }
}
