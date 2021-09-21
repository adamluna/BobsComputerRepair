/**
 * Author: Prof. Richard Krasso
 * Modified By: Eunice Lim, Mark Watson, Adam Luna
 * Date: 16 Sept 2021
 * Title: security-questions.js
 * API for security questions
 */ 

//require statements
const express = require('express');
const SecurityQuestions = require ('../models/security-question');
const ErrorResponse = require('../services/error-response');
const BaseResponse = require('../services/base-response');


//configurations
const router = express.Router();

/**
 * FindAll API
 */

router.get('/', async(req, res) =>{
    try
    {
        SecurityQuestions.find({})
        .where('isDisabled')
        .equals(false)
        .exec(function(err, securityQuestions)
        
        {
            if (err)
            {
                console.log(err);
                const findAllMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
                res.status(500).send(findAllMongodbErrorResponse.toObject());
            }
            else{
                console.log(securityQuestions);
                const findAllResponse = new BaseResponse(200, 'Query successful', securityQuestions);
                res.json(findAllResponse.toObject());
            }
        })
    }
    catch (e)
    {
        console.log(e);
        const findAllCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
        res.status(500).send(findAllCatchErrorResponse.toObject());
    }
});

/**
 * FindById API
 */
router.get('/:id', async(req, res) => {
    try
    {
        SecurityQuestions.findOne({'_id': req.params.id}, function(err, securityQuestion) {
            if(err)
            {
                console.log(err);
                const findByIdMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
                res.status(500).send(findByIdMongodbErrorResponse.toObject());
            }
            else
            {
                console.log(securityQuestion);
                const findByIdResponse = new BaseResponse(200, 'Query successful', securityQuestion);
                res.json(findByIdResponse.toObject());
            }
        })
    } catch(e)
    {
        console.log(e);
        const findByIdCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
        res.status(500).send(findByIdCatchErrorResponse.toObject());
    }
});

/**
 * CreateSecurityQuestion API
 */
 router.post('/', async(req, res) => {
    try {
      // inputted security question 
      let newSecurityQuestion = {
        text: req.body.text
      };
  
      SecurityQuestions.create(newSecurityQuestion, function(err, securityQuestion) {
        // on error
        if (err) {
          console.log(err);
          const createSecurityQuestionMongodbErrorResponse =  new ErrorResponse(500, 'Internal Server Error', err);
          res.status(500).send(createSecurityQuestionMongodbErrorResponse.toObject());
        // create question if valid
        } else {  
          console.log(securityQuestion);
          const createSecurityQuestionResponse = new BaseResponse(200, 'Query Successful', securityQuestion);
          res.json(createSecurityQuestionResponse.toObject());
        }
      })
    }
    // catch error
    catch(e) {
      console.log(e);
      const createSecurityQuestionCatchErrorResponse = new ErrorResponse(500, 'Internal Server Error', e.message);
      res.status(500).send(createSecurityQuestionCatchErrorResponse.toObject());
    }
  });


/**
 * UpdateSecurityQuestion API
 */

router.put('/:id', async(req, res) => {
    try
    {
        SecurityQuestions.findOne({'_id': req.params.id}, function(err, securityQuestion){
            if (err)
            {
                console.log(err);
                const updateSecurityQuestionMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
                res.status(500).send(updateSecurityQuestionMongodbErrorResponse.toObject());
            }
            else
            {
                console.log(securityQuestion);

                securityQuestion.set({
                    text: req.body.text
                });
                
                securityQuestion.save(function(err, savedSecurityQuestion){
                    if (err)
                    {
                        console.log(err);
                        const savedSecurityQuestionMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
                        res.status(500).send(savedSecurityQuestionMongodbErrorResponse.toObject());
                    }
                    else 
                    {
                        console.log(savedSecurityQuestion);
                        const updateSecurityQuestionResponse = new BaseResponse(200, 'Query successful', savedSecurityQuestion);
                        res.json(updateSecurityQuestionResponse.toObject());
                    }
                })
            }
    
})
    }
    catch(e)
    {
    console.log(e);
    const updateSecurityQuestionCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
    res.status(500).send(updateSecurityQuestionCatchErrorResponse.toObject());
    }

});
      
/**
 * DeleteSecurityQuestion API
 */
router.delete('/:id', async(req, res) => {
    try
    {
        SecurityQuestions.findOne({'_id': req.params.id}, function(err, securityQuestion) {
            if(err)
            {
                console.log(err);
                const deleteSecurityQuestionMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
                res.status(500).send(deleteSecurityQuestionMongodbErrorResponse.toObject());
            }
            else
            {
                console.log(securityQuestion);

                securityQuestion.set({
                    isDisabled: true
                });

                securityQuestion.save(function (err, savedSecurityQuestion) {
                    if (err)
                    {
                        console.log(err);
                        const savedSecurityQuestionMongodbErrorResponse = ErrorResponse(500, 'Internal server error', err);
                        res.status(500).send(savedSecurityQuestionMongodbErrorResponse.toObject());
                    }
                    else
                    {
                        console.log(savedSecurityQuestion);
                        const deleteSecurityQuestionResponse = new BaseResponse(200, 'Query successful', savedSecurityQuestion);
                        res.json(deleteSecurityQuestionResponse.toObject());
                    }
                })
            }
        })
    }
    catch (e)
    {
        console.log(e);
        const deleteSecurityQuestionCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
        res.status(500).send(deleteSecurityQuestionCatchErrorResponse.toObject());
    }
});

module.exports = router;