/**
 * Author: Prof Richard Krasso
 * Modified by: Eunice Lim
 * Date: 19 Sep 2021
 * Title: user-list.component.ts
*/


import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteRecordDialogComponent } from './../../shared/delete-record-dialog/delete-record-dialog.component';
import { UserService } from './../../shared/user.service';
import { User } from './../../shared/user.interface';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[];
  displayedColumns = ['userName', 'firstName', 'lastName', 'phoneNumber', 'address', 'email', 'functions'];

  constructor (private dialog: MatDialog, private userService: UserService) {

      this.userService.findAllUsers().subscribe(res => {
          this.users = res['data'];
          console.log(this.users);
      }, err => {
          console.log(err);
      });
  }

  ngOnInit(): void {

  }

  delete(userId, recordId): void {
      const dialogRef = this.dialog.open(DeleteRecordDialogComponent, {
          data: {
              recordId,
              dialogHeader: 'Delete Record Dialog',
              dialogBody: `Are you sure you want to delete user ${recordId}?`
          },
          disableClose: true,
          width: '800px'
      });

      dialogRef.afterClosed().subscribe(result =>{
          if (result === 'confirm') {
              this.userService.deleteUser(userId).subscribe(res => {
                  console.log(`User delete`);
                  this.users = this.users.filter(u => u._id !== userId);
              });
          }
      });
  }
}