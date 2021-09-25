/**
 * Title: verify-security-questions-form.component.ts
 * Author: Professor Krasso
 * Modified By: Eunice Lim
 * Date: 24 Sept 2021
 * Description: Verify security questions form
 */

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Message } from 'primeng/api/message';




@Component({
  selector: 'app-verify-security-questions-form',
  templateUrl: './verify-security-questions-form.component.html',
  styleUrls: ['./verify-security-questions-form.component.css']
})
export class VerifySecurityQuestionsFormComponent implements OnInit {
  selectedSecurityQuestions: any;
  question1: string;
  question2: string;
  question3: string;
  username: string;
  form: FormGroup;
  errorMessages: Message[];

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private fb: FormBuilder) { 
    this.username = this.route.snapshot.queryParamMap.get('username');
    console.log(this.username);

    //verify username exists in database and the security questions that go with it
    this.http.get('/api/users/' + this.username + '/security-questions').subscribe(res => {
      this.selectedSecurityQuestions = res['data'];
      console.log(this.selectedSecurityQuestions);
      console.log(res);
    }, err => {
      console.log(err);
    }, () => {
      this.question1 = this.selectedSecurityQuestions[0].questionText;
      this.question2 = this.selectedSecurityQuestions[1].questionText;
      this.question3 = this.selectedSecurityQuestions[2].questionText;

      console.log(this.question1);
      console.log(this.question2);
      console.log(this.question3);
    });
  }

  ngOnInit() {
    this.form = this.fb.group({   //ensure there is an answer in the field
      answerToSecurityQuestion1: [null, Validators.compose([Validators.required])],
      answerToSecurityQuestion2: [null, Validators.compose([Validators.required])],
      answerToSecurityQuestion3: [null, Validators.compose([Validators.required])],
    });
  }
//match up the answers to stored answers
  verifySecurityQuestions(){
    const answerToSecurityQuestion1 = this.form.controls['answerToSecurityQuestion1'].value;
    const answerToSecurityQuestion2 = this.form.controls['answerToSecurityQuestion2'].value;
    const answerToSecurityQuestion3 = this.form.controls['answerToSecurityQuestion3'].value;

    //for error handling in console
    console.log(answerToSecurityQuestion1);
    console.log(answerToSecurityQuestion2);
    console.log(answerToSecurityQuestion3);

    //api call to check answers and if successful, reset password otherwise err handling message
    this.http.post('/api/session/verify/users/' + this.username + '/security-questions', {
      questionText1: this.question1,
      questionText2: this.question2,
      questionText3: this.question3,
      answerText1: answerToSecurityQuestion1,
      answerText2: answerToSecurityQuestion2,
      answerText3: answerToSecurityQuestion3,
    }).subscribe(res => {
      console.log(res);
      if (res['message'] === 'success'){      
                                                          //queryParams to hide values in URL, skiplocationchange true to mask URL
        this.router.navigate(['/session/reset-password'], {queryParams: {isAuthenticated: 'true', username: this.username}, skipLocationChange: true});  
      } else {
        // this.errorMessage = 'Unable to verify security questions, please try again.';
        this.errorMessages = [
          {severity: 'error', summary: 'Error', detail: 'Unable to verify security question answers'}
        ]
        console.log('Unable to verify security question answers');
      }
    });
  }
}
