import { Injectable, NgModule } from '@angular/core';
import { CalendarComponent } from './components/calendar/calendar.component';
import { MyCalendarRoutingModule } from './my-calendar-routing.module';
import { CommonModule } from '@angular/common';
import { CalendarDateFormatter, CalendarModule, CalendarNativeDateFormatter, DateAdapter, DateFormatterParams } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MaterialModule } from 'src/app/shared/material.module';


@Injectable() class CustomDateFormatter extends CalendarNativeDateFormatter {

  public  dayViewHour({date, locale}: DateFormatterParams): string {
    return new Intl.DateTimeFormat('ca', {
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  }
  public weekViewHour({date, locale}: DateFormatterParams): string {
    return new Intl.DateTimeFormat('ca', {
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  }
}

@NgModule({
  imports: [
    MyCalendarRoutingModule,
    CommonModule,
    MaterialModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }, {
      dateFormatter: {
        provide: CalendarDateFormatter,
        useClass: CustomDateFormatter
      }
    }),
  ],
  exports: [],
  declarations: [CalendarComponent],
  providers: [],
})
export class MyCalendarModule { }
