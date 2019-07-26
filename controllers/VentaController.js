'use strict';
var models = require('../models/index');
var Galeria = models.galeria;
var Producto = models.articulo;
var Categoria = models.categoria;
var Galeria = models.galeria;
var Geolocalizacion = models.geolocalizacion;
var Cliente = models.cliente;
var Persona = models.persona;

class VentaController {
    listarCLientes(req, res) {
        Geolocalizacion.findAll({include: [{model: Persona, include: [Cliente]}]}).then(function (Lclientes) {
            res.render('venta', {
                title: 'Ventas',
                clientes: Lclientes
            });
        });
    }
}

module.exports = VentaController;


