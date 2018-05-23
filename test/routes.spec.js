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
    .end((error, response) => {
      response.should.have.status(200);
      response.should.be.json;
      response.body.should.be.a('array');
      response.body.length.should.equal(2);
      response.body[0].should.have.property('id');
      response.body[0].id.should.equal(1);
      response.body[0].should.have.property('title');
      response.body[0].title.should.equal('Rainbow Dog');
      response.body[0].should.have.property('link');
      response.body[0].link.should.equal('https://i.imgur.com/MA2D0.jpg')
      done()
    })
  })

  it('should POST a new photo', (done) => {
    chai.request(app)
    .post('/api/v1/photos')
    .send({
      title: 'Christmas Dog',
      link: 'https://i.imgur.com/qJfO82l.jpg'
    })
    .end((error, response) => {
      response.should.have.status(201);
      response.should.be.json;
      response.body.should.be.a('object');
      response.body.should.have.property('id');
      response.body.id.should.equal(3);
      done()
    })
  })

  it('should not POST a new photo without title', (done) => {
    chai.request(app)
    .post('/api/v1/photos')
    .send({
      link: 'https://i.imgur.com/qJfO82l.jpg'
    })
    .end((error, response) => {
      response.should.have.status(422);
      response.should.be.json;
      response.body.should.be.a('object');
      response.body.should.have.property('error');
      response.body.error.should.equal('You are missing a title');
      done()
    })
  })

  it('should not POST a new photo without link', (done) => {
    chai.request(app)
    .post('/api/v1/photos')
    .send({
      title: 'Christmas Dog'
    })
    .end((error, response)=> {
      response.should.have.status(422);
      response.should.be.json;
      response.body.should.be.a('object');
      response.body.should.have.property('error');
      response.body.error.should.equal('You are missing a link');
      done()
    })
  })

  it('should DELETE a photo', (done) => {
    chai.request(app)
    .delete('/api/v1/photos/2')
    .end((error, response) => {
      response.should.have.status(201);
      response.body.should.have.property('message');
      response.body.message.should.equal('Success')
      done()
    })
  })

  it('should not DELETE a photo if id is wrong', (done) => {
    chai.request(app)
    .delete('/api/v1/photos/222')
    .end((error, response) => {
      response.should.have.status(404);
      response.body.should.have.property('message');
      response.body.message.should.equal('No photo exists')
      done()
    })
  })

})