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
      e => {
        this.notifyService.notification$.next({ message: 'Błąd tworzenia zadania', isError: true });
        console.error(e)
      },
      () => {
        this.notifyService.notification$.next({ message: 'stworzono zadanie', isError: false });
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
  deleteTask(dtos: Array<TaskDto>, id: number): void {
    this.http.delete(environment.apiUrl + this.controllerUrl + "/" + id).subscribe(
      () => { },
      e => {
        this.notifyService.notification$.next({ message: 'Błąd usuwania zadania', isError: true });
        console.error(e)
      },
      () => {
        console.log(dtos);
        let statusId = dtos[0].statusId;
        dtos = dtos.filter(t => t.id != id);
        switch (statusId) {
          case Status.toDo:
            this.toDoTasks.next(dtos);
            break;
          case Status.inProgress:
            this.inProgressTasks.next(dtos);
            break;
          case Status.Done:
            this.DoneTasks.next(dtos);
            break;
        }
        this.notifyService.notification$.next({ message: 'usunięto zadanie', isError: false })
      });
  }

  deleteTasks(dtos: Array<TaskDto>) {
    this.http.request('delete', (environment.apiUrl + this.controllerUrl), { body: dtos }).subscribe(() => {
    },
      e => {
        this.notifyService.notification$.next({ message: 'Błąd usuwania zadań', isError: true });
        console.error(e)
      },
      () => {
        this.DoneTasks.next([]);
        this.notifyService.notification$.next({ message: 'usunięto zrobione zadania', isError: false });
      });
  }
}
