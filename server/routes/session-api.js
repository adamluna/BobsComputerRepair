/*
============================================
; Title: session-api.js
; Author: Professor Krasso
; Modified by: Adam Luna
; Date: 18 September 2021
; Description: Session API for managing users
;===========================================
*/

// require statements
const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const ErrorResponse = require('../services/error-response');
const BaseResponse = require('../services/base-response');

// configurations
const router = express.Router();

/**
 * Sign in API
 */
router.post('/signin', async(req, res) => {
    try
    {
        User.findOne({'userName': req.body.userName}, function(err, user)
        {
            if(err)
            {
                console.log(err);
                const signinMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
                res.status(500).send(signinMongodbErrorResponse.toObject());
            }
            else
            {
                console.log(user);

                /**
                 * if username is valid
                 */
                if(user)
                {
                    let passwordIsValid = bcrypt.compareSync(req.body.password, user.password); // compare the saved hashed password against the password the user enters at signin

                    /**
                     * if password is valid
                     */
                    if (passwordIsValid)
                    {
                        console.log('Login successful');
                        const signinResponse = new BaseResponse(200, 'Login successful', user);
                        res.json(signinResponse.toObject());
                    }
                    /**
                     * if password is not valid
                     */
                    else
                    {
                        console.log(`Invalid password for username: ${user.userName}`);
                        const invalidPasswordResponse = new BaseResponse(401, 'Invalid username and/or password, please try again', null);
                        res.status(401).send(invalidPasswordResponse.toObject());
                    }
                }
                /**
                 * if username is invalid
                 */
                else
                {
                    console.log(`Username: ${req.body.userName} is invalid`)
                    const invalidUserNameResponse = new BaseResponse(401, 'Invalid username and/or password, please try again', null);
                    res.status(401).send(invalidUserNameResponse.toObject());
                }
            }
        })
    }
    catch(e)
    {
        console.log(e);
        const signinCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
        res.status(500).send(signinCatchErrorResponse.toObject());
    }
});

// export router
module.exports = router;