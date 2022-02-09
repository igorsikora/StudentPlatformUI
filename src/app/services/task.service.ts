import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Status } from '../models/status.enum';
import { StudentTaskListDto } from '../models/student-task-list.dto';
import { NotificationService } from './notification.service';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private controllerUrl = 'api/Task';
  toDoTasks: Subject<Array<StudentTaskListDto>> = new Subject();
  inProgressTasks: Subject<Array<StudentTaskListDto>> = new Subject();
  DoneTasks: Subject<Array<StudentTaskListDto>> = new Subject();
  constructor(
    private http: HttpClient,
    private notifyService: NotificationService) { }


  createTask(name: string, studentId: number): void {

    let taskDto: StudentTaskListDto = {
      title: name,
      statusId: Status.toDo,
      studentId: studentId,
      id: 0
    };
    this.http.post(environment.apiUrl + this.controllerUrl, taskDto).subscribe(result => {
      taskDto.id = Number(result);
      this.getToDoTasks();
    },
      e => console.error(e),
      () => {
        this.notifyService.notification$.next('task created succesfully');
      }
    );
  }

  getToDoTasks(): void {
    this.http.get<Array<StudentTaskListDto>>(environment.apiUrl + this.controllerUrl + '/tasks/0').subscribe((result: Array<StudentTaskListDto>) => {
      this.toDoTasks.next(result);
    })
  }

  getInprogressTasks(): void {
    this.http.get<Array<StudentTaskListDto>>(environment.apiUrl + this.controllerUrl + '/tasks/1').subscribe((result: Array<StudentTaskListDto>) => {
      this.inProgressTasks.next(result);
    })
  }

  getDoneTasks(): void {
    this.http.get<Array<StudentTaskListDto>>(environment.apiUrl + this.controllerUrl + '/tasks/2').subscribe((result: Array<StudentTaskListDto>) => {
      this.DoneTasks.next(result);
    })
  }

  updateTask(dto: StudentTaskListDto, statusId: number) {
    dto.statusId = statusId;
    return this.http.put(environment.apiUrl + this.controllerUrl, dto);
  }

  deleteTask(id: number): void {
    this.http.delete(environment.apiUrl + this.controllerUrl + "/" + id).subscribe(
      () => { },
      e => console.error(e),
      () => this.notifyService.notification$.next('deleted task succesfully'));
  }
  deleteTasks(dtos: Array<StudentTaskListDto>) {
    this.http.request('delete', (environment.apiUrl + this.controllerUrl), { body: dtos }).subscribe(() => {
    }, e => console.log(e),
      () => {
        this.DoneTasks.next([]);
        this.notifyService.notification$.next('cleared all done tasks');
      });
  }
}
