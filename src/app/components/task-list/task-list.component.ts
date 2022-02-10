import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, transferArrayItem} from '@angular/cdk/drag-drop';
import { TaskService } from 'src/app/services/task.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Status } from 'src/app/models/status.enum';
import { TaskDto } from 'src/app/models/task.dto';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  title: string = '';
  todo = Array<TaskDto>();
  inProgress = Array<TaskDto>();
  done = Array<TaskDto>();
  constructor(
    private taskService: TaskService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.taskService.getToDoTasks();
    this.taskService.getInprogressTasks();
    this.taskService.getDoneTasks();
    this.taskService.toDoTasks.subscribe(value => this.todo = value);
    this.taskService.inProgressTasks.subscribe(value => this.inProgress = value);
    this.taskService.DoneTasks.subscribe(value => this.done = value);
  }
  drop(event: CdkDragDrop<TaskDto[]>, name:string) {
    let statusId!: number;
    switch (name) {
      case 'toDo':
        statusId = Status.toDo;
        break;
      case 'inProgress':
        statusId = Status.inProgress;
        break;
      case 'done':
        statusId = Status.Done;
        break;
    }
    if (event.previousContainer !== event.container) {
      this.taskService.updateTask(event.previousContainer.data[event.previousIndex], statusId).subscribe(() => {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
        );
      },
      e => {
        console.log(e);
        this.snackBar.open("update went wrong!", undefined, {
          duration: 2000
        })
      },
      () => {
        this.snackBar.open("update succesfully", undefined, {
          duration: 2000
        })
      });
    }
  }

  createNewTask() {
    this.taskService.createTask(this.title);
    this.title = '';
  }

  deleteDoneTasks() {
    this.taskService.deleteTasks(this.done);
  }
}
