import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';


export const TaskListRoutes: Routes = [
  {
    path: '',
    component: TaskListComponent
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(TaskListRoutes)
  ],
  exports: [RouterModule]
})
export class TaskListRoutingModule {
}
