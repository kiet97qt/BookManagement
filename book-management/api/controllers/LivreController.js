const constants = require("../constants");
const BookService = require("../services/BookService");
const HttpResponseService = require("../services/HttpResponseService");
var ejs = require("ejs");
const util = require('util');
const asyncEjsRenderFile = util.promisify(ejs.renderFile)

module.exports = {
    getBook: async function (req,res) {
        const id = req.param('id')
        let bookServiceResponse = await BookService.findById(id);
        switch(bookServiceResponse.status){
            case constants.RESOURCE_SUCCESSFULLY_GOT:
                return HttpResponseService.json(200,res,constants.RESOURCE_SUCCESSFULLY_GOT,bookServiceResponse.data)
            default:
                return HttpResponseService.internalServerError(res,constants.DATABASE_ERROR,bookServiceResponse.data)
        }
    },
    getAllBook: async function (req,res) {
        let bookServiceResponse = await BookService.findAll();
        switch(bookServiceResponse.status){
            case constants.RESOURCE_SUCCESSFULLY_GOT:
                return HttpResponseService.json(200,res,constants.RESOURCE_SUCCESSFULLY_GOT,bookServiceResponse.data)
            default:
                return HttpResponseService.internalServerError(res,constants.DATABASE_ERROR,bookServiceResponse.data)
        }
    },
    createBook: async function (req,res) {
        const { title, numberOfPages,author, isAvailable} = req.body;
        const newBook ={
            title,
            numberOfPages,
            author,
            isAvailable,
        }; 
        let bookServiceResponse = await BookService.createBook(newBook);    
        switch(bookServiceResponse.status){
            case constants.RESOURCE_SUCCESSFULLY_CREATED:
                return HttpResponseService.json(201,res,constants.RESOURCE_SUCCESSFULLY_CREATED,bookServiceResponse.data)
            default:
                return HttpResponseService.internalServerError(res,constants.DATABASE_ERROR,bookServiceResponse.data)
        }
    },

    borrowBook: async function (req,res) {
        const id = req.param('id')
        let bookServiceResponse = await BookService.findById(id);
        switch(bookServiceResponse.status){
            case constants.DATABASE_ERROR:
                return HttpResponseService.internalServerError(res,constants.DATABASE_ERROR,bookServiceResponse.data)                
        }
        if(bookServiceResponse.data.isAvailable == false){
            const data = await asyncEjsRenderFile("views/email/bookBorrowed.ejs", { 
                    title: bookServiceResponse.data.title, 
                    numberOfPages: bookServiceResponse.data.numberOfPages,  
                    author: bookServiceResponse.data.author,
                    }
                );
            const mailOptions = {
                from: 'kietnodejs1997@gmail.com',
                to: 'manapro0123@gmail.com',
                subject: '[LIBRARY] Information about book borrowed',
                html: data 
            };
            let mailServiceResponse = await BookService.sendMailFromAdmin(mailOptions)
            switch(mailServiceResponse.status){
                case constants.MAIL_SUCCESSFULLY_SENT:
                    return HttpResponseService.json(201,res,constants.MAIL_SUCCESSFULLY_SENT,mailServiceResponse.data)
                default:
                    return HttpResponseService.json(502,res,constants.MAIL_SENT_ERROR,mailServiceResponse.data)
            }                    
        } else {
            let bookModifiedService = await BookService.updateOne(id,req.body);
            switch(bookModifiedService.status){
                case constants.RESOURCE_SUCCESSFULLY_UPDATED:
                    return HttpResponseService.json(200 ,res,constants.RESOURCE_SUCCESSFULLY_UPDATED,bookModifiedService.data)
                default:
                    return HttpResponseService.internalServerError(res,constants.DATABASE_ERROR,bookModifiedService.data)
            }
        }
    },

    deleteBook: async function (req,res) {
        const id = req.param('id')
        let bookServiceResponse = await BookService.deleteOne(id);
        switch(bookServiceResponse.status){
            case constants.RESOURCE_SUCCESSFULLY_DELETED:
                return HttpResponseService.json(200,res,constants.RESOURCE_SUCCESSFULLY_DELETED,bookServiceResponse.data)
            default:
                return HttpResponseService.internalServerError(res,constants.DATABASE_ERROR,bookServiceResponse.data)
        }
    },
    swagger: {
        components: {
          "schemas": {
            "Books": {
              properties: {
                title:{
                  type: 'string'
                },
                numberOfPages:{
                  type:'string'
                },
                author:{
                    type:'string'
                },
                isAvailable:{
                    type:'bool'
                }
              },
            }
          }
        }
      }
  };