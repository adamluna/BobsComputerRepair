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
 * FindAllUsers
 */
 router.get("/", async (req, res) => {
    try {
      // gets all users
      User.find({})
        .where("isDisabled")
        .equals(false)
        // executes the query
        .exec(function (err, users) {
          // on error
          if (err) {
            console.log(err);
            const findAllMongodbErrorResponse = new ErrorResponse(500, "Internal server error", err);
            res.status(500).send(findAllMongodbErrorResponse.toObject());
          // sends all users
          } else {
            console.log(users);
            const findAllUsersResponse = new BaseResponse(200, "Query successful", users);
            res.json(findAllUsersResponse.toObject());
          }
        });
    } 
    // catch error
    catch (e) {
      const findAllCatchErrorResponse = new ErrorResponse(500, "Internal server error", e.message);
      res.status(500).send(findAllCatchErrorResponse.toObject());
    }
  });

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
 * UpdateUser
 */
   router.put("/:id", async (req, res) => {
    try {
      // find the user by id
      User.findOne({ _id: req.params.id }, function (err, user) {
        // on error
        if (err) {
          console.log(err);
          const updateUserMongodbErrorResponse = new ErrorResponse(500, "Internal server error", err);
          res.status(500).send(updateUserMongodbErrorResponse.toObject());
        // update user if found
        } else {
          console.log(user);
          user.set({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            email: req.body.email,
          });
          // save the user
          user.save(function (err, savedUser) {
            // on error
            if (err) {
              console.log(err);
              const saveUserMongodbErrorResponse = new ErrorResponse(500, "Internal server error", err);
              res.status(500).send(saveUserMongodbErrorResponse.toObject());
            // save if valid
            } else {
              console.log(savedUser);
              const saveUserResponse = new BaseResponse(200, "Query successful", savedUser);
              res.json(saveUserResponse.toObject());
            }
          });
        }
      });
    } 
    // catch error
    catch (e) {
      console.log(e);
      const updateUserCatchErrorResponse = new ErrorResponse(500, "Internal server error", e.message);
      res.status(500).send(updateUserCatchErrorResponse.toObject());
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