const BookService = require("../services/BookService");

module.exports = {
    getBook: async function (req,res) {
        const id = req.param('id')
        var book = await BookService.findById(id);
        return res.json(book);
    },
    getAllBook: async function (req,res) {
        var book = await BookService.findAll();
        return res.json(book);   
    },
    createBook: async function (req,res) {
        const { title, numberOfPages,author, isAvailable} = req.body;
        const newBook ={
            title,
            numberOfPages,
            author,
            isAvailable,
        }; 
        console.log(newBook) 
        var newbook = await BookService.create(newBook);    
        return res.json(newbook);
    },

    borrowBook: async function (req,res) {
        const id = req.param('id')
        var book = await BookService.findById(id);
        if(book.isAvailable == false){
            const mailOptions = {
                from: 'kietnodejs1997@gmail.com',
                to: 'manapro0123@gmail.com',
                subject: '[LIBRARY] Information about book borrowed',
                text: `Book Information:
                    Title: ${book.title}
                    Number Of Pages: ${book.numberOfPages}
                    Author: ${book.author}`
              };
            await BookService.sendMailFromAdmin(mailOptions)
            return res.json("Book is borrowed");
        } 
        var bookModified = await BookService.updateOne(id,req.body);
        return res.json(bookModified);
    },

    deleteBook: async function (req,res) {
        const id = req.param('id')
        var book = await BookService.deleteOne(id);
        return res.json(book);
    },
  };