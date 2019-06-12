var express = require('express');
var router = express.Router();

var cuenta = require('../controllers/CuentaController');
var CuentaController = new cuenta;

var categoria = require('../controllers/CategoriaController');
var CategoriaController = new categoria;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Pagina de inicio' });
});

router.get('/registrarCuenta', function (req, res) {
    res.render('registrarCuenta', {title: 'Cuenta'});
});


router.get('/clientes', function (req, res) {
    res.render('cliente', {title: 'Cliente'});
}); 

router.post('/registrarComerciante', CuentaController.guardarComerciante);


router.post('/registrarCategoria', CategoriaController.guardarCategoria);
router.get('/categorias',CategoriaController.listarCategoria);
router.get('/categorias2',CategoriaController.listarC);
module.exports = router;
