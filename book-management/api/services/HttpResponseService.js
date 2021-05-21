module.exports = {
    json: (status,res,message,data) =>{
        var response ={};
        if(status){
            response.status = status;
        }
        if(message) {
            response.message = message;
        }
        if(data) {
            response.data = data;
        }
        console.log(response)
        return res.status(status).json(response)
    },
    unauthorized: (res,code) =>{
        var response ={
            errorCode: 401,
            errorMsg: 'Unauthorized',
            errorDetailsCode: code,
            errorDetails: constants.http[code]
        };
        res.header('www-Authenticate','Bearer realm="Service"')
        return res.status(401).json(response);
    },
    internalServerError: (res,message,data) =>{
        var response ={};
        response.status = 500;
        if(message) {
            response.message = message;
        }
        if(data) {
            response.data = data;
        }
        return res.status(500).json(response)
    },
}