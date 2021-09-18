/**
 * Author: Prof. Richard Krasso
 * Modified By: Eunice Lim
 * Date: 16 Sept 2021
 * Title: security-questions.js
 * API for security questions
 */

//require statements
const SecurityQuestions = require ('../models/security-questions');
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
        SecurityQuestion.find({})
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
 * CreateSecurityQuestion API
 */
 router.post('/', async (req, res) => {
    try {
      // inputted security question 
      let newSecurityQuestion = {
        text: req.body.text
      };
  
      SecurityQuestion.create(newSecurityQuestion, function(err, securityQuestion) {
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
  })


/**
 * UpdateSecurityQuestion API
 */

router.put('/:id', async(req, res) => {
    try
    {
        SecurityQuestion.findOne({'_id': req.params.id}, function(err, securityQuestion){
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
      


module.exports = router;