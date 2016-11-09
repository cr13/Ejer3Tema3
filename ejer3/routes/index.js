var express = require('express');
var router = express.Router();
var modelo_porra= require('../models/partido.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Crea una porra
router.put('/porra/:competition/:year/:local/:visitante', function( req, res ) {
    var nueva_porra = new modelo_porra({
    id: req.params.local+"-"+req.params.visitante+"-"+req.params.competition+"-"+req.params.year,
    eq_visitante: req.params.visitante,
    eq_local: req.params.local,
    competicion: req.params.competition,
    anio: req.params.year
  });
  nueva_porra.save(function(err, result) {
    if(err) return res.json(500,{mensaje: 'La porra ya esta registrada'});
    res.json(200, result);
  });
});

//GET - Devuelve los datos de todos los usuarios
router.get('/porras', function(req, res) {
 modelo_porra.find(function(err, result) {
   if(err) return res.json(500, { mensaje:err.message});
   if(result.length==0) return res.json(500, { mensaje: 'No hay ninguna porra' });
   res.json(200,result);
 });
});

router.put('/apuesta/:menda/:competition/:year/:local/:goles_local/:visitante/:goles_visitante', function( req, res ) {
    modelo_porra.findOneAndUpdate({id:req.params.local+"-"+req.params.visitante+"-"+req.params.competition+"-"+req.params.year},{$push: {"apuestas": {usuario:req.params.menda , goles_local:  req.params.goles_local,goles_visitante : req.params.goles_visitante }}},function(error,result){
       if(result.length==0) return res.json(500, { mensaje: "No existe esa porra" });
       res.json(200,result);

    });

});
// Pone el resultado de la porra
router.post('/porra/resultado/:competition/:year/:local/:goles_local/:visitante/:goles_visitante', function( req, res ) {
  modelo_porra.findOneAndUpdate({id:req.params.local+"-"+req.params.visitante+"-"+req.params.competition+"-"+req.params.year},{$set: {"resultado": req.params.goles_local + "-" + req.params.goles_visitante}},function(error,result){
     if(result.length==0) return res.json(500, { mensaje: "No existe esa porra" });
     res.json(200,result);
  });


});

// Muestra todas las apuestas de un partido determinado
router.get('/porra/:id', function(req, res) {
  modelo_porra.find({id: req.params.id},{apuestas:1, _id:0},function(err, result){
    if(result.length==0) return res.json(500, { mensaje: "No existe apuestas para este partido" });
    res.json(200,result);
  });
});

// Recupera el ganador o ganadores de la porra
router.get('/porra/ganador/:competition/:year/:local/:visitante/', function( req, res ) {
  modelo_porra.find({id: req.params.local+"-"+req.params.visitante+"-"+req.params.competition+"-"+req.params.year},{apuestas:1, _id:0},function(err, result){
    if(result.length==0) return res.json(500, { mensaje: "No existe apuestas para este partido" });

    modelo_porra.find({id: req.params.local+"-"+req.params.visitante+"-"+req.params.competition+"-"+req.params.year, apuestas:{usuario:{$in: ["cris"]}}},{apuestas:1, _id:0},function(err, result){
      if(result.length==0) return res.json(500, { mensaje: "No existe apuestas para este partido" });
      res.json(200,result);
    });
  });



});

module.exports = router;
