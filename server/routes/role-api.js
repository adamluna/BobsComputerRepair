/**
 * Author: Mark Watson
 * Date: 1 Oct 2021
 * Title: BCRS - Role API
 * Description: API for role configuration
 */

 const express = require("express");
 const Role = require("../models/role");
 const User = require("../models/user");
 const ErrorResponse = require("../services/error-response");
 const BaseResponse = require("../services/base-response");
 
 const router = express.Router();
 
/**
 * findAllRoles
 */
router.get("/", async (req, res) => {
    try {
        // find all roles that are not disabled
        Role.find({}).where("isDisabled").equals(false).exec(function (err, roles) {
            // on error
            if (err) {
                console.log(err);
                const findAllRolesMongodbErrorResponse = new ErrorResponse("500", "Internal Server Error", err);
                res.status(500).send(findAllRolesMongodbErrorResponse.toObject());
            // on success
            } else {
                console.log(roles);
                const findAllRolesResponse = new BaseResponse("200", "Query Successful", roles);
                res.json(findAllRolesResponse.toObject());
            }
        });
    // catch errors
    } catch (e) {
        console.log(e);
        const findAllRolesCatchErrorResponse = new ErrorResponse("500", "Internal Server Error", e.message);
        res.status(500).send(findAllRolesCatchErrorResponse.toObject());
    }
});
 
/**
 * deleteRole
 */
router.delete("/:roleId", async (req, res) => {
    try {
        Role.findOne({ _id: req.params.roleId }, function (err, role) {
            if (err) {
                // on error
                console.log(err);
                const deleteRoleMongodbErrorResponse = new ErrorResponse("500", "Internal server error", err);
                res.status(500).send(deleteRoleMongodbErrorResponse.toObject());
            // on success
            } else {
            console.log(role);
                // Query for assessing if the role to delete is already assigned to a user
                User.aggregate(
                [
                    {
                        $lookup: {
                            from: "roles",
                            localField: "role.role",
                            foreignField: "text",
                            as: "userRoles",
                        },
                    },
                    {
                        $match: {
                            "userRoles.text": role.text,
                        },
                    },
                ],
                    // if the role is assigned to a user, return this error
                    function (err, users) {
                        console.log(users);
                        // on error
                        if (err) {
                            console.log(err);
                            const usersMongodbErrorResponse = new ErrorResponse("500", "Internal server error", err);
                            res.status(500).send(usersMongodbErrorResponse.toObject());
                        } else {
                            // check what users are using the role
                            if (users.length > 0) {
                                console.log(`Role <${role.text}> is already in use and cannot be deleted`);
                                const userRoleAlreadyInUseResponse = new BaseResponse("400", `Role '${role.text}' is in use.`, role);
                                res.status(400).send(userRoleAlreadyInUseResponse.toObject());
                            // if role is not being used, disable it
                            } else {
                                console.log(`Role <${role.text}> is not an active role and can be safely removed`);
                                role.set({isDisabled: true,});
                                // save the disabled role
                                role.save(function (err, updatedRole) {
                                    if (err) {
                                        console.log(err);
                                        const updatedRoleMongodbErrorResponse = new ErrorResponse("500", "Internal server error", err);
                                        res.status(500).send(updatedRoleMongodbErrorResponse.toObject());
                                    } else {
                                        console.log(updatedRole);
                                        const roleDeletedResponse = new BaseResponse("200", `Role '${role.text}' has been removed successfully`, updatedRole);
                                        res.json(roleDeletedResponse.toObject());
                                    }
                                });
                            }
                        }
                    }
                );
            }
        });
    // catch errors
    } catch (e) {
        console.log(e);
        const deleteRoleCatchErrorResponse = new ErrorResponse("500", "Internal server error", e.message);
        res.status(500).send(deleteRoleCatchErrorResponse.toObject());
    }
});

/**
 * findById
 */
router.get('/:roleId', async(req, res) => {
    try
    {
        Role.findOne({'_id': req.params.roleId}, function(err, role) {
            if(err)
            {
                console.log(err);
                const findRoleByIdMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
                res.status(500).send(findRoleByIdMongodbErrorResponse.toObject());
            }
            else
            {
                console.log(role);
                const findRoleByIdResponse = new BaseResponse('200', 'Query successful', role);
                res.json(findRoleByIdResponse.toObject());
            }
        })
    }
    catch (e)
    {
        console.log(e);
        const findRoleByIdCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);
        res.status(500).send(findRoleByIdCatchErrorResponse.toObject());
    }
});

/**
 * createRole
 */
router.post('/', async (req, res) => {
    try
    {
        Role.findOne({'text': req.body.text}, function(err, role) {
            if (err) {
                console.log(err);
                const findRoleMongodbError = new ErrorResponse('500', 'Internal server error', err);
                res.status(500).send(findRoleMongodbError.toObject());
            } else {
                console.log(role);

                if (!role) {
                    const newRole = {
                        text: req.body.text
                    }

                    Role.create(newRole, function(err, role) {
                        if (err)
                        {
                            console.log(err);
                            const createRoleMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
                            res.status(500).send(createRoleMongodbErrorResponse.toObject());
                        }
                        else
                        {
                            console.log(err);
                            const createRoleResponse = new BaseResponse('200', 'Query successful', role);
                            res.json(createRoleResponse.toObject());
                        }
                    })
                } else {
                    console.log(`Role: ${req.body.text} already exists`);
                    const roleAlreadyExists = new ErrorResponse('400', `Role '${req.body.text}' already exists.`);
                    res.status(400).send(roleAlreadyExists.toObject());
                }
            }
        })
    }
    catch (e)
    {
        console.log(e);
        const createRoleCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);
        res.status(500).send(createRoleCatchErrorResponse.toObject());
    }
})

 
/**
 * updateRole
 */
router.put("/:roleId", async ( req, res ) => {
    try {
        // filter by id
        const filter = {"_id": req.params.roleId};
        const update = req.body;

        Role.findOneAndUpdate(filter, update, {'new': true}, function (err, role) {
            // on error
            if (err) {
                console.log(err);
                const updateRoleMongodbErrorResponse = new ErrorResponse("500", "Internal Server Error", err);
                return res.status(500).send(updateRoleMongodbErrorResponse.toObject());
            // on success
            } else {
                console.log(role);
                const updateRoleSuccessResponse = new BaseResponse("200", "Role Successfully Updated", role);
                return res.status(200).send(updateRoleSuccessResponse.toObject());
            }
        });
    // catch errors
    } catch(e) {
        console.log(e);
        const updateRoleCatchResponse = new ErrorResponse("500", "Internal Server Error", e.message);
        return res.status(500).send(updateRoleCatchResponse.toObject());
    }
});

// export the router
module.exports = router;