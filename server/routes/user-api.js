/**
 * Author: Prof. Richard Krasso
 * Modified By: Eunice Lim
 * Date: 16 Sept 2021
 * Title: user-api.js
 * API for User
 */

const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const BaseResponse = require('../services/base-response');
const ErrorResponse = require('../services/error-response');
const RoleSchema = require('../schemas/user-role');

const router = express.Router();
const saltRounds = 10; //default salt rounds for hashing algorithm

/**
 * FindById
 */

router.get('/:id', async(req, res) => {
    try {
        User.findOne({'_id': req.params.id}, function(err, user){
            if(err){
                console.log(err);
                const findByIdMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
                res.status(500).send(findByIdMongodbErrorResponse.toObject());
            }
            else {
                console.log(user);
                const findByIdResponse = new BaseResponse(200, 'Query successful', user);
                res.json(findByIdResponse.toObject());
            }
        })
    }
    catch(e){
        console.log(e);
        const findByIdCatchErrorResponse = new ErrorResponse (500, 'Internal server error', e);
        res.status(500).send(findByIdCatchErrorResponse.toObject());
    }
});

/**
 * DeleteUser
 */
router.delete('/:id', async(req, res) =>{
    try {
        User.findOne({'_id': req.params.id}, function(err, user){
            if (err) {
                console.log(err);
                const deleteUserMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
                res.status(500).send(deleteUserMongodbErrorResponse.toObject());
            }
            else {
                console.log(user);

                user.set({
                    isDisabled: true
                });

                user.save(function (err, savedUser){
                    if (err) {
                        console.log(err);
                        const savedUserMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
                        res.json(savedUserMongodbErrorResponse.toObject());
                    }
                    else {
                        console.log(savedUser);
                        const savedUserResponse = new BaseResponse(200, 'Query successful', savedUser);
                        res.json(savedUserResponse.toObject());
    
                    }
                })
            }
        })
    } catch (e){
        console.log(e);
        const deleteUserCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
        res.status(500).send(deleteUserCatchErrorResponse.toObject());
    }
});