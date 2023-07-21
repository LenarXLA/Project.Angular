import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterUserComponent } from './register-user/register-user.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'register', component: RegisterUserComponent },
      { path: 'login', component: LoginComponent }
    ])
  ]
})

export class AuthenticationModule { }
