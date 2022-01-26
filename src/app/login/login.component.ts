import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {AuthenticationService} from "../services/authentication.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isFormValid = false;
  areCredentialsInvalid = false;

  constructor(private authenticationService:AuthenticationService) { }

  ngOnInit(): void {
    this.authenticationService.getLogin();
    this.authenticationService.setUser();
  }
  onSubmit(signInForm: NgForm) {
    if (!signInForm.valid) {
      this.isFormValid = true;
      this.areCredentialsInvalid = false;
      return;
    }
    this.checkCredentials(signInForm);

  }

  private checkCredentials(signInForm: NgForm) {

    if (!this.authenticationService.authenticate(signInForm.value.login, signInForm.value.password)) {
      this.isFormValid = false;
      this.areCredentialsInvalid = true;
    }
  }

}
