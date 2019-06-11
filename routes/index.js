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

router.get('/categorias', function (req, res) {
    res.render('categoria', {title: 'Categorias'});
}); 

router.get('/clientes', function (req, res) {
    res.render('cliente', {title: 'Cliente'});
}); 

router.post('/registrarComerciante', CuentaController.guardarComerciante);


router.post('/registrarCategoria', CategoriaController.guardarCategoria);
router.get('/listarCategoria',CategoriaController.listarCategoria);
module.exports = router;
