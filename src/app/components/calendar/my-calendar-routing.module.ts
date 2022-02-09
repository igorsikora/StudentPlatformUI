import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';
import { CalendarComponent } from './components/calendar/calendar.component';


export const calendarRoutes: Routes = [
  {
    path: '',
    component: CalendarComponent
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(calendarRoutes)
  ],
  exports: [RouterModule]
})
export class MyCalendarRoutingModule {
}
