const supertest = require('supertest');
const app = require('../index')
const request = supertest(app);
const key = require('../uuid');

describe ("save user data to db, fetch all users and delete the user", ()=>{
    const idP = key.generateUUID();
    test('returns status code 200 if user is passed', (done) =>{
        request.post('/user')
        .send({uuid: idP, name: "omar", age:"25"})
        .then((response)=>{
            expect(response.status).toBe(200);
            done();
        })
        .catch((e)=>{
            done(e)
        })
    })

    test('GET /users returns users from db & 200', async ()=>{
        const resp = await request.get('/users');
        expect(resp.statusCode).toBe(200);
        expect(typeof resp.body).toBe("object");
    })

    test('DELETE /deleteUser/:uuid', (done)=>{
        request.delete(`/deleteUser/${idP}`)
        .then((resp)=>{
            expect(resp.status).toBe(200);
            done();
        })
        .catch((e)=>{
            done(e)
        })
    })
})
