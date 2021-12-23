# Anymate

Api for users and uploaded 3D models V1

## Description

list of endpoints to retrieve, delete and push user data to the db, users can post a model, edit and delete it from the models db

## Getting Started

Make an .env file with a POSTGRES_PASSWORD &  POSTGRES_USER & POSTGRES_DB
to execute  the program use this command: docker-compose up --build

### Dependencies

* dotenv
* express
* jest
* knex
* nodemon
* pg
* supertest
* uuid

endpoints: <br />
GET /users <br />
``` This returns all users in the DB``` <br />
GET /user/:uuid <br />
``` This returns the user based on uuid:
  http://localhost:3000/user/a73ffd78-44a0-11ec-81d3-2497ac133203
  returns:
  [
    {
        "uuid": "a73ffd78-44a0-11ec-81d3-2497ac133203",
        "name": "name",
        "age": "30"
    }
]
``` 
POST /user <br />
``` Saves user to db (send json object)

{
    "uuid": "a73ffd78-99a0-11ec-81d3-2497ac133203", 
    "name": "Omar", 
    "age":"25"
}
``` 
PATCH /user/:uuid <br />
```edit user data based on uuid:
http://localhost:3000/user/a73ffd78-44a0-11ec-81d3-2497ac133203
{
    "name": "a",
    "age": "13"
}

```
DELETE /user/:uuid <br />
``` Delete user based on uuid
http://localhost:3000/user/a73ffd78-44a0-11ec-81d3-2497ac133203
returns deleted user as confirmation: 
[
    {
        "uuid": "a73ffd78-44a0-11ec-81d3-2497ac133203",
        "name": "a",
        "age": "13"
    }
]
```

GET /models <br />
``` This returns all models in the DB``` <br />
GET /model/:uuid <br />
``` This returns the model based on uuid:
  http://localhost:3000/model/a63ffd78-44a0-11ec-81d3-3586ac130003
  returns:
 [
    {
        "uuid": "a63ffd78-44a0-11ec-81d3-3586ac130003",
        "title": "Running man",
        "CreatedBy": "Omar"
    }
]
``` 
POST /model <br />
``` Saves model to db (send json object)

{
    "uuid": "a63ffd78-44a0-11ec-81d3-3586ac130003",
    "title": "Running man",
    "CreatedBy": "Omar"
}
``` 
PATCH /model/:uuid <br />
```edit model data based on uuid:
http://localhost:3000/model/a63ffd78-44a0-11ec-81d3-3586ac130003
{
    "title": "this is a new title"
}

```
DELETE /model/:uuid <br />
``` Delete model based on uuid
http://localhost:3000/model/a63ffd78-44a0-11ec-81d3-3586ac130003
returns deleted model as confirmation: 
[
    {
        "uuid": "a63ffd78-44a0-11ec-81d3-3586ac130003",
        "title": "this is a new title",
        "CreatedBy": "Omar"
    }
]
```

## Authors

Omar Aghallaj
