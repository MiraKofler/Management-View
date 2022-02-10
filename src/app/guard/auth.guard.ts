import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {CookieService} from "ngx-cookie-service";

/*
Authguard is used to block certain parts of the web app, when a user isn't logged in.
We use our authcookie (which is our session cookie, if some is logged in) to activate the hidden parts of the web app.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private cookieService:CookieService, private router:Router) {


  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.cookieService.check('AuthCookie')){
      return true;
    }
    this.router.navigate(['/login']); //go back to login if not authenticated
    return false;
  }

}
