const supertest = require('supertest');
const app = require('../index')
const request = supertest(app);
const key = require('../uuid');

describe ("save user data to db, fetch all users, fetch, edit and delete the user", ()=>{
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
    });

    test('GET /users returns users from db & 200', async ()=>{
        const resp = await request.get('/users');
        expect(resp.statusCode).toBe(200);
        expect(typeof resp.body).toBe("object");
    });

    test('GET /user/:uuid returns user based on uuid', async ()=>{
        const resp = await request.get(`/user/${idP}`);
        expect(resp.statusCode).toBe(200);
        expect(typeof resp.body).toBe("object");
    });

    test('PUT /user/:uuid returns modified user data based on uuid', async ()=>{
        request.put(`/user/${idP}`)
        .send({uuid: idP, name: "Omar edited"})
        .then((resp)=>{
            expect(resp.status).toBe(200);
        }).catch((e)=>{
            expect(resp.status).toBe(400);
            done(e)
        })

    })
    test('DELETE /deleteUser/:uuid', (done)=>{
        request.delete(`/user/${idP}`)
        .then((resp)=>{
            expect(resp.status).toBe(200);
            done();
        })
        .catch((e)=>{
            expect(resp.status).toBe(400);
            done(e)
        })
    });
})

