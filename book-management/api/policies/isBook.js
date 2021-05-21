const Joi = require('joi');
const UtilResponseService = require("../services/UtilResponseService");

const schema = Joi.object({
    title: Joi.string()
        .min(0)
        .max(1500)
        .required(),

    numberOfPages: Joi.number()
        .min(0)
        .required(),

    author: Joi.string()
        .min(0)
        .max(100)
        .required(),
    
    isAvailable: Joi.bool()
        .required(),
})
module.exports = async function modelValidation(req, res, next) {
  try {
    const {value,error}  = await schema.validate(req.body);
    console.log(value)
    if (error != null) {
        err = error.details[0]
        err.statusCode = 400
        return res.badRequest({ error: err }, req.options.action);
    } else {
      return next();
    }
  }
  catch (err) { 
    return UtilResponseService.buildServiceResponse(null,err,null)
    }
  };
