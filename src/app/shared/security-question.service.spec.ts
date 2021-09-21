/**
 * Date: 18 September 2021
 * Title: BCRS
 * Author: Mark Watson
 * Description: Security question service spec.
 */

import { TestBed } from '@angular/core/testing';

import { SecurityQuestionService } from './security-question.service';

describe('SecurityQuestionService', () => {
  let service: SecurityQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecurityQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
