import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/dashboard/dashboard.module').then(mod => mod.DashboardModule)
  },
  {
    path: 'taskList',
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/task-list/task-list.module').then(mod => mod.TaskListModule)
  },
  {
    path: 'user',
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/user/user.module').then(mod => mod.UserModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./components/auth/auth.module').then(mod => mod.AuthModule)
  },
  {
    path: 'calendar',
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/calendar/my-calendar.module').then(mod => mod.MyCalendarModule)
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
