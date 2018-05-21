const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const {app, database} = require('../server');

chai.use(chaiHttp);

describe('Endpoint tests', () => {

  beforeEach((done) => {
    database.migrate.rollback()
      .then(() => {
      database.migrate.latest()
      .then(() => {
        return database.seed.run()
      .then(() => {done()})
      })
    })
  })

  it('should GET all the photos', (done) => {
    chai.request(app)
    .get('/api/v1/photos')
    .then(response => {
      response.should.have.status(200);
      response.should.be.json;
      response.body.should.be.a('array');
      response.body.length.should.equal(2)
      response.body[0].should.have.property('id')
      response.body[0].id.should.equal(1)
      response.body[0].should.have.property('title')
      response.body[0].title.should.equal('Rainbow Dog')
      response.body[0].should.have.property('link')
      response.body[0].link.should.equal('https://i.imgur.com/MA2D0.jpg')
      done()
    })
  })

})