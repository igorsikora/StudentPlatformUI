import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class NotificationService {
  public notification$: Subject<{message: string, isError: boolean}> = new Subject();
  constructor() { }


}
