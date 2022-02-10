import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {AuthenticationService} from "../services/authentication.service";
import {CookieService} from "ngx-cookie-service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
/*
On init we set our login requirements to false
 */
  isFormValid = false;
  areCredentialsInvalid = false;


  constructor(private authenticationService:AuthenticationService, private cookieService:CookieService) {

  }
  /*
  We delete all prior session cookies.
  We get the needed credentials from our database to compare it with the sign in credentials later.
   */
  ngOnInit(): void {
    this.cookieService.deleteAll();
    this.authenticationService.getLogin();
    this.authenticationService.setUser();
  }
  /*
  We check the login information, if the user presses the login button.
   */
  onSubmit(signInForm: NgForm) {
    if (!signInForm.valid) {
      this.isFormValid = true;
      this.areCredentialsInvalid = false;
      return;
    }
    this.checkCredentials(signInForm);

  }
/*
Checking if the credentials are valid.
 */
  private checkCredentials(signInForm: NgForm) {

    if (!this.authenticationService.authenticate(signInForm.value.login, signInForm.value.password)) {
      this.isFormValid = false;
      this.areCredentialsInvalid = true;
    }
  }

}
