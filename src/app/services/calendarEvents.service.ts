import { formatDate } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CalendarEventDto } from '../models/calendar-event.dto';
import { NotificationService } from './notification.service';

@Injectable({providedIn: 'root'})
export class CalendarEventsService {
  private controllerUrl = 'api/CalendarEvents';

  public calendarEventsDto : Subject<Array<CalendarEventDto>> = new Subject();

  constructor(
    private http: HttpClient,
    private notifyService: NotificationService) {
  }
  getWeeklyCalendarEvents(dates: Array<Date>) {
      let httpParams: HttpParams = new HttpParams();
      dates.forEach(date => {
        httpParams = httpParams.append('day', formatDate(date, 'dd-MMM-yyyy', 'en-US'));
      })

      this.http.get<Array<CalendarEventDto>>(environment.apiUrl + this.controllerUrl + '/WeeklyEvents', {params: httpParams})
    .pipe(
       map((response: Array<CalendarEventDto>) => {
          // dateTime returned as string
          // before returing we need to make it DateTime type again
          // also setting some calendarEvents properties
          response.forEach(calendarEvent =>
            {
              calendarEvent.start = new Date(calendarEvent.startDate);
              calendarEvent.end = new Date(calendarEvent.endDate);
              calendarEvent.draggable = true;
              calendarEvent.resizable = {
                afterEnd : true,
                beforeStart : true
              }
            });
           // return the modified data:
           return response;
       }),
       catchError( error => {
           return throwError(error);
       })
    ).subscribe(events =>
      this.calendarEventsDto.next(events));
    }
  getMonthlyCalendarEvents(date: Date) {
    let httpParams: HttpParams = new HttpParams();
    httpParams = httpParams.append('date', formatDate(date, 'dd-MMM-yyyy', 'en-US'));

    this.http.get<Array<CalendarEventDto>>(environment.apiUrl + this.controllerUrl + '/MonthlyEvents', {params: httpParams})
  .pipe(
     map((response: Array<CalendarEventDto>) => {
        // dateTime returned as string
        // before returing we need to make it DateTime type again
        // also setting some calendarEvents properties
        response.forEach(calendarEvent =>
          {
            calendarEvent.start = new Date(calendarEvent.startDate);
            calendarEvent.end = new Date(calendarEvent.endDate);
            calendarEvent.draggable = true;
            calendarEvent.resizable = {
              afterEnd : true,
              beforeStart : true
            }
          });
         // return the modified data:
         return response;
     }),
     catchError( error => {
         return throwError(error);
     })
  ).subscribe(events =>
    this.calendarEventsDto.next(events));
  }

  updateCalendarEvent(dto: CalendarEventDto): void {
    this.http.put(environment.apiUrl + this.controllerUrl, dto).subscribe(
      () => {},
      e => {
        this.notifyService.notification$.next({message:'Błąd edycji zdarzenia', isError: true});
         console.error(e)
      },
      () => {
        this.notifyService.notification$.next({message:'zmieniono zdarzenie', isError:false});
      }

    );
  }

  createCalendarEvent(dto: CalendarEventDto) {
    return this.http.post(environment.apiUrl + this.controllerUrl, dto);
  }

  deleteCalendarEvent(CalendarEventId: number) {
    return this.http.delete(environment.apiUrl + this.controllerUrl + '/' + CalendarEventId);
  }


}
