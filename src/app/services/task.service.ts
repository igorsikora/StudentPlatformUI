import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Status } from '../models/status.enum';
import { TaskDto } from '../models/task.dto';
import { NotificationService } from './notification.service';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private controllerUrl = 'api/Task';
  toDoTasks: Subject<Array<TaskDto>> = new Subject();
  inProgressTasks: Subject<Array<TaskDto>> = new Subject();
  DoneTasks: Subject<Array<TaskDto>> = new Subject();
  constructor(
    private http: HttpClient,
    private notifyService: NotificationService) { }


  createTask(name: string): void {

    let taskDto: TaskDto = {
      title: name,
      statusId: Status.toDo,
      id: 0
    };
    this.http.post(environment.apiUrl + this.controllerUrl, taskDto).subscribe(result => {
      taskDto.id = Number(result);
      this.getToDoTasks();
    },
      e => console.error(e),
      () => {
        this.notifyService.notification$.next('stworzono zadanie');
      }
    );
  }

  getToDoTasks(): void {
    this.http.get<Array<TaskDto>>(environment.apiUrl + this.controllerUrl + "/" + Status.toDo).subscribe((result: Array<TaskDto>) => {
      this.toDoTasks.next(result);
    })
  }

  getInprogressTasks(): void {
    this.http.get<Array<TaskDto>>(environment.apiUrl + this.controllerUrl + "/" + Status.inProgress).subscribe((result: Array<TaskDto>) => {
      this.inProgressTasks.next(result);
    })
  }

  getDoneTasks(): void {
    this.http.get<Array<TaskDto>>(environment.apiUrl + this.controllerUrl + "/" + Status.Done).subscribe((result: Array<TaskDto>) => {
      this.DoneTasks.next(result);
    })
  }

  updateTask(dto: TaskDto, statusId: number) {
    dto.statusId = statusId;
    return this.http.put(environment.apiUrl + this.controllerUrl, dto);
  }

  // ToDo czy potrzebne
  deleteTask(id: number): void {
    this.http.delete(environment.apiUrl + this.controllerUrl + "/" + id).subscribe(
      () => { },
      e => console.error(e),
      () => this.notifyService.notification$.next('usunięto zadanie'));
  }

  deleteTasks(dtos: Array<TaskDto>) {
    this.http.request('delete', (environment.apiUrl + this.controllerUrl), { body: dtos }).subscribe(() => {
    }, e => console.log(e),
      () => {
        this.DoneTasks.next([]);
        this.notifyService.notification$.next('usunięto zrobione zadania');
      });
  }
}
