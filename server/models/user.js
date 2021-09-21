/**
 * Author: Prof. Richard Krasso
 * Modified By: Eunice Lim
 * Date: 16 Sept 2021
 * Title: user.js
 * Mongoose data model
 */


const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserRoleSchema = require('../schemas/user-role');
const SelectedSecurityQuestionSchema = require('../schemas/selected-security-question');

/**User collection data fields */
let userSchema = new Schema({
    userName:       { type: String, required: true, unique: true},
    password:       { type: String, required: true},
    firstName:      { type: String},
    lastName:       { type: String},
    phoneNumber:    { type: String},
    address:        { type: String},
    email:          { type: String},  
    isDisabled:     { type: Boolean, default: false},
    role:           UserRoleSchema,
    selectedSecurityQuestions: [SelectedSecurityQuestionSchema],
    date_created:   {type: Date, default: new Date() },
    date_modified:  { type: Date}
}, {collection:'users'});

module.exports = mongoose.model('User', userSchema);