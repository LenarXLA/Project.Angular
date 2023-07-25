import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserForRegistrationDto } from "../_interfaces/user/userForRegistrationDto";
import { RegistrationResponseDto } from "../_interfaces/response/registrationResponseDto";
import { UserForAuthenticationDto } from "../_interfaces/user/userForAuthenticationDto";
import { AuthResponseDto } from "../_interfaces/response/authResponseDto";
import { Subject, map } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  private authChangeSub = new Subject<boolean>();
  public authChanged = this.authChangeSub.asObservable();
  public currentUser!: string | null;
  private authTokenKey = "token";
  private userName = "userName";

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  public registerUser = (url: string, body: UserForRegistrationDto) => {
    return this.http.post<RegistrationResponseDto>(url, body);
  };

  public loginUser = (url: string, body: UserForAuthenticationDto) => {
    return this.http.post<AuthResponseDto>(url, body).pipe(
      map((response) => {
        if (response.token) {
          localStorage.setItem(this.authTokenKey, response.token);
          localStorage.setItem(this.userName, response.userName);
          this.currentUser = response.userName;
          this.sendAuthStateChangeNotification(true);
          this.setUserNameFromStorage();
        }
        return response;
      })
    );
  };

  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this.authChangeSub.next(isAuthenticated);
  };

  public logout = () => {
    localStorage.removeItem(this.authTokenKey);
    localStorage.removeItem(this.userName);
    this.sendAuthStateChangeNotification(false);
  };

  public isUserAuthenticated = (): boolean => {
    const token: string | null = localStorage.getItem(this.authTokenKey);
    this.setUserNameFromStorage();
    if (token) {
      return !this.jwtHelper.isTokenExpired(token);
    }
    return false;
  };

  public setUserNameFromStorage = () => {
    this.currentUser = localStorage.getItem(this.userName);
  };
}
