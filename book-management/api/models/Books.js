module.exports.models = {
    attributes: {
      title:{
        type: 'string'
      },
      numberOfPages:{
        type:'number'
      },
      author:{
          type:'string'
      },
      isAvailable:{
          type:'bool'
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
                type:'integer'
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