import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserSignInDto } from '../models/user-sign-in.dto';
import { UserSignUpDto } from '../models/user-sign-up.dto';

@Injectable({providedIn: 'root'})
export class AuthService {
  apiControllerName : string = 'api/Auth';
  isAuthenticated$ : Subject<boolean> = new Subject();
  constructor(private http: HttpClient) {
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    let token = this.getToken();

    if(token) {
      // get expire field from token
      const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
      let isAuth = (Math.floor((new Date).getTime() / 1000)) <= expiry;
      this.isAuthenticated$.next(isAuth);
      return isAuth;
    }
    this.isAuthenticated$.next(false);
    return false;
  }


  signUp(dto: UserSignUpDto) {
    return this.http.post<string>(environment.apiUrl + this.apiControllerName + '/SignUp', dto);
  }

  signIn(dto: UserSignInDto) {
    return this.http.post(environment.apiUrl + this.apiControllerName + '/SignIn', dto, {responseType: 'text'});
  }

  signOut() {
    localStorage.removeItem('token');
  }




}
