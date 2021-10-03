/**
 * Date: 3 October 2021
 * Title: BCRS - Role Details
 * Author: Mark Watson
 * Description: Role details component.
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService } from '../../shared/role.service';
import { Role } from '../../shared/role.interface';

@Component({
  selector: 'app-role-details',
  templateUrl: './role-details.component.html',
  styleUrls: ['./role-details.component.css']
})
export class RoleDetailsComponent implements OnInit {

  form: FormGroup;
  role: Role;
  roleId: string;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private router: Router, private roleService: RoleService) { 
    // get the roleId
    this.roleId = this.route.snapshot.paramMap.get('roleId');

    // retrieve the role with roleId
    this.roleService.findRoleById(this.roleId).subscribe(res => {
        this.role = res['data'];
      // on error
      }, err => {
        console.log(err);
      // show users current role on form
      }, () => {
        this.form.controls['text'].setValue(this.role.text);
      }
    );
  }

  ngOnInit(): void {
  }

}
