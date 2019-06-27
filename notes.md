# server testing

## components of an api

function name(args) => return something;

#things we can test:
- routes/endpoints: url(data) => return response;
- business logic (validation/data conversion/operations).
- data access: talk to the persistent data store.

set the test environment to run on 'node' instead of a browser (so can do things global)

//see documentation regarding what jest implementations are from jest.config.js

//end to end test

#green field/ brown field
-green field: build from scratch

-brown field: code in production, being used
may be harder test, since someone else wrote it
take in consideration someone else wrote it


//seperating server and index (without listening to server in server) avoids running into test problems with address & routes

//avoids running and listenng to port on same instance??

#How to manually to test endpoint?
-postman/insomnia

#library: super test
yarn add supertest --dev


#working with async code in Jest:

1st: Return the Promise let Jest handle
(louis prefers this method)

describe('server', () => {
    describe('GET /', () => {
        it('responds with 200 OK', () => {
           return supertest(server)
            .get('/')
            .expect(200);

            //
            })
        })
    })


2nd: use squad : async/await 
always make sure you test fails
(async easy false positives)

(to make sure get json back:
expect takes meta data you can take as response)

describe('server', () => {
 describe('GET /', () => {
        it('responds with 200 OK', () => {
         await  supertest(server)
            .get('/')
            .expect('Content-Type', /json/i );

            //
            })
        })
    })


3rd:



            it( 'responds {api: "up" }' , async () => {
              await supertest(server)
              .get('/')
              .then(res => {
                expect(res.body).toEqual({api: 'up'});
              });
          
            })
             })


#no try catch when testing
want test to fail 

#change dbConfig.js file to be able to grab test environment
instead of development (from knexfile has scripts for these enviornments)

dbconfig.js should look like:


const knex = require('knex');
const config = require('../knexfile.js');

const environment = process.env.DB_ENV || 'testing'; //instead of 'development'

module.exports = knex(config[environment]);

#we don't want to touch development db while doing our tests
#the test db in this example is initially empty

#Install of cross-env
- Helps you set your build or test enviornments

ex:

scripts: {
"build": "cross-env NODE_ENV=production webpack --config build/webpack
"test": "cross-env DB_ENV=testing jest --watch"

}

#for example, get rid of async in front of function insert
from hobbitsModel.js
then write your test

#LAYER TYPES FOR TESTING
#ROUTER CALL, ENDPOINT, MW, DATA ACCESS LAYER (IS BACKEND), TEST LOGIC LAYER (PURE FUNCTION UNIT TESTING)

#DEPLOYMENT to postres
production: {
  client: 'pg',
  connection: dbConnection, 
  migrations: {
    directory: './data/migrations',
  },
  seeds: {
    directory: './data/seeds',
  },
