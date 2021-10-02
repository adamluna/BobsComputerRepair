/*
============================================
; Title: invoice-api.js
; Author: Professor Krasso
; Modified by: Adam Luna
; Date: 01 October 2021
; Description: Invoice API routing file
;===========================================
*/

// require statements
const express = require('express');
const Invoice = require('../models/invoice');
const User = require('../models/user');
const ErrorResponse = require('../services/error-response');
const BaseResponse = require('../services/base-response');

const router = express.Router();

// CreateInvoice
router.post('/:userName', async(req, res) => {
    try
    {
        const newInvoice = {
            userName: req.params.userName,
            lineItems: req.params.lineItems,
            partsAmount: req.body.partsAmount,
            laborAmount: req.body.laborAmount,
            lineItemTotal: req.body.lineItemTotal,
            total: req.body.total
        }

        console.log(newInvoice);

        Invoice.create(newInvoice, function(err, invoice)
        {
            if (err)
            {
                console.log(err);
                const createInvoiceMongodbErrorResponse = new ErrorResponse('500', 'Internal server error, err');
                res.status(500).send(createInvoiceMongodbErrorResponse.toObject());
            }
            else
            {
                console.log(invoice);
                const createInvoiceResponse = new BaseResponse('200', 'Query successful', invoice);
                res.json(createInvoiceResponse.toObject());
            }
        })
    }
    catch (e)
    {
        console.log(e);
        const createInvoiceCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);
        res.status(500).send(createInvoiceCatchErrorResponse,toObject());
    }
});

// FindPurchasesByService
router.get('/purchases-graph', async(req, res) => {
    try
    {
        Invoice.aggregate([
            {
                $unwind: '$lineItems'
            },
            {
                $group:
                {
                    '_id':
                    {
                        'title': '$lineItems.title',
                        'price': '$lineItems.price'
                    },
                    'count':
                    {
                        $sum: 1
                    }
                }
            },
            {
                $sort:
                {
                    '_id.title': 1
                }
            }
        ], function(err, purchaseGraph)
        {
            if(err)
            {
                console.log(err);
                const findPurchasesByServiceGraphMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
                res.status(500).send(findPurchasesByServiceGraphMongodbErrorResponse.toObject());
            }
            else
            {
                console.log(purchaseGraph);
                const findPurchasesByServiceGraphResponse = new BaseResponse('200', 'Query successful', purchaseGraph);
                res.satus(500).send(findPurchasesByServiceGraphResponse.toObject());
            }
        })
    }
    catch (e)
    {
        console.log(e);
        const findPurchasesByServiceGraphCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);
        res.status(500).send(findPurchasesByServiceGraphCatchErrorResponse.toObject());
    }
});

// export module
module.exports = router;