import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserSignInDto } from '../models/user-sign-in.dto';
import { UserSignUpDto } from '../models/user-sign-up.dto';
import { UserUpdateDto } from '../models/user-update.dto';
import { UserDto } from '../models/user.dto';
import { NotificationService } from './notification.service';

@Injectable({providedIn: 'root'})
export class AuthService {
  apiControllerName : string = 'api/Auth';
  isAuthenticated$ : Subject<boolean> = new Subject();
  constructor(private http: HttpClient, private notifyService: NotificationService) {
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

  getDetails() {
    return this.http.get<UserDto>(environment.apiUrl + this.apiControllerName + '/Detail');
  }

  updateUser(dto: UserUpdateDto) {
    return this.http.put(environment.apiUrl + this.apiControllerName + '/UpdateUserDetails', dto).subscribe(
      () => {},
      error => console.error(error),
      () => {
        this.notifyService.notification$.next('Zmiana przebiegła pomyślnie');
      }
      );
  }

  updateUserEmail(dto: UserUpdateDto) {
    return this.http.put(environment.apiUrl + this.apiControllerName + '/UpdateUserEmail', dto).subscribe(
      () => {},
      error => console.error(error),
      () => {
        this.notifyService.notification$.next('Zmiana email przebiegła pomyślnie');
      }
      );
  }

  updateUserPassword(dto: UserUpdateDto) {
    return this.http.put(environment.apiUrl + this.apiControllerName + '/UpdateUserPassword', dto).subscribe(
      () => {},
      error => console.error(error),
      () => {
        this.notifyService.notification$.next('Zmiana hasła przebiegła pomyślnie');
      }
      );
  }


}
