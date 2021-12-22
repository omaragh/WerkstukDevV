# Anymate

Api for users and uploaded 3D models V1

## Description

list of endpoints to retrieve, delete and push user data to the db, users can post a model, edit and delete it from the models db

## Getting Started
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

endpoints:
GET /users
GET /user/:uuid
POST /user
PATCH /user/:uuid
DELETE /user/uuid

GET /models
GET /model/:uuid
POST /model
PATCH /model/:uuid
DELETE /model/:uuid

## Authors

Omar Aghallaj
