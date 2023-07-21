import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { MainArticlePageComponent } from './main-article-page/main-article-page.component';
import {MaterialModule} from './material.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRouters } from './app.routes';
import { DataService } from './service/data.service';
import { PostDialogComponent } from './post-dialog/post-dialog.component';
import { FormsModule } from '@angular/forms';
import { RegisterUserComponent } from './authentication/register-user/register-user.component';
import { LoginComponent } from './authentication/login/login.component';
import { Router } from '@angular/router';

const initApp = () => {
  return () => {
    const token = localStorage.getItem('token');
    if (token) {
      
    } else {
      new Router().navigateByUrl('/authentication/login');
    }
  };
};

@NgModule({
  declarations: [
    AppComponent,
    MainArticlePageComponent,
    WelcomeComponent,
    DashboardComponent,
    PostDialogComponent,
    RegisterUserComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    AppRouters,
    FormsModule,
  ],
  providers: [
    DataService,
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
