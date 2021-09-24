/**
 * Author: Prof. Richard Krasso
 * Modified By: Eunice Lim, Mark Watson, Adam Luna
 * Date: 16 Sept 2021
 * Title: user-api.js
 * API for User
 */

const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const BaseResponse = require("../services/base-response");
const ErrorResponse = require("../services/error-response");
const RoleSchema = require("../schemas/user-role");

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
          const findAllMongodbErrorResponse = new ErrorResponse(
            500,
            "Internal server error",
            err
          );
          res.status(500).send(findAllMongodbErrorResponse.toObject());
          // sends all users
        } else {
          console.log(users);
          const findAllUsersResponse = new BaseResponse(
            200,
            "Query successful",
            users
          );
          res.json(findAllUsersResponse.toObject());
        }
      });
  } catch (e) {
    // catch error
    const findAllCatchErrorResponse = new ErrorResponse(
      500,
      "Internal server error",
      e.message
    );
    res.status(500).send(findAllCatchErrorResponse.toObject());
  }
});

/**
 * FindById
 */
router.get("/:id", async (req, res) => {
  try {
    User.findOne({ _id: req.params.id }, function (err, user) {
      if (err) {
        console.log(err);
        const findByIdMongodbErrorResponse = new ErrorResponse(
          500,
          "Internal server error",
          err
        );
        res.status(500).send(findByIdMongodbErrorResponse.toObject());
      } else {
        console.log(user);
        const findByIdResponse = new BaseResponse(
          200,
          "Query successful",
          user
        );
        res.json(findByIdResponse.toObject());
      }
    });
  } catch (e) {
    console.log(e);
    const findByIdCatchErrorResponse = new ErrorResponse(
      500,
      "Internal server error",
      e
    );
    res.status(500).send(findByIdCatchErrorResponse.toObject());
  }
});

/**
 * createUser API
 */
router.post("/", async (req, res) => {
  try {
    User.findOne({ username: req.body.userName }, (err, user) => {
      if (err) {
        console.log(err);
        const createUserMongoDbErrorResponse = new ErrorResponse(
          "500",
          "MongoDB server error",
          err
        );
        res.status(501).send(createUserMongoDbErrorResponse.toObject());
      } else {
        if (user) {
          console.log(user);

          let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds); // salt/hash the password

          standardRole = {
            role: "standard",
          };

          // user object
          let newUser = {
            userName: req.body.userName,
            password: hashedPassword,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            email: req.body.email,
            role: standardRole,
          };

          // create user
          User.create(newUser, function (err, user) {
            if (err) {
              console.log(err);
              const createUserMongoDbErrorResponse = new ErrorResponse(
                500,
                "Internal server error",
                err
              );
              res.status(500).send(createUserMongoDbErrorResponse.toObject());
            } else {
              console.log(user);
              const createUserResponse = new BaseResponse(
                200,
                "Query successful",
                user
              );
              res.json(createUserResponse.toObject());
            }
          });
        } else {
          console.log(`Username ${req.body.userName} already exists.`);
          const userInUseError = new BaseResponse(
            "400",
            `The username '${req.body.userName}' is already in use.`,
            null
          );
          res.status(400).send(userInUseError.toObject());
        }
      }
    })
  } catch (e) {
    console.log(e);
    const createUserCatchErrorResponse = new ErrorResponse(
      500,
      "Internal server error",
      e.message
    );
    res.status(500).send(createUserCatchErrorResponse.toObject());
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
        const updateUserMongodbErrorResponse = new ErrorResponse(
          500,
          "Internal server error",
          err
        );
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
            const saveUserMongodbErrorResponse = new ErrorResponse(
              500,
              "Internal server error",
              err
            );
            res.status(500).send(saveUserMongodbErrorResponse.toObject());
            // save if valid
          } else {
            console.log(savedUser);
            const saveUserResponse = new BaseResponse(
              200,
              "Query successful",
              savedUser
            );
            res.json(saveUserResponse.toObject());
          }
        });
      }
    });
  } catch (e) {
    // catch error
    console.log(e);
    const updateUserCatchErrorResponse = new ErrorResponse(
      500,
      "Internal server error",
      e.message
    );
    res.status(500).send(updateUserCatchErrorResponse.toObject());
  }
});

/**
 * DeleteUser
 */
router.delete("/:id", async (req, res) => {
  try {
    User.findOne({ _id: req.params.id }, function (err, user) {
      if (err) {
        console.log(err);
        const deleteUserMongodbErrorResponse = new ErrorResponse(
          500,
          "Internal server error",
          err
        );
        res.status(500).send(deleteUserMongodbErrorResponse.toObject());
      } else {
        console.log(user);

        user.set({
          isDisabled: true,
        });

        user.save(function (err, savedUser) {
          if (err) {
            console.log(err);
            const savedUserMongodbErrorResponse = new ErrorResponse(
              500,
              "Internal server error",
              err
            );
            res.json(savedUserMongodbErrorResponse.toObject());
          } else {
            console.log(savedUser);
            const savedUserResponse = new BaseResponse(
              200,
              "Query successful",
              savedUser
            );
            res.json(savedUserResponse.toObject());
          }
        });
      }
    });
  } catch (e) {
    console.log(e);
    const deleteUserCatchErrorResponse = new ErrorResponse(
      500,
      "Internal server error",
      e.message
    );
    res.status(500).send(deleteUserCatchErrorResponse.toObject());
  }
});

/**
 * FindSelectedSecurityQuestions
 */
router.get("/:userName/security-question", async (req, res) => {
  try {
    user.findOne({ userName: req.params.userName }, function (err, user) {
      if (err) {
        console.log(err);
        const findSelectedSecurityQuestionsMongodbErrorResponse =
          new ErrorResponse("500", "Internal server error", err);
        res
          .status(500)
          .send(findSelectedSecurityQuestionsMongodbErrorResponse.toObject());
      } else {
        console.log(user);
        const findSelectedSecurityQuestionsResponse = new BaseResponse(
          "200",
          "Query successful",
          user.selectedSecurityQuestions
        );
        res.json(findSelectedSecurityQuestionsResponse.toObject());
      }
    });
  } catch (e) {
    console.log(e);
    const findSelectedSecurityQuestionsCatchErrorResponse = new ErrorResponse(
      "500",
      "Internal server error",
      e
    );
    res
      .status(500)
      .send(findSelectedSecurityQuestionsCatchErrorResponse.toObject());
  }
});

module.exports = router;
