const request = require('supertest')
const { assert } = require ('chai')
const nock =require('nock')




describe('GET /rankindexdata', function () {
    before(() => { 
      nock('http://www.whsasf.com')
      .get('/rankindexdata')
      .delay(200)
      .reply(200,{'data':21212121})
    });
    it('responds with text', function(done) {
      request('http://www.whsasf.com')
        .get('/rankindexdata')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, {'data':21212121},done);
    });
  });

