import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserSignUpDto } from 'src/app/models/user-sign-up.dto';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  checkPasswords: ValidatorFn = (group: AbstractControl) => {
    let pass = group.get('password')!.value;
    let confirmPass = group.get('confirmPassword')!.value
    return pass === confirmPass ? null : { notSame: true }
  }

  registerForm! : FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router:Router,
    private notifyService: NotificationService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      userName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password:['', Validators.required],
      confirmPassword: ['', Validators.required]
  }, {
    validators: [this.checkPasswords]
  });
  }

  onFormSubmit() {
    let userSignUpDto: UserSignUpDto = {
      email: this.registerForm.get('email')?.value,
      userName: this.registerForm.get('userName')?.value,
      firstName: this.registerForm.get('firstName')?.value,
      lastName: this.registerForm.get('lastName')?.value,
      password: this.registerForm.get('password')?.value,
    }
   this.authService.signUp(userSignUpDto).subscribe(
    () => {},
    error => console.error(error),
    () => {
      this.router.navigateByUrl('/auth/login');
      this.notifyService.notification$.next({message:'Rejestracja przebiegła pomyślnie', isError: false});
    }
    );

  }

  goToLogin() {
    this.router.navigateByUrl('/auth/login');
  }

}
