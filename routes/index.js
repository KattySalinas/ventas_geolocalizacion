var express = require('express');
var router = express.Router();
var passport = require('passport');

var multer = require('multer')({
    dest: 'public/uploads/',
    limites: {fieldSize: 25 * 1024 * 1024}
});
var auth = function middleWare(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        req.flash('error', 'Inicia sesion!!!');
        res.redirect('/');
    }
}

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

var rutas = require('../controllers/RutasController');
var RutasController = new rutas();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Pagina de inicio', message: req.flash('error')});
});

router.get('/registrarCuenta', function (req, res) {
    res.render('registrarCuenta', {title: 'Cuenta'});
});

//HOME
router.get('/estadHome', function (req, res) {
    res.render('home', {title: 'Home'});
});
router.get('/home', HomeController.contarClientes);
router.get('/homeClientes', HomeController.listarCronogramaRuta);

//CLIENTE
router.get('/clientes', auth, ClienteController.listarCLientes);
router.post('/registrarCliente', auth, ClienteController.guardarCliente);
router.get('/buscarCliente/:nombre', ClienteController.buscarCliente);

//CATEGORIA
router.get('/categorias', auth, CategoriaController.listarCategoria);
router.post('/registrarCategoria', auth, CategoriaController.guardarCategoria);
router.get('/buscarCategoria/:nombre', CategoriaController.buscarCategoria);

//PRODUCTO
router.get('/productos', auth, ProductoController.listarProducto);
router.post('/registrarProducto', multer.any(), ProductoController.guardarProducto);
router.get('/buscarProducto/:nombre', auth, ProductoController.buscarProducto);

//VENTA
router.get('/compra/carrito/listado', auth, VentaController.mostrarCarrito);
router.get('/mostrar_carrito/:external', auth, VentaController.cargarCarro);
router.get('/quitar_carrito/:external', auth, VentaController.quitar_item);
router.get('/agregar_carrito/:external', VentaController.agregar_item);
router.post('/guardar_venta', auth, VentaController.guardar);
router.get('/ventas', auth, VentaController.listarCLientes);
router.get('/buscarProductoVenta/:nombre', VentaController.buscarProductoVenta);
router.get('/buscarVenta/:nombre', VentaController.buscarVenta);

//PAGO
router.get('/pagos', auth, PagosController.listarPagos);
router.post('/guardar_pago', auth, PagosController.guardar);
router.get('/listar_pagos/:id', auth, PagosController.listarPago);

//SESION COMERCIANTE
router.post('/registro_comerciante',
        passport.authenticate('local-signup', {successRedirect: '/',
            failureRedirect: '/registrarCuenta', failureFlash: true}
        ));
router.post('/iniciar_sesion',
        passport.authenticate('local-signin',
                {successRedirect: 'home',
                    failureRedirect: '/', failureFlash: true}
        ));

router.get('/cerrar_sesion', CuentaController.cerrar);

//RUTAS
router.get('/rutas', auth, function (req, res, next) {
    res.render('rutas', {title: 'Rutas'});
});
router.get('/buscarPorFecha/:fecha', auth, RutasController.BuscarFechaPago);



module.exports = router;
