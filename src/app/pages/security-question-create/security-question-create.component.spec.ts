/**
 * Title: BCRS - Create Security Question Component
 * Author: Prof. Richard Krasso
 * Modified By: Eunice Lim, Adam Luna, Mark Watson
 * Date: 21 Sept 2021
 * Description: Create security question component spec TS file.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityQuestionCreateComponent } from './security-question-create.component';

describe('SecurityQuestionCreateComponent', () => {
  let component: SecurityQuestionCreateComponent;
  let fixture: ComponentFixture<SecurityQuestionCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityQuestionCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityQuestionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
