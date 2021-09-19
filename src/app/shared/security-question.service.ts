/**
 * Date: 18 September 2021
 * Title: BCRS - Security Question Service
 * Author: Mark Watson
 * Description: Security question service file.
 */

import { Injectable } from '@angular/core';
import { SecurityQuestion } from './security-question.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecurityQuestionService {
  static findSecurityQuestionById: any;
  static updatedSecurityQuestion: any;
  static findAllSecurityQuestions: any;
  static deleteSecurityQuestion: any;

  constructor(private http: HttpClient) { }

  // findAll
  findAllSecurityQuestions(): Observable<any> {
    return this.http.get('/api/security-questions');
  }

  // findById
  findSecurityQuestionById(questionId: string): Observable<any> {
    return this.http.get('/api/security-questions/' + questionId);
  }

  // create
  createSecurityQuestion(newSecurityQuestion: SecurityQuestion): Observable<any> {
    return this.http.post('/api/security-questions', {
      text: newSecurityQuestion.text
    })
  }

  // update
  updateSecurityQuestion(questionId: string, updatedSecurityQuestion: SecurityQuestion): Observable<any> {
    return this.http.put('/api/security-questions/'+ questionId, {
      text: updatedSecurityQuestion.text
    })
  }

  // delete
  deleteSecurityQuestion(questionId: string): Observable<any> {
    return this.http.delete('/api/security-questions/'+ questionId);
  }
}
