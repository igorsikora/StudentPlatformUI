import {
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @Output() closeSidenav = new EventEmitter<void>();

  constructor(
    private route: ActivatedRoute,
  ) {}


  ngOnInit() {
  }

  onTest(): void {

  }

  onClose() {
    this.closeSidenav.emit();
  }
}
