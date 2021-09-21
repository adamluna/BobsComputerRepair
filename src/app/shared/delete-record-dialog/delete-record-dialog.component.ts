/**
 * Author: Prof Richard Krasso
 * Modified by: Eunice Lim
 * Date: 17 Sep 2021
 * Title: delete-record-dialog.component.ts
*/
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-record-dialog',
  templateUrl: './delete-record-dialog.component.html',
  styleUrls: ['./delete-record-dialog.component.css']
})
export class DeleteRecordDialogComponent implements OnInit {
  recordId: string;
  dialogHeader: string;
  dialogBody: string;
  
  /** to delete the current record via the id, header and body */
  constructor(private dialogRef: MatDialogRef<DeleteRecordDialogComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.recordId = data.recordId;
    this.dialogHeader = data.dialogHeader;
    this.dialogBody = data.dialogBody; 
   }

  ngOnInit(): void {
  }

}
