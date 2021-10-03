/*
============================================
; Title: user.interface.ts
; Author: Professor Krasso
; Modified by: Adam Luna
; Date: 19 September 2021
; Description: User interface TypeScript file
;===========================================
*/

// export interface
export interface User {
    _id?: string;
    userName?: string;
    password?: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    email: string;
    role: Object; // MIGHT NEED TO CHANGE THIS
}