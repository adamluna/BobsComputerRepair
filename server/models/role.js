/*
============================================
; Title: role.js
; Author: Professor Krasso
; Modified by: Adam Luna
; Date: 01 October 2021
; Description: Role JS model file
;===========================================
*/

// require statements
const mongoose = require('mongoose');
const Shema = mongoose.Schema;

const roleSchema = new Schema ({
    text: { type: String, unique: true },
    isDisabled: { type: Boolean, default: false }
})

//export module
module.exports = mongoose.model('Role', roleSchema);