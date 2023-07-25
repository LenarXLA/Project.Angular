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
  public currentUserName!: string | null;

  constructor(private authService: AuthenticationService, private router: Router) { 
    this.authService.authChanged
    .subscribe(res => {
      this.isUserAuthenticated = res;
      this.getUserName();
    });
  }

  ngOnInit(): void {
    if(this.authService.isUserAuthenticated()) {
      this.authService.sendAuthStateChangeNotification(true);
    }
  }

  public logout = () => {
    this.authService.logout();
    this.router.navigate(["/"]);
  }

  public getUserName = () => {
    this.currentUserName = this.authService.currentUser;
  }
}
