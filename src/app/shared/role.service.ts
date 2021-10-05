/**
 * Author: Mark Watson
 * Date: 2 Oct 2021
 * Title: BCRS - Role Service
 * Description: Role service file.
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from './role.interface';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  // get all roles
  findAllRoles(): Observable<any> {
    return this.http.get('/api/roles');
  }

  // get one role by id
  findRoleById(roleId: string): Observable<any> {
    return this.http.get(`api/roles/${roleId}`);
  }

  // create a new role
  createRole(role: Role): Observable<any> {
    return this.http.post(`api/roles`, {
      text: role.text,
    });
  }

  // update a role
  updateRole(roleId: string, role: Role): Observable<any> {
    return this.http.put(`api/roles/${roleId}`, {
      text: role.text,
    });
  }

  // delete a role
  deleteRole(roleId: string): Observable<any> {
    return this.http.delete(`api/roles/${roleId}`);
  }

  // find a user's role with the userName
  findUserRole(userName: string): Observable<any> {
    return this.http.get(`api/users/${userName}/role`);
  }
}
