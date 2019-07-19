var express = require('express');
var router = express.Router();

var multer = require('multer');
var upload = multer ({dest: './uploads/'});

var fs = require ('fs');

var cuenta = require('../controllers/CuentaController');
var CuentaController = new cuenta;

var categoria = require('../controllers/CategoriaController');
var CategoriaController = new categoria;

var producto = require('../controllers/ProductoController');
var ProductoController = new producto;

var cliente = require('../controllers/ClienteController');
var ClienteController = new cliente;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Pagina de inicio' });
});
router.get('/demo', function(req, res, next) {
  res.render('demo', { title: 'Pagina de inicio' });
});

router.get('/registrarCuenta', function (req, res) {
    res.render('registrarCuenta', {title: 'Cuenta', mensaje: req.flash('info')});
});


router.get('/clientes', ClienteController.listarCLientes); 


router.get('/ventas', function (req, res) {
    res.render('venta', {title: 'Venta'});
}); 

router.post('/registrarComerciante', CuentaController.guardarComerciante);

router.post('/registrarCategoria', CategoriaController.guardarCategoria);
router.post('/editarCategoria', CategoriaController.editarCategoria);
router.get('/categorias',CategoriaController.listarCategoria);

router.post('/registrarProducto', ProductoController.guardarProducto);
router.post('/editarProducto', ProductoController.editarProducto);
router.get('/productos',ProductoController.listarProducto);

<<<<<<< HEAD
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

<<<<<<< HEAD
router.post('/registrarCliente', ClienteController.guardarCliente);
//router.post('/guardar_imagen', ProductoController.guardarImagen);
=======
router.post('/registrarCliente', CuentaController.guardarCliente);

>>>>>>> 344107f8029086a953e6dd3924c3f8ba8adaf140
=======
/*router.post('/registrarProducto', upload.array('base', 6), function(req, res, next) {
    for(var x=0;x<req.files.length;x++) {
       //copiamos el archivo a la carpeta definitiva de fotos
       fs.createReadStream('./uploads/'+req.files[x].filename).pipe(fs.createWriteStream('./public/fotos/'+req.files[x].originalname)); 
       //borramos el archivo temporal creado
       fs.unlink('./uploads/'+req.files[x].filename); 
    }  
    var pagina='<!doctype html><html><head></head><body>'+
               '<p>Se subieron las fotos</p>'+
               '<br><a href="/">Retornar</a></body></html>';
      res.send(pagina);     
});*/

>>>>>>> test
module.exports = router;
