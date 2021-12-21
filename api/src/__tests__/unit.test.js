const key = require('../uuid');

describe('uuid test', () =>{
    test('check if the uuid is valid', ()=>{
        expect(key.generateUUID()).toMatch(/^[0-9A-F]{8}-[0-9A-F]{4}-[1][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
    });
    test('check if uuid is defined', ()=>{
        expect(key.generateUUID()).toBeDefined();
    });
    test('Check if uuid can not be equal', ()=>{
        let uniqueId = key.generateUUID();
        expect(key.generateUUID()).not.toEqual(uniqueId);
    })
});
