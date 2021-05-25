/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },
  'GET /book/:id': {
    controller: "LivreController",
    action: "getBook",
    swagger: {
      summary: 'Get a Book',
      description: 'Get a record book in database by ID.',
      responses: {
        '200': {
          description: 'The requested resource',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  '$ref': '#/components/schemas/Books'
                },
              }
            }
          }
        }
      }
    }        
  },
  'PUT /book/:id': {
    controller: "LivreController",
    action: "borrowBook",
    swagger: {
      summary: 'Borrow Book',
      description: 'Update Isavailable Status of Book and sent Email If book was borrowed',
      responses: {
        '200': {
          description: 'Updated successfully',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  '$ref': '#/components/schemas/Books'
                },
              }
            }
          }
        },
        '201': {
          description: 'Mail sent successfully',
        }
      }
    }        
  },
  'DELETE /book/:id': {
    controller: "LivreController",
    action: "deleteBook",
    swagger: {
      summary: 'Delete a Book',
      description: 'Delete a record book in database by ID.',
      responses: {
        '200': {
          description: 'Deleted successfully',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  '$ref': '#/components/schemas/Books'
                },
              }
            }
          }
        }
      }
    }            
  },
  'GET /books':{
    controller: "LivreController",
    action: "getAllBook",
    swagger: {
      summary: 'Get All Books',
      description: 'Get all of records book in database.',
      responses: {
        '200': {
          description: 'The requested resource',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  '$ref': '#/components/schemas/Books'
                },
              }
            }
          }
        }
      }
    }
  },
  'POST /book': {
    controller: "LivreController",
    action: "createBook",
    swagger: {
      summary: 'Create Book',
      description: 'Create Book.',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                '$ref': '#/components/schemas/Books'
              },
            }
          }
        }
      },
      responses: {
        '201': {
          description: 'Created successfully',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  '$ref': '#/components/schemas/Books'
                },
              }
            }
          }
        }
      }
    }
  },


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
