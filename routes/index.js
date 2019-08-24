var express = require('express');
var router = express.Router();
var multer = require('multer')({
    dest: 'public/uploads/',
    limites: {fieldSize: 255 * 1024 * 1024}
});

var cuenta = require('../controllers/CuentaController');
var CuentaController = new cuenta();

var categoria = require('../controllers/CategoriaController');
var CategoriaController = new categoria();

var producto = require('../controllers/ProductoController');
var ProductoController = new producto();

var cliente = require('../controllers/ClienteController');
var ClienteController = new cliente();

var venta = require('../controllers/VentaController');
var VentaController = new venta();

var pagos = require('../controllers/PagosController');
var PagosController = new pagos();

var home = require('../controllers/HomeController');
var HomeController = new home();


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Pagina de inicio'});
});

router.get('/registrarCuenta', function (req, res) {
    res.render('registrarCuenta', {title: 'Cuenta', mensaje: req.flash('info')});
});

//HOME
router.get('/home', HomeController.contarClientes);

//CLIENTE
router.get('/clientes', ClienteController.listarCLientes);
router.post('/registrarCliente', ClienteController.guardarCliente);
router.get('/buscarCliente/:nombre', ClienteController.buscarCliente);

//CUENTA
router.post('/registrarComerciante', CuentaController.guardarComerciante);
router.post('/iniciar_sesion', CuentaController.iniciarSesion);

//CATEGORIA
router.get('/categorias', CategoriaController.listarCategoria);
router.post('/registrarCategoria', CategoriaController.guardarCategoria);
router.get('/buscarCategoria/:nombre', CategoriaController.buscarCategoria);

//PRODUCTO
router.get('/productos', ProductoController.listarProducto);
router.post('/registrarProducto', multer.any(), ProductoController.guardarProducto);
router.get('/buscarProducto/:nombre', ProductoController.buscarProducto);

//VENTA
router.get('/compra/carrito/listado', VentaController.mostrarCarrito);
router.get('/mostrar_carrito/:external', VentaController.cargarCarro);
router.get('/quitar_carrito/:external', VentaController.quitar_item);
router.get('/agregar_carrito/:external', VentaController.agregar_item);
router.post('/guardar_venta', VentaController.guardar);
router.get('/ventas', VentaController.listarCLientes);
router.get('/buscarProductoVenta/:nombre', VentaController.buscarProductoVenta);
router.get('/buscarVenta/:nombre', VentaController.buscarVenta);

//PAGO
router.get('/pagos', PagosController.listarPagos);
router.post('/guardar_pago', PagosController.guardar);
router.get('/listar_pagos/:id', PagosController.listarPago);

router.get('/rutas', function (req, res) {
    res.render('rutas', {title: 'Rutas'});
});
router.get('/home', function (req, res) {
    res.render('home', {title: 'Home'});
});




module.exports = router;
