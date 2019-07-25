var express = require('express');
var router = express.Router();

var cuenta = require('../controllers/CuentaController');
var CuentaController = new cuenta;

var categoria = require('../controllers/CategoriaController');
var CategoriaController = new categoria;

var producto = require('../controllers/ProductoController');
var ProductoController = new producto;

var cliente = require('../controllers/ClienteController');
var ClienteController = new cliente;

var multer = require('multer')({
    dest: 'public/uploads/',
    limites: {fieldSize: 25 * 1024 * 1024}
});

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Pagina de inicio'});
});
router.get('/demo', function (req, res, next) {
    res.render('demo', {title: 'Pagina de inicio'});
});

router.get('/registrarCuenta', function (req, res) {
    res.render('registrarCuenta', {title: 'Cuenta', mensaje: req.flash('info')});
});

router.get('/clientes', ClienteController.listarCLientes);
router.post('/registrarCliente', ClienteController.guardarCliente);


router.get('/ventas', function (req, res) {
    res.render('venta', {title: 'Venta'});
});

router.post('/registrarComerciante', CuentaController.guardarComerciante);


router.get('/productos', ProductoController.listarProducto);
router.post('/registrarProducto', multer.any(), ProductoController.guardarProducto);

router.get('/rutas', function (req, res) {
    res.render('rutas', {title: 'Rutas'});
});
router.get('/home', function (req, res) {
    res.render('home', {title: 'Inicio'});
});
router.get('/ventas', function (req, res) {
    res.render('venta', {title: 'Ventas'});
});
router.get('/pagos', function (req, res) {
    res.render('payments', {title: 'Pagos'});
});

router.post('/registrarComerciante', CuentaController.guardarComerciante);
router.post('/iniciar_sesion', CuentaController.iniciarSesion);

router.get('/categorias', CategoriaController.listarCategoria);
router.post('/registrarCategoria', CategoriaController.guardarCategoria);

module.exports = router;
