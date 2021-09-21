/*
============================================
; Title: security-questions.js
; Author: Adam Luna
; Date: 14 September 2021
; Description: Security questions Mongoose Model JS file
;===========================================
*/

// require statements
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create securityQuestion schema
let securityQuestionSchema = new Schema({
    text: { type: String },
    isDisabled: { type: Boolean, default: false }
}, { collection: 'securityQuestions' })

// export module
module.exports = mongoose.model('SecurityQuestion', securityQuestionSchema);