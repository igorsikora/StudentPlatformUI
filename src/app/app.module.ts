import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { SharedModule } from './shared/shared.module';
import { CalendarEventsService } from './services/calendarEvents.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import localePl from '@angular/common/locales/pl';
import { TaskService } from './services/task.service';
import { NotificationService } from './services/notification.service';
import { registerLocaleData } from '@angular/common';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ModalsModule } from './components/modals/modals.module';
import { UserService } from './services/user.service';


registerLocaleData(localePl);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    SharedModule,
    HttpClientModule,




    //Oauth
    //OAuthModule.forRoot(),

    ModalsModule
  ],
  providers: [
    CalendarEventsService,
    TaskService,
    NotificationService,
    UserService,
    //auth interceptor
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
