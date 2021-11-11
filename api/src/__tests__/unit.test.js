const key = require('../uuid');

describe('uuid test', () =>{
    test('check if the uuid is valid', ()=>{
        expect(key.generateUUID()).toMatch(/^[0-9A-F]{8}-[0-9A-F]{4}-[1][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)
    });
    test('check if uuid is not undefined', ()=>{
        expect(key.generateUUID()).toBeDefined();
    })
});
