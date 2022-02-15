import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskListRoutingModule } from './task-list-routing.module';


@NgModule({
  imports: [
    TaskListRoutingModule,
    DragDropModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    CommonModule

  ],
  exports: [],
  declarations: [TaskListComponent],
  providers: [],
})
export class TaskListModule { }
