import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthResponseDto } from 'src/app/_interfaces/response/authResponseDto';
import { UserForAuthenticationDto } from 'src/app/_interfaces/user/userForAuthenticationDto';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  private returnUrl: string | undefined;
  errorMessage = '';

  constructor(private authService: AuthenticationService, private router: Router, private route: ActivatedRoute) { }
  
  loginForm = {
    username: '',
    password: ''
  };

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  
  onSubmit(): void {

    if (!this.loginForm.username || !this.loginForm.password) {
      this.errorMessage = 'Пожалуйста заполните все необходимые поля.';
      return;
    }

    const userForAuth: UserForAuthenticationDto = {
      email: this.loginForm.username,
      password: this.loginForm.password
    };
    
    this.authService.loginUser("api/Accounts/Login/Login", userForAuth)
    .subscribe({
      next: (res:AuthResponseDto) => {
        localStorage.setItem("token", res.token);
        this.authService.sendAuthStateChangeNotification(res.isAuthSuccessful);
        this.router.navigate([this.returnUrl]);
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.message;}
    })

  }

  onNoClick(): void {
    this.router.navigateByUrl('/');
  }
}
