/**
 * Author: Prof. Richard Krasso
 * Modified By: Eunice Lim
 * Date: 18 Sept 2021
 * Title: user-role.js
 * User role schema
 */


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userRoleSchema = new Schema({
    role: {type: String, default: 'standard'}
})

module.exports = userRoleSchema;