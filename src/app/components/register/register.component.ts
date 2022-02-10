import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router:Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password:['', Validators.required],
      confirmPassword: ['', Validators.required]
  }, {
    validators: [this.checkPasswords]
  });
  }

  onFormSubmit() {
   this.authService.signUp(this.registerForm.value);

  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }

}
