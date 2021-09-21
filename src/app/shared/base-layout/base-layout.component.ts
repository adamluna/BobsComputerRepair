/**
 * Title: BCRS - Base Layout Component
 * Author: Prof. Richard Krasso
 * Modified By: Eunice Lim, Adam Luna, Mark Watson
 * Date: 21 Sept 2021
 * Description: Base layout component TS file.
 */

import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent implements OnInit {

  year: number = Date.now();
  isLoggedIn: boolean;
  name: string;

  constructor(private cookieService: CookieService, private router: Router) {
    this.isLoggedIn = this.cookieService.get('session_user') ? true : false; //cookie that is trying to bring back

    this.name = sessionStorage.getItem('name'); //to store signed in name
    console.log('Signed in as user ' + this.name);
  }

  ngOnInit(): void {
  }

  signOut()
  {
    this.cookieService.deleteAll();
    this.router.navigate(['/session/signin']);

  }

}
