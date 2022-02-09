import { formatDate } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { StudentCalendarEventUpdateDto } from '../models/student-calendar-event-update.dto';
import { StudentCalendarEventDto } from '../models/student-calendar-event.dto';
import { NotificationService } from './notification.service';

@Injectable({providedIn: 'root'})
export class CalendarEventsService {
  private controllerUrl = 'api/CalendarEvents';

  public calendarEventsDto : Subject<Array<StudentCalendarEventDto>> = new Subject();

  constructor(
    private http: HttpClient,
    private notifyService: NotificationService) {
  }
  getWeeklyCalendarEvents(studentId: number, dates: Array<Date>) {
      let httpParams: HttpParams = new HttpParams();
      dates.forEach(date => {
        httpParams = httpParams.append('day', formatDate(date, 'dd-MMM-yyyy', 'en-US'));
      })

      this.http.get<Array<StudentCalendarEventDto>>(environment.apiUrl + this.controllerUrl + '/weeklyEvents/' + studentId, {params: httpParams})
    .pipe(
       map((response: Array<StudentCalendarEventDto>) => {
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
            console.log(response);
           // return the modified data:
           return response;
       }),
       catchError( error => {
           return throwError(error);
       })
    ).subscribe(events =>
      this.calendarEventsDto.next(events));
    }
  getMonthlyCalendarEvents(studentId: number, date: Date) {
    let httpParams: HttpParams = new HttpParams();
    httpParams = httpParams.append('date', formatDate(date, 'dd-MMM-yyyy', 'en-US'));

    this.http.get<Array<StudentCalendarEventDto>>(environment.apiUrl + this.controllerUrl + '/monthlyEvents/' + studentId, {params: httpParams})
  .pipe(
     map((response: Array<StudentCalendarEventDto>) => {
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
          console.log(response);
         // return the modified data:
         return response;
     }),
     catchError( error => {
         return throwError(error);
     })
  ).subscribe(events =>
    this.calendarEventsDto.next(events));
  }

  updateCalendarEvent(dto: StudentCalendarEventDto): void {
    this.http.put(environment.apiUrl + this.controllerUrl, dto).subscribe(
      () => {},
      e => console.error(e),
      () => {
        this.notifyService.notification$.next('event updated');
      }

    );
  }

  createCalendarEvent(dto: StudentCalendarEventDto): void {
    this.http.post(environment.apiUrl + this.controllerUrl, dto).subscribe(result => {
      dto.id = Number(result);
    },
    e => console.error(e),
    () => {
      this.notifyService.notification$.next('event created');
    }
);
  }

  deleteCalendarEvent(CalendarEventId: number) {
    return this.http.delete(environment.apiUrl + this.controllerUrl + '/' + CalendarEventId);
  }


}
