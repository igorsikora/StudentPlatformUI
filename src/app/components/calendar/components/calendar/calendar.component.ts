import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { fromEvent } from 'rxjs';
import { finalize, take, takeUntil } from 'rxjs/operators';
import { WeekViewHourSegment } from 'calendar-utils';
import { addDays, addMinutes, endOfWeek } from 'date-fns';
import { MatDialog } from '@angular/material/dialog';
import { CalendarEventModalComponent } from 'src/app/components/modals/components/calendar-event-modal/calendar-event-modal.component';
import { CalendarEventsService } from 'src/app/services/calendarEvents.service';
import { formatDate } from '@angular/common';
import { TaskService } from 'src/app/services/task.service';
import { CalendarEventDto } from 'src/app/models/calendar-event.dto';
import { NotificationService } from 'src/app/services/notification.service';


function floorToNearest(amount: number, precision: number) {
  return Math.floor(amount / precision) * precision;
}

function ceilToNearest(amount: number, precision: number) {
  return Math.ceil(amount / precision) * precision;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  //Mock data
  //events = CalendarEventDtoMock.dto();
  events!: Array<CalendarEventDto>;

  //DragToCreate
  dragToCreateActive = false;

  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  weekStartsOn: 0 = 0; // Which day in calendar is start of Week. 0 = sunday
  daysInWeek = 7;
  locale: string = 'pl';
  constructor(
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private notifyService: NotificationService,
    private calendarService: CalendarEventsService,
    private taskService: TaskService) { }

  ngOnInit(): void {
    this.calendarService.getMonthlyCalendarEvents(this.viewDate);
    this.calendarService.calendarEventsDto.subscribe(result => this.events = result);
  }

  setView(view: CalendarView) {
    this.view = view;
  }
  viewDateChange() {
    if (this.view == CalendarView.Month) {
      this.calendarService.getMonthlyCalendarEvents(this.viewDate);
    } else {
      let dates: Array<Date> = [];
      for (let i = 0; i < this.daysInWeek; i++) {
        let newDate = new Date(this.viewDate);
        newDate.setDate(this.viewDate.getDate() + i);
        dates.push(newDate);
      }
      this.calendarService.getWeeklyCalendarEvents(dates);
    }
  }
  eventTimesChanged({

    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    let newEvent!: CalendarEventDto;
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        newEvent = {
          ...iEvent,
          start: newStart,
          end: newEnd,
          startDate: formatDate(newStart, 'yyyy-MM-ddTHH:mm:ss', 'en-US'),
          endDate: formatDate(newEnd!, 'yyyy-MM-ddTHH:mm:ss', 'en-US')
        };
        return newEvent;
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', newEvent);
  }
  handleEvent(action: string, event: any): void {
    if (action === 'Clicked') {
      const dialogRef = this.dialog.open(CalendarEventModalComponent, {
        width: '40vw',
        height: '70vh',
        data: event,
      });

      dialogRef.afterClosed().subscribe((data: {
        action: string,
        newEvent: CalendarEventDto,
        createTask: boolean
      }) => {
        switch (data.action) {
          case 'delete':
            this.calendarService.deleteCalendarEvent(event.id).subscribe(() => {
              this.events = this.events.filter((iEvent) => iEvent !== event);
            });
            break;
          case 'create or update':
            this.calendarService.updateCalendarEvent(data.newEvent)
            if (data.createTask) {
              this.taskService.createTask(data.newEvent.title);
            }
            break;
        }
        this.refresh();
      });
    }
    else if (action === 'Dropped or resized') {
      this.calendarService.updateCalendarEvent(event);
    }
  }

  //DragToCreate
  startDragToCreate(
    segment: WeekViewHourSegment,
    mouseDownEvent: MouseEvent,
    segmentElement: HTMLElement
  ) {
    const dragToSelectEvent: CalendarEventDto = {
      id: 0,
      title: 'New event',
      description: '',
      start: segment.date,
      startDate: formatDate(segment.date, 'yyyy-MM-ddTHH:mm:ss', 'en-US'),
      endDate: '',
      draggable: true,
      meta: {
        tmpEvent: true,
      },
    };
    this.events = [...this.events, dragToSelectEvent];
    const segmentPosition = segmentElement.getBoundingClientRect();
    this.dragToCreateActive = true;
    const endOfView = endOfWeek(this.viewDate, {
      weekStartsOn: this.weekStartsOn,
    });

    fromEvent(document, 'mousemove')
      .pipe(
        finalize(() => {

          const dialogRef = this.dialog.open(CalendarEventModalComponent, {
            width: '40vw',
            height: '70vh',
            data: { event: dragToSelectEvent },
          });

          dialogRef.afterClosed().pipe(take(1)).subscribe((data: {
            action: string,
            newEvent: CalendarEventDto,
            createTask: boolean
          }) => {
            switch (data.action) {
              case 'cancel':
                this.events.pop();
                break;

              case 'create or update':
                // if just clicked then set endDate to be end of segment
                if(!dragToSelectEvent.end) {
                  let end = new Date(dragToSelectEvent.start);
                  if(dragToSelectEvent.start.getMinutes() == 30) {
                    end.setMinutes(0);
                    end.setHours(dragToSelectEvent.start.getHours() +1)
                  } else {
                    end.setMinutes(30);
                  }
                  dragToSelectEvent.end = end;
                  dragToSelectEvent.endDate = formatDate(end, 'yyyy-MM-ddTHH:mm:ss', 'en-US');
                }
                dragToSelectEvent.title = data.newEvent.title;
                dragToSelectEvent.description = data.newEvent.description;
                this.calendarService.createCalendarEvent(dragToSelectEvent).subscribe(result => {
                  dragToSelectEvent.id = Number(result);
                },
                e => {
                  this.events.pop();
                  console.error(e);

                },
                () => {
                  this.notifyService.notification$.next({message:'utworzono zdarzenie', isError: false});
                }
            );

                if (data.createTask) {
                  this.taskService.createTask(data.newEvent.title);
                }
                break;
            }
            this.refresh();
          });
          delete dragToSelectEvent.meta.tmpEvent;
          this.dragToCreateActive = false;
          this.refresh();
        }),
        takeUntil(fromEvent(document, 'mouseup'))
      )
      .subscribe((mouseMoveEvent: any) => {
        const minutesDiff = ceilToNearest(
          mouseMoveEvent.clientY - segmentPosition.top,
          30
        );

        const daysDiff =
          floorToNearest(
            mouseMoveEvent.clientX - segmentPosition.left,
            segmentPosition.width
          ) / segmentPosition.width;

        const newEnd = addDays(addMinutes(segment.date, minutesDiff), daysDiff);
        if (newEnd > segment.date && newEnd < endOfView) {
          dragToSelectEvent.end = newEnd;
          dragToSelectEvent.endDate = formatDate(newEnd, 'yyyy-MM-ddTHH:mm:ss', 'en-US');
        }
        this.refresh();
      });
  }

  private refresh() {
    this.events = [...this.events];
    this.cdr.detectChanges();
  }
}
