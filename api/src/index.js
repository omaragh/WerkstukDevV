const express = require("express");
const app = express();
require('dotenv').config();
const {createTable} = require("./Helpers/dbHelper");

const db = require('knex')({
  client: 'pg',
  connection: {
    host: process.env.POSTGRES_HOST,
    port: 5432,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE
  }
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", async (req, res) => {
  res.json({message: "Server depoloyed!"});
});

app.get('/users', async (req, res) => {
  const result = await db
  .select("*")
  .from('users');
  res.json(result);
});

/**  Creates a user with the given data
 * @params 
 * @returns all the inserted data
 */
app.post('/user', async (req, res) => {
  if (!req.body.uuid || !req.body.name || !req.body.age) {
    res.status(400).json('incomplete data');
  }else {
    const result = await db.insert([{
      uuid: req.body.uuid,
      name: req.body.name,
      age: req.body.age
    }, ]).table('users').returning('*').then((res) => {
      console.log(`Added user ${req.body.name && req.body.uuid}`);
      return res;
    });
    res.send(result);
  }
});

/** Delete all data of a user based on a unique identifier
 * @param
 * @returns the deleted user
 */
app.delete('/deleteUser/:uuid', async (req, res) => {
  if (req.params.uuid){
    const result = await db
    .table('users')
    .where({uuid: req.params.uuid})
    .del('*')
    console.log(`Deleting user: ${req.params.uuid}`)
    res.status(200).send(result);
  }else{
    res.status(400).send("id not found");
  }
});

/** Delete all users
 * @param
 * @returns the deleted users
 */
app.delete('/deleteUsers', async (req, res) =>{
  const result = await db
  .table('users')
  .del('*')
  .then((res) => {
    return res;
  });
  res.send(result);
})

createTable(db);
module.exports = app
