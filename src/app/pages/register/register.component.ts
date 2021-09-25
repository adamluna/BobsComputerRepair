/*
============================================
; Title: register.component.ts
; Author: Professor Krasso
; Modified by: Adam Luna
; Date: 24 September 2021
; Description: Register component TypeScript file
;===========================================
*/
// import statements
import { Component, OnInit } from '@angular/core';
import {SecurityQuestionService} from './../../shared/security-question.service';
import {SecurityQuestion} from './../../shared/security-question.interface';
import { CookieService } from 'ngx-cookie-service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {Message} from 'primeng/api/message';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class RegisterComponent implements OnInit {
  securityQuestions: SecurityQuestion[];

  contactForm: FormGroup;
  securityQuestionsForm: FormGroup;
  credentialsForm: FormGroup;

  errorMessages: Message;

  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder, private cookieService: CookieService, private securityQuestionsService: SecurityQuestionService) {
    this.securityQuestionsService.findAllSecurityQuestions().subscribe(res => {
      this.securityQuestions = res['data']
    }, err => {
      console.log(err);
    })
  }

  ngOnInit() {
    this.contactForm = this.fb.group({
      firstName: [null, Validators.compose([Validators.required])],
      lastName: [null, Validators.compose([Validators.required])],
      phoneNumber: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.email])],
      address: [null, Validators.compose([Validators.required])]
    });

    this.securityQuestionsForm = this.fb.group({
      securityQuestion1: [null, Validators.compose([Validators.required])],
      securityQuestion2: [null, Validators.compose([Validators.required])],
      securityQuestion3: [null, Validators.compose([Validators.required])],
      answerToSecurityQuestion1: [null, Validators.compose([Validators.required])],
      answerToSecurityQuestion2: [null, Validators.compose([Validators.required])],
      answerToSecurityQuestion3: [null, Validators.compose([Validators.required])],
    });

    this.credentialsForm = this.fb.group({
      userName: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)(A-Za-z\\d]{8,}$')])],
    });
  }

  register() {
    const contactInformation = this.contactForm.value;
    const securityQuestions = this.securityQuestionsForm.value;
    const credentials = this.credentialsForm.value;

    const selectedSecurityQuestions = [
      {
        questionText: securityQuestions.securityQuestion1,
        answerText: securityQuestions.answerToSecurityQuestion1
      },
      {
        questionText: securityQuestions.securityQuestion2,
        answerText: securityQuestions.answerToSecurityQuestion2
      },
      {
        questionText: securityQuestions.securityQuestion3,
        answerText: securityQuestions.answerToSecurityQuestion3
      }
    ];

    console.log(selectedSecurityQuestions);

    this.http.post('/api/session/register', {
      userName: credentials.userName,
      password: credentials.password,
      firstName: contactInformation.firstName,
      lasstName: contactInformation.lastName,
      phoneNumber: contactInformation.phoneNumber,
      address: contactInformation.address,
      email: contactInformation.email,
      selectedSecurityQuestions: selectedSecurityQuestions}).subscribe(res => {
        this.cookieService.set('sessionuser', credentials.userName, 1);
        this.router.navigate(['/']);
      }, err => {
        this.errorMessages = [
          {severity: 'error', summary: 'Error', detail: err.message}
        ]
        console.log(`Node.js server error; httpCode:${err.httpCode};message:${err.message}`)
        console.log(err);
      });
    }
  }
