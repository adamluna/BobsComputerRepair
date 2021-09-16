/*
============================================
; Title: security-questions.js
; Author: Adam Luna
; Date: 14 September 2021
; Description: Security questions schema JS file
;===========================================
*/

// require statements
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create securityquestions schema
let securityQuestionSchema = new Schema(
    {
        questionId: {type: String},
        answer: {type: String},
    },
    { collection: "securityQuestions"} // specify collection in database
);

// export module
module.exports = mongoose.model("SecurityQuestions", securityQuestionSchema);