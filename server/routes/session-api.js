/*
============================================
; Title: session-api.js
; Author: Professor Krasso
; Modified by: Adam Luna, Mark Watson
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

                // if username is valid
                if(user)
                {
                    let passwordIsValid = bcrypt.compareSync(req.body.password, user.password); // compare the saved hashed password against the password the user enters at signin

                   // if password is valid
                    if (passwordIsValid)
                    {
                        console.log('Login successful');
                        const signinResponse = new BaseResponse(200, 'Login successful', user);
                        res.json(signinResponse.toObject());
                    }
                    // if password is not valid
                    else
                    {
                        console.log(`Invalid password for username: ${user.userName}`);
                        const invalidPasswordResponse = new BaseResponse(401, 'Invalid username and/or password, please try again', null);
                        res.status(401).send(invalidPasswordResponse.toObject());
                    }
                }
                // if username is invalid
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

/**
 * registerUser
 */
 router.post('/register', async (req, res) => {
    try {
        // salt + hash password
        let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
        // set default role
        standardRole = {
            role: 'standard',
        };
    
        // new user information
        let registeredUser = {
            userName: req.body.userName,
            password: hashedPassword,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            email: req.body.email,
            role: standardRole,
            selectedSecurityQuestions: req.body.selectedSecurityQuestions,
        };
  
        // check if the user already exists
        User.findOne({ userName: req.body.userName }, function (err, user) {
            // on error
            if (err) {
            console.log(err);
            const createMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
            res.status(500).send(createMongodbErrorResponse.toObject());
            // if new user is valid
            } else {
                // if username already exists
                if (user) {
                    const createUserAlreadyExistsErrorResponse = new ErrorResponse(400, 'User already exists', user);
                    res.status(400).send(createUserAlreadyExistsErrorResponse.toObject());
                // if user does not exist
                } else {
                    // create user
                    User.create(registeredUser, function (err, user) {
                        if (err) {
                            console.log(err);
                            const createMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
                            res.status(500).send(createMongodbErrorResponse.toObject());
                            // if successful
                        } else {
                            console.log(user);
                            const createUserResponse = new BaseResponse(201, 'User created', user);
                            res.json(createUserResponse.toObject());
                        }
                    });
                }
            }
        });
    // catch error
    } catch (e) {
        console.log(e);
        const createUserCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
        res.status(500).send(createUserCatchErrorResponse.toObject());
    }
});

  /**
 * verifyUser
 */
router.get("/verify/users/:userName", async (req, res) => {
    try {
        User.findOne({ userName: req.params.userName }, function (err, user) {
            // on error
            if (err) {
            console.log(err);
            const verifyUserMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
            return res.status(500).send(verifyUserMongodbErrorResponse.toObject());
            } else {
                // user not found
                if (!user) {
                    const invalidUsernameResponse = new BaseResponse(400, 'Invalid username', req.params.userName);
                    return res.status(400).send(invalidUsernameResponse.toObject());
                // user found
                } else {
                    console.log(user);
                    const userVerifiedResponse = new BaseResponse(200, 'User verified', user);
                    return res.status(200).send(userVerifiedResponse.toObject());
                }
            }
        });
    // catch error
    } catch (e) {
        console.log(e.message);
        const verifyUserCatchResponse = new ErrorResponse(500, 'Internal server error', e.message);
        return res.status(500).send(verifyUserCatchResponse.toObject());
    }
});

/**
 * verifySecurityQuestions
 */
 router.post('/verify/users/:userName/security-questions', async (req, res) => {
    try {
        User.findOne({ userName: req.params.userName }, function (err, user) {
            // on error
            if (err) {
            console.log(err);
            const verifySecurityQuestionsMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
            res.status(500).send(verifySecurityQuestionsMongodbErrorResponse.toObject());
            // on success
            } else {
                console.log(user);
                const selectedSecurityQuestionOne = user.selectedSecurityQuestions.find((q) => q.questionText === req.body.questionText1);
                const selectedSecurityQuestionTwo = user.selectedSecurityQuestions.find((q2) => q2.questionText === req.body.questionText2);
                const selectedSecurityQuestionThree = user.selectedSecurityQuestions.find((q3) => q3.questionText === req.body.questionText3);
        
                // validate matching answers
                const isValidAnswerOne = selectedSecurityQuestionOne.answerText === req.body.answerText1;
                const isValidAnswerTwo = selectedSecurityQuestionTwo.answerText === req.body.answerText2;
                const isValidAnswerThree = selectedSecurityQuestionThree.answerText === req.body.answerText3;
        
                // if all answers match
                if (isValidAnswerOne && isValidAnswerTwo && isValidAnswerThree) {
                    console.log(`User ${user.userName} answered their security questions correctly`);
                    const validSecurityQuestionsResponse = new BaseResponse(200, "Success", user);
                    res.json(validSecurityQuestionsResponse.toObject());
                // if answers are incorrect
                } else {
                    console.log(`User ${user.userName} did not answer their security questions correctly`);
                    const invalidSecurityQuestionsResponse = new BaseResponse(200, 'Error: incorrect answers', user);
                    res.json(invalidSecurityQuestionsResponse.toObject());
                }
            }
        });
    // catch error
    } catch (e) {
        console.log(e);
        const verifySecurityQuestionsCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
        res.status(500).send(verifySecurityQuestionsCatchErrorResponse.toObject());
    }
  });
  
  /**
 * resetPassword
 */
router.post('/users/:userName/reset-password', async (req, res) => {
    try {
        // get password associated to user  
        const password = req.body.password;
        User.findOne({ userName: req.params.userName }, function (err, user) {
        // on error
            if (err) {
            console.log(err);
            const resetPasswordMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
            res.status(500).send(resetPasswordMongodbErrorResponse.toObject());
            // on success
            } else {
                console.log(user); 
                // salt + hash password
                let hashedPassword = bcrypt.hashSync(password, saltRounds); 
                // update password
                user.set({
                    password: hashedPassword,
                });
                // save updated user
                user.save(function (err, updatedUser) {
                    // on error
                    if (err) {
                    console.log(err);
                    const updatedUserMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
                    res.status(500).send(updatedUserMongodbErrorResponse.toObject());
                    // on successful save
                    } else {
                    console.log(updatedUser);
                    const updatedPasswordResponse = new BaseResponse(200, 'Query successful', updatedUser);
                    res.json(updatedPasswordResponse.toObject());
                    }
                });
            }
        });
    // catch error
    } catch (e) {
        console.log(e);
        const resetPasswordCatchError = new ErrorResponse(500, 'Internal server error', e);
        res.status(500).send(resetPasswordCatchError.toObject());
    }
});

// export router
module.exports = router;