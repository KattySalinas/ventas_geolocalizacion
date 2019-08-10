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

var venta = require('../controllers/VentaController');
var VentaController = new venta;

var pagos = require('../controllers/PagosController');
var PagosController = new pagos;


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


router.get('/ventas', VentaController.listarCLientes);

router.post('/registrarComerciante', CuentaController.guardarComerciante);

router.get('/productos', ProductoController.listarProducto);
router.post('/registrarProducto', multer.any(), ProductoController.guardarProducto);

router.get('/rutas', function (req, res) {
    res.render('rutas', {title: 'Rutas'});
});
router.get('/home', function (req, res) {
    res.render('home', {title: 'Home'});
});

router.get('/pagos', PagosController.listarPagos);

router.post('/registrarComerciante', CuentaController.guardarComerciante);
router.post('/iniciar_sesion', CuentaController.iniciarSesion);

router.get('/categorias', CategoriaController.listarCategoria);
router.post('/registrarCategoria', CategoriaController.guardarCategoria);

router.get('/compra/carrito/listado', VentaController.mostrarCarrito);
router.get('/mostrar_carrito/:external', VentaController.cargarCarro);
router.get('/quitar_carrito/:external', VentaController.quitar_item);
router.get('/agregar_carrito/:external', VentaController.agregar_item);
router.post('/guardar_venta', VentaController.guardar);

module.exports = router;
