const request = require('supertest')
const { assert } = require ('chai')
const app = require ('../app.js')
const nock =require('nock')




describe('GET /rankindexdata', function () {
    before(() => { server = app.listen(8888) ;
    });
    it('responds with json', function(done) {
      request(server)
        .get('/rankindexdata')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
    it('responds with text', function(done) {
      request(server)
        .get('/rankindexdata')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

