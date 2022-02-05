import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Users} from "../models/users.model";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user: Users[] = [];

  signInData = ["user", "password"]
  isAuthenticated = false;
  cookieValue = "";


  constructor(private http: HttpClient, private route: Router, private cookieService:CookieService) {

  }

  authenticate(username: string, password: string): boolean {

    this.signInData[0] = username;
    this.signInData[1] = password;
    if (this.checkCredentials(this.signInData)) {
      this.cookieService.set('AuthCookie', 'true',{expires: 2, sameSite: "Lax"});
      this.cookieValue = this.cookieService.get('Test');
      this.isAuthenticated = true;
      this.route.navigate(['tables']);
      return true;
    }
    this.isAuthenticated = false;
    return false;
  }

  getLogin(): Observable<Users[]>{
    return this.http.get<Users[]>("http://localhost:3000/login");
  }

  private checkCredentials(signInData: string[]): boolean {

      if (this.checkLogin(signInData[0]) && this.checkPassword(signInData[1])) {
        return true;
      }else{
        return false;
      }

  }

  private checkLogin(login: string): boolean {

    return login == this.user[0].username;
  }
  setUser(){
    this.isAuthenticated = false;
    this.getLogin().subscribe((users: Users[]) => {
      this.user = users;
      return this.user;
    });
  }
  private checkPassword(password: string): boolean {
    return password == this.user[0].password;
  }

  logout() {
    this.isAuthenticated = false;
    this.route.navigate(['login']);
  }


}
