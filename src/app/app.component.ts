import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FrontEnd';
  constructor(
    private notificationService: NotificationService, private snackBar: MatSnackBar
  ) {
    this.notificationService.notification$.subscribe((data: {message: string, isError: boolean}) => {
      if(data.isError) {
        this.snackBar.open(data.message, undefined, {
          duration: 2000,
          panelClass: ['error-snackbar']
        });
      } else {
        this.snackBar.open(data.message, undefined, {
          duration: 1000
        });
      }

    });
  }
}
