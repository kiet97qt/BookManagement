const nodemailer = require("nodemailer");
const constants = require("../constants");
const UtilResponseService = require("../services/UtilResponseService");

async function createBook(data) {
    try{
        const bookCreated = await Books.create(data).fetch();
        return UtilResponseService.buildServiceResponse(bookCreated,null,constants.RESOURCE_SUCCESSFULLY_CREATED)
    }  catch (err){
        return UtilResponseService.buildServiceResponse(null,err,constants.DATABASE_ERROR)
    }
}; 

async function findById(id) {
    try{
        const bookGot = await Books.findOne({ _id : id });
        return UtilResponseService.buildServiceResponse(bookGot,null,constants.RESOURCE_SUCCESSFULLY_GOT)
    }  catch (err){
        return UtilResponseService.buildServiceResponse(null,err,constants.DATABASE_ERROR)
    }
}; 

async function findAll() {
    try{
        const bookGot = await Books.find({});
        //throw new Error("Error 404")
        return UtilResponseService.buildServiceResponse(bookGot,null,constants.RESOURCE_SUCCESSFULLY_GOT)
    }  catch (err){
        console.log("err",err)
        return UtilResponseService.buildServiceResponse(null,err,constants.DATABASE_ERROR)
    }
}; 

async function updateOne(id,data) {
    try{
        const bookUpdated = await Books.updateOne({ _id : id }).set(data);
        return UtilResponseService.buildServiceResponse(bookUpdated,null,constants.RESOURCE_SUCCESSFULLY_UPDATED)
    }  catch (err){
        return UtilResponseService.buildServiceResponse(null,err,constants.DATABASE_ERROR)
    }
}; 

async function deleteOne(id,data) {
    try{
        const bookDeleted = await Books.destroyOne({ _id : id }).fetch();
        return UtilResponseService.buildServiceResponse(bookDeleted,null,constants.RESOURCE_SUCCESSFULLY_DELETED)
    }  catch (err){
        return UtilResponseService.buildServiceResponse(null,err,constants.DATABASE_ERROR)
    }
}; 

async function sendMailFromAdmin(mailOptions) {
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'kietnodejs1997@gmail.com',
          pass: 'redagon291'
        }
      });
      try {
        const mail = await transporter.sendMail(mailOptions)
        return UtilResponseService.buildServiceResponse(mail,null,constants.MAIL_SUCCESSFULLY_SENT)
      } catch (err){
        return UtilResponseService.buildServiceResponse(null,err,constants.MAIL_SENT_ERROR)  
    }
  }

module.exports = {
    createBook,
    findAll,
    findById,
    updateOne,
    deleteOne,
    sendMailFromAdmin,
}