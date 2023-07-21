import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserForRegistrationDto } from '../_interfaces/user/userForRegistrationDto';
import { RegistrationResponseDto } from '../_interfaces/response/registrationResponseDto';
import { UserForAuthenticationDto } from '../_interfaces/user/userForAuthenticationDto';
import { AuthResponseDto } from '../_interfaces/response/authResponseDto';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  private authChangeSub = new Subject<boolean>()
  public authChanged = this.authChangeSub.asObservable();
  public currentUser: string | undefined;

  constructor(private http: HttpClient) {  }

  public registerUser = (url: string, body: UserForRegistrationDto) => {
    return this.http.post<RegistrationResponseDto> (url, body);
  }

  public loginUser = (url: string, body: UserForAuthenticationDto) => {
    this.currentUser = body.email;
    return this.http.post<AuthResponseDto>(url, body);
  }

  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this.authChangeSub.next(isAuthenticated);
  }

  public logout = () => {
    localStorage.removeItem("token");
    this.sendAuthStateChangeNotification(false);
  }

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }
}