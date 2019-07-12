var express = require('express');
var router = express.Router();

var cuenta = require('../controllers/CuentaController');
var CuentaController = new cuenta;

var categoria = require('../controllers/CategoriaController');
var CategoriaController = new categoria;

var producto = require('../controllers/ProductoController');
var ProductoController = new producto;


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Pagina de inicio' });
});

router.get('/registrarCuenta', function (req, res) {
    res.render('registrarCuenta', {title: 'Cuenta', mensaje: req.flash('info')});
});


router.get('/clientes', CuentaController.listarCLientes); 

<<<<<<< HEAD
router.get('/ventas', function (req, res) {
    res.render('venta', {title: 'Venta'});
}); 

router.post('/registrarComerciante', CuentaController.guardarComerciante);

router.post('/registrarCategoria', CategoriaController.guardarCategoria);
router.get('/categorias',CategoriaController.listarCategoria);

router.post('/registrarProducto', ProductoController.guardarProducto);
router.get('/productos',ProductoController.listarProducto);

=======
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
router.get('/productos', function (req, res) {
    res.render('producto', {title: 'Productos'});
});
router.post('/registrarComerciante', CuentaController.guardarComerciante);
router.post('/iniciar_sesion', CuentaController.iniciarSesion);

router.post('/registrarCategoria', CategoriaController.guardarCategoria);
router.get('/categorias', CategoriaController.listarCategoria);

router.post('/registrarCliente', CuentaController.guardarCliente);
>>>>>>> 9793d62fbc0d4ae3904119d2e48ad2dfd7045132
module.exports = router;
