import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {CookieService} from "ngx-cookie-service";


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(public authenticationService:AuthenticationService, public cookieService:CookieService) {
  }

  ngOnInit(): void {

  }

  onBtnLogoutClicked() {
    this.cookieService.deleteAll();
    this.authenticationService.logout();
  }
}
