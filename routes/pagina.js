var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('pagina',{});
  });


  router.get('/administrar', function(req, res, next) {
    res.render('index', { title: 'Agencia', session : req.session });
   });


  module.exports = router;
  
  