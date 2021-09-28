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
const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const ErrorResponse = require("../services/error-response");
const BaseResponse = require("../services/base-response");

// configurations
const router = express.Router();

// default salt rounds
const saltRounds = 10;

/**
 * Sign in API
 */
router.post("/signin", async (req, res) => {
  try {
    User.findOne({ userName: req.body.userName }, function (err, user) {
      if (err) {
        console.log(err);
        const signinMongodbErrorResponse = new ErrorResponse(
          500,
          "Internal server error",
          err
        );
        res.status(500).send(signinMongodbErrorResponse.toObject());
      } else {
        console.log(user);

        // if username is valid
        if (user) {
          let passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
          ); // compare the saved hashed password against the password the user enters at signin

          // if password is valid
          if (passwordIsValid) {
            console.log("Login successful");
            const signinResponse = new BaseResponse(
              200,
              "Login successful",
              user
            );
            res.json(signinResponse.toObject());
          }
          // if password is not valid
          else {
            console.log(`Invalid password for username: ${user.userName}`);
            const invalidPasswordResponse = new BaseResponse(
              401,
              "Invalid username and/or password, please try again",
              null
            );
            res.status(401).send(invalidPasswordResponse.toObject());
          }
        }
        // if username is invalid
        else {
          console.log(`Username: ${req.body.userName} is invalid`);
          const invalidUserNameResponse = new BaseResponse(
            401,
            "Invalid username and/or password, please try again",
            null
          );
          res.status(401).send(invalidUserNameResponse.toObject());
        }
      }
    });
  } catch (e) {
    console.log(e);
    const signinCatchErrorResponse = new ErrorResponse(
      500,
      "Internal server error",
      e.message
    );
    res.status(500).send(signinCatchErrorResponse.toObject());
  }
});

/**
 * registerUser
 */
router.post('/register', async(req, res) => {
  try 
  {
    User.findOne({'userName': req.body.userName}, function(err,user)
    {
      if (err)
      {
        console.log(err);
        const registerUserMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
        res.status(500).send(registerUserMongodbErrorResponse.toObject());
      }
      else
      {
        if (!user)
        {
          let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds); // salt/hash the password
          standardRole = {
            role: "standard",
          }
          
    // user object
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

    User.create(registeredUser, function(err, newUser)
    {
      if (err)
      {
        console.log(err);
        const newUserMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
        res.status(500).send(newUserMongodbErrorResponse.toObject());
      }
      else
      {
        console.log(newUser);
        const registeredUserResponse = new BaseResponse('200', 'Query successful', newUser);
        res.json(registeredUserResponse.toObject());
      }
    })
  }
  else
  {
    console.log(`Username ${req.body.userName} already exists.`);
    const userInUseError = new BaseResponse('400', `The username '${req.body.userName}' is already in use.`, null);
    res.status(400).send(userInUseError.toObject());
      }
    }
  })
}     catch (e) {
    console.log(e);
    const registerUserCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);
    res.status(500).send(registerUserCatchErrorResponse.toObject());
  }
});

/**
 * verifyUser
 */
router.get('/verify/users/:userName', async (req, res) => {
  try {
    User.findOne({ 'userName': req.params.userName }, function (err, user) {
      // on error
      if (user) {
        if (err)
        {
          console.log(err);
          const verifyUserMongodbErrorResponse = new ErrorResponse('500', "Internal server error", err );
          res.status(500).send(verifyUserMongodbErrorResponse.toObject());
        }    
       else {
         console.log(user);
         const verifyUserResponse = new BaseResponse('200', 'Query successful', user);
         res.json(verifyUserResponse.toObject());
       }
      } else {
             const invalidUsernameResponse = new BaseResponse('400,', "Invalid username", req.params.userName);
           res.status(400).send(invalidUsernameResponse.toObject());
            }
            })
    }
    // catch error
   catch (e) {
    console.log(e);
    const verifyUserCatchErrorResponse = new ErrorResponse('500',"Internal server error", e.message);
    res.status(500).send(verifyUserCatchErrorResponse.toObject());
  }
});

/**
 * verifySecurityQuestions
 */
router.post('/verify/users/:userName/security-questions', async(req, res) => {
  try 
  {
    User.findOne({'userName': req.params.userName}, function(err, user) 
    {
      // on error
      if (err) {
        console.log(err);
        const verifySecurityQuestionsMongodbErrorResponse = new ErrorResponse('500','Internal server error', err);
        res.status(500).send(verifySecurityQuestionsMongodbErrorResponse.toObject());
        // on success
      } else {
        console.log(user);
        const selectedSecurityQuestionOne = user.selectedSecurityQuestions.find(q => q.questionText === req.body.questionText1);
        const selectedSecurityQuestionTwo = user.selectedSecurityQuestions.find(q2 => q2.questionText === req.body.questionText2);
        const selectedSecurityQuestionThree = user.selectedSecurityQuestions.find(q3 => q3.questionText === req.body.questionText3);

        // validate matching answers
        const isValidAnswerOne = selectedSecurityQuestionOne.answerText === req.body.answerText1;
        const isValidAnswerTwo = selectedSecurityQuestionTwo.answerText === req.body.answerText2;
        const isValidAnswerThree = selectedSecurityQuestionThree.answerText === req.body.answerText3;

        // if all answers match
        if (isValidAnswerOne && isValidAnswerTwo && isValidAnswerThree) {
          console.log(`User ${user.userName} answered their security questions correctly`);
          const validSecurityQuestionsResponse = new BaseResponse('200', 'success', user);
          res.json(validSecurityQuestionsResponse.toObject());
          // if answers are incorrect
        } else {
          console.log(`User ${user.userName} did not answer their security questions correctly`);
          const invalidSecurityQuestionsResponse = new BaseResponse('200', 'Error: incorrect answers', user);
          res.json(invalidSecurityQuestionsResponse.toObject());
        }
      }
    })
    // catch error
  } 
  catch (e) 
  {
    console.log(e);
    const verifySecurityQuestionsCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);
    res.status(500).send(verifySecurityQuestionsCatchErrorResponse.toObject());
  }
});

/**
 * resetPassword
 */
router.post('/users/:userName/reset-password', async(req, res) => {
  try {
    // get password associated to user
    const password = req.body.password;
    User.findOne({'userName': req.params.userName}, function (err, user) {
      // on error
      if (err) {
        console.log(err);
        const resetPasswordMongodbErrorResponse = new ErrorResponse('500', 'Internal server error',err);
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
            const updatedUserMongodbErrorResponse = new ErrorResponse('500',"Internal server error",err);
            res.status(500).send(updatedUserMongodbErrorResponse.toObject());
            // on successful save
          } else {
            console.log(updatedUser);
            const updatedPasswordResponse = new BaseResponse('200',"Query successful",updatedUser);
            res.json(updatedPasswordResponse.toObject());
          }
        })
      }
    })
    // catch error
  } catch (e) {
    console.log(e);
    const resetPasswordCatchError = new ErrorResponse('500', "Internal server error",e);
    res.status(500).send(resetPasswordCatchError.toObject());
  }
});

// export router
module.exports = router;
