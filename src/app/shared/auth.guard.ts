/**
 * Author: Prof Richard Krasso
 * Modified by: Eunice Lim
 * Date: 17 Sep 2021
 * Title: auth.guard.ts
*/

import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { CookieService } from "ngx-cookie-service";

@Injectable({
    providedIn: 'root'
})
  export class AuthGuard implements CanActivate {
      constructor( private router: Router, private cookieService: CookieService){}

      canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
          const isAuthenticated = this.cookieService.get('sessionuser');

          if (isAuthenticated) {
              return true;
          } else {
              this.router.navigate(['/session/signin']);
              return false;
          }
      }
  }