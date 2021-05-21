const constants = require("../constants");
module.exports = {
    buildServiceResponse: function(data,err,status){
        if(data){
            return {
                status: status? status : constants.DONE,
                data : data
            }
        } else {
            return {
                status  : status? status :constants.UNSUCCESSFULLY,
                name    : err.name? err.name: '',
                message:  err.message? err.message: '',
                stack   : err.stack? err.stack: '',
                code    : err.code? err.code: '',
            }
        }
    }
}