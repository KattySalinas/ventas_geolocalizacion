'use strict';
var models = require('../models/index');
var Galeria = models.galeria;
var Producto = models.articulo;
var Categoria = models.categoria;
var Galeria = models.galeria;

class homeController {
    listarProducto(req, res) {
        Producto.findAll({include: [{model: Galeria}, {model: Categoria} ]}).then(function (Lproductos) {
            console.log('productos..................');
            console.log(Lproductos);
            console.log('productos..................');
            res.render('home', {
                title: 'Inicio',
                producto: Lproductos
            });
        });
    }
}

module.exports = homeController;


