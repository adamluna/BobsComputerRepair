/*
============================================
; Title: user-create.component.ts
; Author: Adam Luna
; Date: 19 September 2021
; Description: User create component TypeScript file
;===========================================
*/
// import statements
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { User } from "./../../shared/user.interface";
import { UserService } from "./../../shared/user.service";

@Component({
  selector: "app-user-create",
  templateUrl: "./user-create.component.html",
  styleUrls: ["./user-create.component.css"],
})
export class UserCreateComponent implements OnInit {
  user: User;
  userId: string;
  form: FormGroup;
  roles: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      userName: [null, Validators.compose([Validators.required])],
      password: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$"),
        ]),
      ],
      firstName: [null, Validators.compose([Validators.required])],
      lastName: [null, Validators.compose([Validators.required])],
      phoneNumber: [null, Validators.compose([Validators.required])],
      address: [null, Validators.compose([Validators.required])],
      email: [
        null,
        Validators.compose([Validators.required, Validators.email]),
      ],
    });
  }

  createUser(): void {
    const newUser: User = {
      userName: this.form.controls.userName.value,
      password: this.form.controls.password.value,
      firstName: this.form.controls.firstName.value,
      lastName: this.form.controls.lastName.value,
      phoneNumber: this.form.controls.phoneNumber.value,
      address: this.form.controls.address.value,
      email: this.form.controls.address.value,
    };

    this.userService.createUser(newUser).subscribe(
      (res) => {
        this.router.navigate(["/users"]);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  cancel(): void {
    this.router.navigate(["/users"]);
  }
}
