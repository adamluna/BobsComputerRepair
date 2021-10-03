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
import { Role } from '../role.interface';
import { RoleService } from '../role.service';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent implements OnInit {

  year: number = Date.now();
  userRole: Role;

  constructor(private cookieService: CookieService, private router: Router, private roleService: RoleService) {
    // gets user role to define access level
    this.roleService.findUserRole(this.cookieService.get('sessionuser')).subscribe(res => {
      this.userRole = res['data'];
    })
  }

  ngOnInit(): void {
  }

  // sign out user
  signOut() {
    this.cookieService.deleteAll();
    this.router.navigate(['/session/signin']);
  }
}
