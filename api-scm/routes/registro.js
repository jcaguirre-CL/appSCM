//este archivo habilita las respuestas en la API
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Registro = require('../models/Registro.js');
// var responsables = ["giglesias","malvear","hmeza","gerardo.pizarro","csalinas","mmendezp","jcaguirre"];
// var plataformas = ["plataforma1","plataforma2"];
// var arreglo = [];
// var item = "";
// const util = require('util');

//lo busca como bitacora
/* GET /todos listing. */
router.get('/queryTimesbyparameters/:key/:value/:fechaIni/:fechaFin', function(req, res, next) {
  //db.collection('test', {req.params.parametro:'plataforma1'}, function(err, collection) {});
  //db.registros.find( { plataforma: 'plataforma1'} ).count()
  console.log('********************key: ' + req.params.key);
  console.log('********************value: ' + req.params.value);


  // console.log('********************longitud: ' + arreglo.length);
  // console.log('********************valores: ' + arreglo[1]);

  // parametro = req.params.parametro;
  //for(var i = 0; i < arreglo.length;i++)

  // for(var i = 0; i < 7;i++){
  key = req.params.key;
  value = req.params.value;
        Registro.count({[key]: value},function (err, registro) {
          if (err) return next(err);
          //DEVUELVE UN AREGLO DE DOCUMENTOS
          //************:  _id: 58a3c0a66f72ad0caba956e7,
          // item = arreglo[i];
          // console.log('************value: ' + registro);//OK
          // res.send(JSON.stringify({ req.params.value: registro }));
          res.json({value: registro});

        });
        // console.log('************value: ' + value._eventsCount);//OK pero como object
        // console.log(util.inspect(value, {showHidden: false, depth: null}));
        // console.log(util.inspect(value));
        // console.log(JSON.stringify(value));
        // console.log('************key: ' + arreglo[i]);//ok

  // }

  // res.json(registro);

});

router.get('/', function(req, res, next) {
  Registro.find(function (err, registro) {
    if (err) return next(err);
    res.json(registro);
  });
});

/* POST /todos */
router.post('/', function(req, res, next) {
  console.log('post');
  Registro.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET /bitacora/id */
router.get('/:id', function(req, res, next) {
  Registro.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });});

/* PUT /todos/:id */
router.put('/:id', function(req, res, next) {
  Registro.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /todos/:id */
router.delete('/:id', function(req, res, next) {
  Registro.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// Carga una vista HTML simple donde irá nuestra Single App Page
// Angular Manejará el Frontend
router.get('*', function(req, res) {
    res.sendfile('./public/index.html');
});

module.exports = router;
