const express = require("express");
const app = express();
const key = require('./uuid');

const db = require('knex')({
  client: 'pg',
  version: '9.6',
  searchPath: ['knex', 'public'],
  connection: process.env.PG_CONNECTION_STRING ? process.env.PG_CONNECTION_STRING : 'postgres://yrkvklrh:C0UnGZ-wWcCZgLSmZSvky83lnqBMAtnF@tai.db.elephantsql.com/yrkvklrh'
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/test", async (req, res) => {
  res.json({ message: "pass!" });
});

app.get('/users', async (req, res) => {
  const result = await db.select("*").from('users');
  res.json(result);
  console.log(result);
});

/** Get a user based on a unique identifier
 * @params
 * @returns all user data
 */
app.get('/user/:uuid', async (req, res) => {

});

/**  Creates a table including records
 * @params 
 * @returns all the inserted data
 */
 app.post('/user', async (req, res) => {
   if (!req.body.name){
     res.status(400).json('no name passed');
      return;}
    res.sendStatus(201);
});

/** Delete all data of a user based on a unique identifier
 * @param
 * @returns the deleted user
 */
app.delete('/deleteUser/:uuid', async (req, res) => {

});
 
/** Creates a table for users
 * @param
 * @returns a table user with the neccessary rows
 */
async function createTable() {
  await db.schema.hasTable('users').then(async (exists) => {
    if (!exists) {await db.schema.createTable('users', (table) => {
          table.uuid('uuid');
          table.string('name');
          table.string('age');
        }).then(async () => {console.log('created new table users');
      });
    }
  });
}
createTable()
module.exports = app


