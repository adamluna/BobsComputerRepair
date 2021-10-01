/**
 * Author: Prof. Richard Krasso
 * Modified By: Eunice Lim
 * Date: 1 Oct 2021
 * Title: invoice.js
 * Invoice model
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lineItemDocument = require('../schemas/line-item');

const invoiceSchema = new Schema({
    userName: { type: String },
    lineItems: [lineItemDocument],
    partsAmount: { type: Number },
    laborAmount: { type:Number},
    lineItemTotal: { type: Number },
    total: { type: Number },
    orderDate: { type: Date, default: new Date() }
})

module.exports = mongoose.model('Invoice', invoiceSchema);