const {insert} = require('./hobbitsModel');
const db = require('../data/dbConfig');

describe('hobbits model', () => {
//NEED GLOBAL FUNCTIONS PROVIDE BY JEST THAT CLEAN UP TESTS HERE!!!  
//beforeAll  implements the clean up only once before tests are ran
//beforeEach implements the clean up before each test is ran 


    beforeEach(async () => {
        //truncate clears db very fast, used in seeding
        await db('hobbits').truncate();
})

    //beforeAll, beforeEach, afterAll, afterEach
//beforeAll tests run 

//test that process.env.DB_ENV is pointing to 'testing'

it('should set enviornment to testing', () => {
    //DB_ENV is global
    expect(process.env.DB_ENV).toBe('testing');
});

describe('insert()', () => {
    it('should insert hobbits', async () => {
        await insert({name: 'Matt'});
        await insert({name: 'Jon'});

        const hobbits = await db('hobbits');

        expect(hobbits).toHaveLength(2);
    })
    
    it('should insert provided hobbits', async () => {
    let hobbit = {name: 'Sam'};
    let inserted = await insert (hobbit);
    expect(inserted.name).toBe(hobbit.name);

    hobbit = {name: 'Frodo'};
    inserted = await insert (hobbit);
    expect(inserted.name).toBe(hobbit.name);

    //instead of using get here which is what you're testing, grab direct from db itself
    //must have await for the data that we expect, or object is hobbits itself
    //make sure hobbits model of insert is implemented
    //when testing, re adds the data unless you clean up after each test
    //dont necessarily need to test if db is failing constraints

    //your tests have to implictly test : for example test if  delete function should clear 
    //database

    
  
})
})
});

