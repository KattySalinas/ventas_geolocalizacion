'use strict';
var models = require('../models/index');
var uuidv4 = require('uuid/v4');
var Producto = models.articulo;
var Geolocalizacion = models.geolocalizacion;
var Cliente = models.cliente;
var Persona = models.persona;
var Venta = models.venta;
var Detalle = models.detalle_articulo;
var Categoria = models.categoria;
class PagosController {
    listarPagos(req, res) {

        Venta.findAll({include: [
                {model: Cliente, include:
                            [{model:Persona,
                            include: [Geolocalizacion]}]}, 
                {model: Detalle, include: [{model: Producto, include: [Categoria]}]}]}).then(function (ventas) {
            //console.log('ventas....');
             //console.log(ventas);
            
                res.render('payments', {
                    title: 'Pagos',
                    ventas: ventas
                });
            });
        
    }

}
module.exports = PagosController;





