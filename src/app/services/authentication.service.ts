import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Users} from "../models/users.model";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
/*
Setting our user data array, sign in data and authentication variable
 */
export class AuthenticationService {

  user: Users[] = [];

  signInData = ["user", "password"]
  isAuthenticated = false;
  cookieValue = "";


  constructor(private http: HttpClient, private route: Router, private cookieService:CookieService) {

  }
/*
Compare login data with database credentials. If the data is correct, a session cookie is created
and the user gets to the nav bar.
 */
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
/*
Get the login data from the database
 */
  getLogin(): Observable<Users[]>{
    return this.http.get<Users[]>("http://localhost:3000/login");
  }
/*
checking credentials
 */
  private checkCredentials(signInData: string[]): boolean {

      if (this.checkLogin(signInData[0]) && this.checkPassword(signInData[1])) {
        return true;
      }else{
        return false;
      }

  }
/*
check username
 */
  private checkLogin(login: string): boolean {

    return login == this.user[0].username;
  }
  /*
  Setting data from data base, so we can use it to compare it with the user input
   */
  setUser(){
    this.isAuthenticated = false;
    this.getLogin().subscribe((users: Users[]) => {
      this.user = users;
      return this.user;
    });
  }
  /*
  check password
   */
  private checkPassword(password: string): boolean {
    return password == this.user[0].password;
  }
/*
setting authentication variable to false and navigate back to login screen
 */
  logout() {
    this.isAuthenticated = false;
    this.route.navigate(['login']);
  }


}
