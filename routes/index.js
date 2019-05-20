var express = require('express');
var router = express.Router();
var passport = require('passport');
var categoria = require('../controllers/categoriaController');
var CategoriaController = new categoria;
var producto = require('../controllers/productoController');
var ProductoController = new producto;
var cliente = require('../controllers/clienteController');
var ClienteController = new cliente;
var compra = require('../controllers/compraController');
var CompraController = new compra;


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Pagina de inicio' });
});
router.get('/plant_iniciar', function (req, res) {
    res.render('inicio_sesion', {title: 'Iniciar sesion'});
});
router.get('/plant_registrar', function (req, res) {
    res.render('registrar', {title: 'Registrar'});
});

router.post('/registrar',
        passport.authenticate('local-signup', {
        successRedirect: '/plant_iniciar',
            failureRedirect: '/plant_registrar'
        }
));
router.post('/iniciar',
        passport.authenticate('local-signin',{
                successRedirect: "/administracion",
                    failureRedirect: "/plant_iniciar"}));

router.get('/administracion', function (req, res) {
    res.render('administracion', {title: 'Administracion'});
});

router.get('/clientes', function (req, res) {
    res.render('clientes', {title: 'Clientes'});
});
router.get('/categoria', function (req, res) {
    res.render('categoria', {title: 'Categoria'});
});
router.get('/producto', function (req, res) {
    res.render('producto', {title: 'Articulo'});
});
router.post('/guardar_categoria', CategoriaController.guardar);
router.get('/lista/categorias', CategoriaController.verCategorias);
router.post('/editar_categoria', CategoriaController.modificar);
router.post('/guardar_producto', ProductoController.guardar);
router.get('/lista/productos', ProductoController.listarProductos);
router.get('/ver_productos', ClienteController.verProductos);
router.post('/guardar_cliente', ClienteController.guardar);
router.get('/listar_clientes', ClienteController.listarClientes);
router.post('/guardar_compra', CompraController.guardar);
router.get('/listar_compras', CompraController.listarCompras);


module.exports = router;
