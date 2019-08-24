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
var Pago = models.pago;
class PagosController {
    listarPagos(req, res) {

        Venta.findAll({include: [
                {model: Cliente, include:
                            [{model: Persona,
                                    include: [Geolocalizacion]}]},
                {model: Detalle, include: 
                            [{model: Producto, include: [Categoria]}]},
                {model: Pago}
            ]}).then(function (ventas) {

            //console.log('ventas....');
            //console.log(ventas);

            res.render('payments', {
                title: 'Pagos',
                ventas: ventas
            });
        });

    }
    guardar(req, res) {
        Pago.create({
            external_id: uuidv4(),
            valor: req.body.valor,
            entrada: req.body.entra,
            saldo: req.body.saldo,
            fecha: req.body.fecha,
            id_venta: req.body.id_venta
        }).then(function (newPago) {
            console.log('se creo pago');
            res.redirect("/pagos");
        });
    }
   listarPago(req, res){
       var id = req.params.id;
       Pago.findAll({where: {id_venta: id}}).then(function (pagos) {
            res.status(200).json(pagos);
        });
   }

}
module.exports = PagosController;





