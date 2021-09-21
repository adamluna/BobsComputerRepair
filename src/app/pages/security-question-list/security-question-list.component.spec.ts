/**
 * Title: BCRS - Security Question List Component
 * Author: Prof. Richard Krasso
 * Modified By: Eunice Lim, Adam Luna, Mark Watson
 * Date: 21 Sept 2021
 * Description: Security question list component spec TS file.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityQuestionListComponent } from './security-question-list.component';

describe('SecurityQuestionListComponent', () => {
  let component: SecurityQuestionListComponent;
  let fixture: ComponentFixture<SecurityQuestionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityQuestionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityQuestionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
