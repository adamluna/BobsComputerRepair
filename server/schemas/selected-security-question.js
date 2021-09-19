/*
============================================
; Title: selected-security-question.js
; Author: Professor Krasso
; Modified by: Adam Luna
; Date: 18 September 2021
; Description: Selected security question JS file
;===========================================
*/

// require statements
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create selectedSecurityQuestionSchema
let selectedSecurityQuestionSchema = new Schema({
    questionText: { type: String },
    answerText: { type: String }
})

// export module
module.exports = selectedSecurityQuestionSchema;