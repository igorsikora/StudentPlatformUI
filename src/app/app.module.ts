import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserComponent } from './components/user/user.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { MaterialModule } from './shared/material.module';
import { SharedModule } from './shared/shared.module';
import { SidenavModule } from './shared/components/sidenav/sidenav.module';
import { ToolbarModule } from './shared/components/toolbar/toolbar.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarEventsService } from './services/calendarEvents.service';
import { HttpClientModule } from '@angular/common/http';
import localePl from '@angular/common/locales/pl';
import { CalendarEventModalComponent } from './components/modals/components/calendar-event-modal/calendar-event-modal.component';
import { StudentService } from './services/student.service';
import { TaskService } from './services/task.service';
import { NotificationService } from './services/notification.service';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localePl);

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserComponent,
    TaskListComponent,
    CalendarEventModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    SharedModule,
    SidenavModule,
    ToolbarModule,
    HttpClientModule,
    //TaskList
    DragDropModule,
    FormsModule,

    //User
    ReactiveFormsModule
  ],
  providers: [
    CalendarEventsService,
    StudentService,
    TaskService,
    NotificationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
