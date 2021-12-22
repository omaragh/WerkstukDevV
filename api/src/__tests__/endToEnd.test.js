const supertest = require('supertest');
const app = require('../index')
const request = supertest(app);
const key = require('../uuid');
jest.useFakeTimers()

describe('end to end test', ()=>{
    const id = key.generateUUID();
    const idN = key.generateUUID();

    test('create user', (done)=>{
        request.post('/user')
        .send({uuid: id, name: "omarTest", age: "25"})
        .then((response)=>{
            expect(response.status).toBe(200);
            expect(typeof response.body[0].name).toBe("string")
            expect(typeof response.body[0].age).toBe("string")
            done();
        })
        .catch((e)=>{
            done(e)
        })
    })

    test('create user with missing data', (done)=>{
        request.post('/user')
        .send({uuid: id,name: "", age: "25"})
        .then((response)=>{
            expect(response.status).toBe(400);
            expect(response.body[0].name).toBe(undefined);
            done();
        }) 
        .catch((e)=>{
            done(e)
        })
    })

    test('create user with duplicate uuid', (done)=>{
        request.post('/user')
        .send({uuid: id, name: "Omar", age: "20"})
        .then((response)=>{
            console.log(response.text);
            expect(response.status).toBe(400);
            done();
        }) 
        .catch((e)=>{
            done(e)
        })
    });
    test('logged in user', async()=>{
        const data = await request.get(`/user/${id}`);
        expect(data.body[0].name).not.toBeNaN();
        expect(data.body[0].name && data.body[0].age).toBeTruthy();
    })
    test('Edit user name', (done)=>{
        request.patch(`/user/${id}`)
        .send({uuid: id, name: "sasha"})
        .then((response)=>{
            expect(response.status).toBe(200);
            done();
        }) 
        .catch((e)=>{
            done(e)
        })
    })

    test('edited user fetch', async()=>{
        const data = await request.get(`/user/${id}`);
        expect(data.body[0].name).toBe("sasha");
    })

    test('post a model', (done)=>{
        request.post('/model')
        .send({uuid: idN, title: "running man", CreatedBy:"Omar"})
        .then((response)=>{
            expect(response.status).toBe(200);
            expect(typeof response.body[0].title).toBe("string")
            expect(typeof response.body[0].CreatedBy).toBe("string")
            expect(response.body[0].title).not.toBeNull()
            expect(response.body[0].CreatedBy).not.toBeNull()
            done();
        })
        .catch((e)=>{
            done(e)
        })
    })
    test('Edit model name', (done)=>{
        request.patch(`/model/${idN}`)
        .send({uuid: idN, title: "walking man"})
        .then((response)=>{
            expect(response.status).toBe(200);
            done();
        }) 
        .catch((e)=>{
            done(e)
        })
    })
    test('delete a model', (done)=>{
        request.delete(`/model/${idN}`)
        .then((resp)=>{
            expect(resp.status).toBe(200);
            done();
        })
        .catch((e)=>{
            done(e)
        }); 
    });
})