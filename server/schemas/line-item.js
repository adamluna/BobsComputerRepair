/**
 * Author: Prof. Richard Krasso
 * Modified By: Eunice Lim
 * Date: 1 Oct 2021
 * Title: line-item.js
 * Line Item schema
 */


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lineItemSchema = new Schema({     //fields of the line item
    title: { type: String },
    price: { type: Number }
})

module.exports = lineItemSchema;