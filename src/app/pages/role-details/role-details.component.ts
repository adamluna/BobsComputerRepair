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
      // show the selected role on the form
      }, () => {
        this.form.controls['text'].setValue(this.role.text);
      }
    );
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      text: [null, Validators.compose([Validators.required])],
    });
  }

  /**
   * Save updated role
   */
  save() {
    // get the new role from the form
    const updatedRole = {
      text: this.form.controls['text'].value,
    } as Role;

    // update the role
    this.roleService.updateRole(this.roleId, updatedRole).subscribe(res => {
        this.router.navigate(['/roles']);
      }, err => {
        console.log(err);
      }
    );
  }

  /**
   * Cancel and go back to role list
   */
  cancel() {
    this.router.navigate(['/roles']);
  }
}
