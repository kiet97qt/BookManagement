module.exports = {


    friendlyName: 'Livre Controller',
  
  
    description: 'Livre Controller',
  
  
    inputs: {
        userId: {
            description: 'The ID of the user to look up.',
            // By declaring a numeric example, Sails will automatically respond with `res.badRequest`
            // if the `userId` parameter is not a number.
            type: 'number',
            // By making the `userId` parameter required, Sails will automatically respond with
            // `res.badRequest` if it's left out.
            required: true
          }
    },
  
  
    exits: {
        success: {
            responseType: 'view',
            viewTemplatePath: 'pages/welcome'
          },
          notFound: {
            description: 'No user with the specified ID was found in the database.',
            responseType: 'notFound'
          }
    },
  
  
    getBook: async function ({userId}) {
      // All done.
      return res.json("asdasd");
  
    },

    createBook: async function (req,res) {
        // All done.
        const { title, numberOfPages,author, isAvailable} = req.body;
        const newBook ={
            title,
            numberOfPages,
            author,
            isAvailable,
        }; 
        console.log(newBook) 
        var newbook = await Books.create(newBook);    
        return res.json(newbook);
    }
  
  
  };