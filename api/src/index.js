const express = require("express");
const app = express();
const key = require('./uuid');
const {createTable} = require("./Helpers/dbHelper");

const db = require('knex')({
  client: 'pg',
  connection: {
    host : process.env.POSTGRES_HOST,
    port : 5432,
    user : process.env.POSTGRES_USER,
    password : process.env.POSTGRES_PASSWORD,
    database : process.env.POSTGRES_DATABASE
  }
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

createTable(db);
module.exports = app


