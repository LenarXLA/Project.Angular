import { Component } from '@angular/core';
import { AuthenticationService } from './service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public isUserAuthenticated: boolean | undefined;
  public currentUserName: string | undefined;

  constructor(private authService: AuthenticationService, private router: Router) { }
  
  ngOnInit(): void {
    this.authService.authChanged
    .subscribe(res => {
      this.isUserAuthenticated = res;
      this.currentUserName = this.authService.currentUser;
    });
  }

  public logout = () => {
    this.authService.logout();
    this.router.navigate(["/"]);
  }
}
