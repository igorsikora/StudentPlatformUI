import { Component, OnInit } from '@angular/core';
import { CalendarEventDto } from 'src/app/models/calendar-event.dto';
import { TaskDto } from 'src/app/models/task.dto';
import { CalendarEventsService } from 'src/app/services/calendarEvents.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  toDoTasks!: Array<TaskDto>
  inProgressTasks!: Array<TaskDto>
  calendarEvents!: Array<CalendarEventDto>
  constructor(
    private calendarService: CalendarEventsService,
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.calendarService.getWeeklyCalendarEvents([new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())]);
    this.taskService.getToDoTasks();
    this.taskService.getInprogressTasks();
    this.taskService.toDoTasks.subscribe(tasks => this.toDoTasks = tasks);
    this.taskService.inProgressTasks.subscribe(tasks => this.inProgressTasks = tasks);
    this.calendarService.calendarEventsDto.subscribe(events => this.calendarEvents = events);
  }

}
