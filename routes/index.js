var express = require('express');
var router = express.Router();
var passport = require('passport');

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
var auth = function middleWare(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        req.flash('error', 'Inicia sesion!!!');
        res.redirect('/');
    }
}

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Pagina de inicio', message: req.flash('error')});
});
router.get('/demo', function (req, res, next) {
    res.render('demo', {title: 'Pagina de inicio'});
});

router.get('/registrarCuenta', function (req, res) {
    res.render('registrarCuenta', {title: 'Cuenta'});
});

router.get('/clientes', auth, ClienteController.listarCLientes);
router.post('/registrarCliente', auth, ClienteController.guardarCliente);


router.get('/ventas', auth, VentaController.listarCLientes);

router.get('/productos', auth, ProductoController.listarProducto);
router.post('/registrarProducto', multer.any(), ProductoController.guardarProducto);

router.get('/rutas', auth, function (req, res) {
    res.render('rutas', {title: 'Rutas'});
});
router.get('/home',auth,  function (req, res) {
    res.render('home', {title: 'Home'});
});

router.get('/pagos', auth, PagosController.listarPagos);
router.post('/guardar_pago', auth, PagosController.guardar);
router.get('/listar_pagos/:id', auth, PagosController.listarPago);

//router.post('/registrarComerciante', CuentaController.guardarComerciante);
router.post('/registro_comerciante',
        passport.authenticate('local-signup', {successRedirect: '/',
            failureRedirect: '/registrarCuenta', failureFlash: true}
        ));
//router.post('/iniciar_sesion', CuentaController.iniciarSesion);
router.post('/iniciar_sesion',
        passport.authenticate('local-signin',
                {successRedirect: 'home',
                    failureRedirect: '/', failureFlash: true}
        ));

router.get('/cerrar_sesion', CuentaController.cerrar);
router.get('/categorias', auth, CategoriaController.listarCategoria);
router.post('/registrarCategoria', auth, CategoriaController.guardarCategoria);

router.get('/compra/carrito/listado', auth, VentaController.mostrarCarrito);
router.get('/mostrar_carrito/:external', auth, VentaController.cargarCarro);
router.get('/quitar_carrito/:external', auth, VentaController.quitar_item);
router.get('/agregar_carrito/:external', VentaController.agregar_item);
router.post('/guardar_venta', auth, VentaController.guardar);

module.exports = router;
