import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from './notification.service';
import { environment } from 'src/environments/environment';
import { UserDto } from '../models/user.dto';
import { UserUpdateDto } from '../models/user-update.dto';

@Injectable({ providedIn: 'root' })
export class UserService {
  apiControllerName: string = 'api/User';
  constructor(private http: HttpClient, private notifyService: NotificationService) { }


  getDetails() {
    return this.http.get<UserDto>(environment.apiUrl + this.apiControllerName + '/Detail');
  }

  updateUser(dto: UserUpdateDto) {
    return this.http.put(environment.apiUrl + this.apiControllerName + '/Detail', dto).subscribe(
      () => { },
      error => {
        this.notifyService.notification$.next({ message: 'Błąd zmiany danych :', isError: true });
        console.error(error)
      },
      () => {
        this.notifyService.notification$.next({ message: 'Zmiana przebiegła pomyślnie', isError: false });
      }
    );
  }

  updateUserEmail(dto: UserUpdateDto) {
    return this.http.put(environment.apiUrl + this.apiControllerName + '/Email', dto).subscribe(
      () => { },
      error => {
        this.notifyService.notification$.next({ message: 'Błąd zmiany maila', isError: true });
        console.error(error);
      },
      () => {
        this.notifyService.notification$.next({ message: 'Zmiana email przebiegła pomyślnie', isError: false });
      }
    );
  }

  updateUserPassword(dto: UserUpdateDto) {
    return this.http.put(environment.apiUrl + this.apiControllerName + '/Password', dto).subscribe(
      () => { },
      error => {
        this.notifyService.notification$.next({ message: 'Błąd zmiany hasła', isError: true });
        console.error(error)
      },
      () => {
        this.notifyService.notification$.next({ message: 'Zmiana hasła przebiegła pomyślnie', isError: false });
      }
    );
  }
}
