/**
 * Author: Prof Richard Krasso
 * Modified by: Eunice Lim
 * Date: 1 Oct 2021
 * Title: user-details.component.ts
*/

//import statements
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './../../shared/user.service';
import { User } from './../../shared/user.interface';
import { Role } from './../../shared/role.interface';
import { RoleService } from 'src/app/shared/role.service';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: User;
  userId: string;
  form: FormGroup;
  roles: Role[];

  constructor(private route: ActivatedRoute, private fb:FormBuilder, private router: Router,
    private userService: UserService, private roleService: RoleService) {

        this.userId = this.route.snapshot.paramMap.get('userId');

        this.userService.findUserById(this.userId).subscribe(res => {
            this.user = res['data'];
        }, err => {
            console.log(err);
        }, () => {
            this.form.controls.firstName.setValue(this.user.firstName);
            this.form.controls.lastName.setValue(this.user.lastName);
            this.form.controls.phoneNumber.setValue(this.user.phoneNumber);
            this.form.controls.address.setValue(this.user.address);
            this.form.controls.email.setValue(this.user.email);
            this.form.controls.role.setValue(this.user.role['role']);

            console.log(this.user);

            this.roleService.findAllRoles().subscribe(res => {
                this.roles = res.data;
            })
        });
    }

    //ensure field is filled in
    ngOnInit(): void{
        this.form = this.fb.group({
            firstName: [null, Validators.compose([Validators.required])],
            lastName: [null, Validators.compose([Validators.required])],
            phoneNumber: [null, Validators.compose([Validators.required])],
            address: [null, Validators.compose([Validators.required])],
            email: [null, Validators.compose([Validators.required])],
            role: [null, Validators.compose([Validators.required])]
        });
    }

    //updates form values
    saveUser(): void {
        const updatedUser: User = {
            firstName: this.form.controls.firstName.value,
            lastName: this.form.controls.lastName.value,
            phoneNumber: this.form.controls.phoneNumber.value,
            address: this.form.controls.address.value,
            email: this.form.controls.email.value,
            role: this.form.controls.role.value
        };

        this.userService.updateUser(this.userId, updatedUser).subscribe(res => {
            this.router.navigate(['/users']);
        }, err => {
            console.log(err);
        });
    }

    //cancel option. brings user back to user page
    cancel(): void{
        this.router.navigate(['/users']);
    }
}
