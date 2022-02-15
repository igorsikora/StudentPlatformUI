import {
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  isAuth!: boolean;
  constructor(private authService: AuthService, private router:Router) { }

  ngOnInit() {
    this.authService.isAuthenticated$.subscribe(value => this.isAuth = value);
  }

  logout() {
    this.authService.signOut();
    this.isAuth = this.authService.isAuthenticated();
    this.router.navigateByUrl('/auth/login');
  }

}
