const express = require("express");
const app = express();
require('dotenv').config();
const {createTable, createModelsTable} = require("./Helpers/dbHelper");

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

/** Get root route
 * 
 * @returns a message that shows the server is up and running
 */
app.get("/", async (req, res) => {
  console.log(process.env.DB_PASSWORD);
  res.json({message: "Server depoloyed!"});
});

/** Get all users
 * 
 * @returns json object of all users
 */
app.get('/users', async (req, res) => {
  const result = await db
  .select("*")
  .from('users');
  res.json(result);
});

/**
 * Get all models
 * 
 * @returns all models as json object
 */
app.get('/models', async (req, res) => {
  const result = await db
  .select("*")
  .from('users');
  res.json(result);
})

/**  Creates a user with the given data
 * @params uuid, name, age - user data to be sent
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

/**
 * Uploads model by user
 * @params title, create date, creator name
 * @returns all the inserted data
 */
app.post('/model', async (req,res) =>{
  if (!req.body.title || !req.body.createDate || !req.body.userName){
    res.status(400).json('incomplete data');
  }else{
    
    const returned = await db.insert([{
      title: req.body.title,
      createDate: new Date(),
      userName: req.body.userName
    }])
  }
})

/** Delete all data of a user based on a unique identifier
 * @params uuid - deleting the user after incorporating the id in the route
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
 * 
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

createModelsTable(db);
createTable(db);
module.exports = app
