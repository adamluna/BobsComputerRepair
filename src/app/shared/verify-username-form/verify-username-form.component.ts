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
    const username = this.form.controls['username'].value;

    this.http.get('api/session/verify/users/' + username).subscribe(res => {
      console.log(res);
      this.router.navigate(['/session/verify-security-questions'], {queryParams: {username: username}, skipLocationChange: true});
    }, err => {
      this.errorMessages = [
        {severity: 'error', summary: 'Error', detail: err['message']}
      ]
      console.log(err);
    })
  }
}
