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
  console.log(`all users in db : ${JSON.stringify(result)}`)
  res.json(result);
});

/** Get a user based on a unique identifier
 * @params send uuid as param to fetch the user
 * @returns all user data
 */
 app.get('/user/:uuid', async (req, res) => {
  const result = await db.select(['*']).from('users').where({uuid: req.params.uuid})
  console.log(`logged in as : ${JSON.stringify(result)}`)
  res.status(200).json(result)
});

/**  Creates a user with the given data
 * @params uuid, name, age - user data to be sent
 * @returns all the inserted data
 */
app.post('/user', async (req, res) => {
  const data = await db.select("*").from("users");

  let info = [];
  for(let i = 0; i<data.length; i++){
    info.push(data[i].uuid);
  }

  if (!req.body.uuid || !req.body.name || !req.body.age) {
    res.status(400).json('incomplete data');
  }else if (info.includes(req.body.uuid)){ 
    res.status(400).json('uuid exists already');
  }else {
    const result = await db.insert([{
      uuid: req.body.uuid,
      name: req.body.name,
      age: req.body.age
    }, ]).table('users').returning('*').then((res) => {
      console.log(`Added user ${req.body.name + ", " + req.body.uuid}`);
      return res;
    });
    res.send(result);
  }
});

/**
 * Change details of the user
 * @params Send data through the body to change the details that will be modified.
 * @returns Returns status 200/OK
 */
 app.patch("/user/:uuid", async (req, res) => {
   if(req.params.uuid){
     const result = await db
     .table("users")
     .where({uuid: req.params.uuid})
     .update(req.body)
     res.sendStatus(200);
   }else{
     res.sendStatus(400);
   }
  
})
/** Delete all data of a user based on a unique identifier
 * @params uuid - deleting the user after incorporating the id in the route
 * @returns the deleted user
 */
app.delete('/user/:uuid', async (req, res) => {
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
app.delete('/users', async (req, res) =>{
  const result = await db
  .table('users')
  .del('*')
  .then((res) => {
    return res;
  });
  res.send(result);
})


/**
 * Get all models
 * 
 * @returns all models as json object
 */
 app.get('/models', async (req, res) => {
  const result = await db
  .select("*")
  .from('models');
  res.json(result);
})

/** Get a model based on a unique identifier
 * @params send uuid as param to fetch the model
 * @returns all model data
 */
 app.get('/model/:uuid', async (req, res) => {
  const result = await db.select(['*']).from('models').where({uuid: req.params.uuid})
  res.json(result)
});
/**
 * Uploads model by user
 * @params uuid, title, creator name
 * @returns all the inserted data
 */
app.post('/model', async (req,res) =>{
  const data = await db.select("*").from("models");

  let info = [];
  for(let i = 0; i<data.length; i++){
    info.push(data[i].uuid);
  }

  if (!req.body.uuid || !req.body.title || !req.body.CreatedBy){
    res.status(400).json("incomplete data");
  }else if (info.includes(req.body.uuid)){ 
    res.status(400).json('uuid exists already')
  }else{
    const returned = await db.insert([{
      uuid: req.body.uuid,
      title: req.body.title,
      CreatedBy: req.body.CreatedBy
    }]).table('models').returning('*').then((res) => {
      console.log(`Added model ${req.body.uuid + " name: " + req.body.title + " & Created by: " +req.body.CreatedBy}`);
      return res;
    });
    res.send(returned);
  }
})

/**
 * Change details of the model
 * @params Send data through the body to change the details that will be modified.
 * @returns Returns status 200/OK
 */
app.patch("/model/:uuid", async (req, res) => {
  if(req.params.uuid){
    const result = await db
    .table("models")
    .where({uuid: req.params.uuid})
    .update(req.body)
    res.sendStatus(200);
  }else{
    res.sendStatus(400);
  }
})

/** Delete all data of a model based on a unique identifier
 * @params uuid - deleting the model after incorporating the id in the route
 * @returns the deleted model
 */
 app.delete('/model/:uuid', async (req, res) => {
  if (req.params.uuid){
    const result = await db
    .table('models')
    .where({uuid: req.params.uuid})
    .del('*')
    console.log(`Deleting model: ${req.params.uuid}`)
    res.status(200).send(result);
  }else{
    res.status(400).send("id not found");
  }
});

/** Delete all models
 * 
 * @returns the deleted model
 */
 app.delete('/models', async (req, res) =>{
  const result = await db
  .table('models')
  .del('*')
  .then((res) => {
    return res;
  });
  res.send(result);
})

createModelsTable(db);
createTable(db);
module.exports = app
