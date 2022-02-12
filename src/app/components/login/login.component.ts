import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.formBuilder.group({
    userName: ['',Validators.required],
    password: ['', Validators.required]
});

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  onFormSubmit() {
    this.authService.signIn(this.loginForm.value).subscribe((token:string) => {
      this.authService.saveToken(token);
    },
    e => console.error(e),
    () => {
      this.router.navigateByUrl('/dashboard');
    }
    );

  }

  goToRegister() {
    this.router.navigateByUrl('/register');
  }

}
