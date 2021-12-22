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

    test('PUT /user/:uuid returns modified user data based on uuid', (done)=>{
        request.put(`/user/${idP}`)
        .send({uuid: idP, name: "Omar edited"})
        .then((resp)=>{
            expect(resp.status).toBe(200);
            done();
        }).catch((resp)=>{
            expect(resp.status).toBe(400);
            done()
        })

    })
    test('DELETE /user/:uuid', (done)=>{
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
});

describe('insert model data, get all models, get, edit and delete model', ()=>{
    const idM = key.generateUUID();
    test('returns status code 200 if model is passed', (done) =>{
        request.post('/model')
        .send({uuid: idM, title: "running man", CreatedBy:"Omar"})
        .then((response)=>{
            expect(response.status).toBe(200);
            done();
        })
        .catch((e)=>{
            done(e)
        })
    });

    test('GET /models returns models from db & 200', async ()=>{
        const resp = await request.get('/models');
        expect(resp.statusCode).toBe(200);
        expect(typeof resp.body).toBe("object");
    });

    test('GET /model/:uuid returns model based on uuid', async ()=>{
        const resp = await request.get(`/model/${idM}`);
        expect(resp.statusCode).toBe(200);
        expect(typeof resp.body).toBe("object");
    });

    test('PUT /model/:uuid returns modified model data based on uuid', (done)=>{
        request.put(`/model/${idM}`)
        .send({uuid: idM, title: "edited title"})
        .then((resp)=>{
            expect(resp.status).toBe(200);
            done();
        }).catch((e)=>{
            done(e)
        })

    })
    test('DELETE /model/:uuid', (done)=>{
        request.delete(`/model/${idM}`)
        .then((resp)=>{
            expect(resp.status).toBe(200);
            done();
        })
        .catch((e)=>{
            done(e)
        })
    });
});