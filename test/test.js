
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);
describe('Test base de datos Mongo', function() {
  it('Debería insertar una porra',function(done){
    chai.request(server)
    .put('/porra/LaLiga_Santander/2016/sevilla/betis')
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      done();
    });
  });
  it('No debería insertar la misma porra',function(done){
    chai.request(server)
    .put('/porra/LaLiga_Santander/2016/sevilla/betis')
    .end(function(err, res){
      res.should.have.status(500);
      res.should.be.json;
      done();
    });
  });

  it('Debería instertar una apuesta',function(done){
    chai.request(server)
    .put('/apuesta/cr13/LaLiga_Santander/2016/sevilla/3/betis/1')
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      done();
    });
  });

  it('Debería instertar el resultado',function(done){
    chai.request(server)
    .post('/porra/resultado/LaLiga_Santander/2016/sevilla/4/betis/1')
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      done();
    });
  });

});
