/**
 * Title: BCRS - Security Question Details Component
 * Author: Prof. Richard Krasso
 * Modified By: Eunice Lim, Adam Luna, Mark Watson
 * Date: 21 Sept 2021
 * Description: Security question details component spec TS file.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityQuestionDetailsComponent } from './security-question-details.component';

describe('SecurityQuestionDetailsComponent', () => {
  let component: SecurityQuestionDetailsComponent;
  let fixture: ComponentFixture<SecurityQuestionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityQuestionDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityQuestionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
