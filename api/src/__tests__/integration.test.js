const supertest = require('supertest');
const app = require('../index')
const request = supertest(app);
const key = require('../uuid');

describe ("POST /user", ()=>{
    test('returns status code 201 if name is passed', async () =>{
        const res = await request.post('/user').send({ name: "Omar" });
        expect(res.statusCode).toEqual(201);
    })
})
test('GET /users returns users from db & 200', async ()=>{
    const resp = await request.get('/users');
    expect(resp.statusCode).toBe(200);
    expect(typeof resp.body).toBe("object")
})
