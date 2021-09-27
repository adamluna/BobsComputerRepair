/**
 * Date: 26 September 2021
 * Title: BCRS - Verify Username Form
 * Author: Mark Watson
 * Description: Verify username form component.
 */

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Message } from 'primeng/api/message';

@Component({
  selector: 'app-verify-username-form',
  templateUrl: './verify-username-form.component.html',
  styleUrls: ['./verify-username-form.component.css']
})
export class VerifyUsernameFormComponent implements OnInit {
  form: FormGroup;
  errorMessages: Message[];

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: [null, Validators.compose([Validators.required])]
    });
  }

  validateUsername() {
    // get username from form
    const username = this.form.controls['username'].value;

    // check username with API
    this.http.get('/api/session/verify/users/' + username).subscribe(res => {
      console.log(res);
      // if username is valid, navigate to verify security questions page
      this.router.navigate(['/session/verify-security-questions'], {queryParams: {username: username}, skipLocationChange: true});
    }, err => {
      // on error
      this.errorMessages = [
        {severity: 'error', summary: 'Error', detail: err['message']}
      ]
      console.log(err);
    })
  }
}
