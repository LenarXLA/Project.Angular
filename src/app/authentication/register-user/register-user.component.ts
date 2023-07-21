import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserForRegistrationDto } from 'src/app/_interfaces/user/userForRegistrationDto';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})

export class RegisterUserComponent {
  errorMessage = '';

  constructor(private authService: AuthenticationService, private router: Router) { }
  
  registerForm = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirm: ''
  };
  
  onSubmit(): void {

    if (!this.registerForm.firstName || !this.registerForm.lastName || !this.registerForm.email 
                                     || !this.registerForm.password || !this.registerForm.confirm) {
      this.errorMessage = 'Пожалуйста заполните все необходимые поля.';
      return;
    }

    const user: UserForRegistrationDto = {
      firstName: this.registerForm.firstName,
      lastName: this.registerForm.lastName,
      email: this.registerForm.email,
      password: this.registerForm.password,
      confirmPassword: this.registerForm.confirm
    };
    
    this.authService.registerUser("api/Accounts/RegisterUser/Registration", user)
    .subscribe({
      next: (_) => this.router.navigate(["/authentication/login"]),
      error: (err: HttpErrorResponse) => console.log(err.error.errors)
    })

  }

  onNoClick(): void {
    this.router.navigateByUrl('/');
  }
  
}
