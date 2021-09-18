/**
 * Author: Prof. Richard Krasso
 * Modified By: Eunice Lim
 * Date: 18 Sept 2021
 * Title: user-role.js
 * User role schema
 */

class ErrorResponse {
    constructor(httpCode, message, data) {
        this.httpCode = httpCode;
        this.message = message;
        this.data = data;
    }
     
    toObject() {
        return {
            'httpCode' : this.httpCode,
            'message' : this.message,
            'data': this.data,
            'timestamp' : new Date().toLocaleDateString()
        }
    }
}

module.exports = ErrorResponse;