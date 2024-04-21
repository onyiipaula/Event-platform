const request =require ('supertest');
const app = require('../index');

describe ('get /vendors', ()=>{
    it ('responds with JSON array of vendors', async ()=>{
        const response = await
        request(index).get('/vendors');
        expect(response.status).toBe(200);

        expect(response.body). toBeInstanceOf(Array);
    });
});