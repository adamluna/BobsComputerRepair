/**
 * Date: 17 September 2021
 * Title: BCRS - Base Response
 * Author: Mark Watson
 * Description: A base response class to use in API Calls.
 */

// base response model
 class BaseResponse {
    constructor(httpCode, message, data) {
      this.httpCode = httpCode;
      this.message = message;
      this.data = data;
    }
  
    // returns the mapped variables.
    toObject() {
      return {
        'httpCode': this.httpCode,
        'message': this.message,
        'data': this.data,
        'timestamp': new Date().toLocaleDateString
      }
    }
  }
  
  module.exports = BaseResponse;