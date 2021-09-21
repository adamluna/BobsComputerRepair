/**
 * Title: BCRS - Delete Record Dialog Component
 * Author: Prof. Richard Krasso
 * Modified By: Eunice Lim, Adam Luna, Mark Watson
 * Date: 21 Sept 2021
 * Description: Delete record dialog component TS file.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRecordDialogComponent } from './delete-record-dialog.component';

describe('DeleteRecordDialogComponent', () => {
  let component: DeleteRecordDialogComponent;
  let fixture: ComponentFixture<DeleteRecordDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteRecordDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteRecordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
