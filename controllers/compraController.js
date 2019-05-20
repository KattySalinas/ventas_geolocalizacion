'use strict';
var models = require('../models/index');
var Producto = models.producto;
var Categoria = models.categoria;
var Cliente = models.cliente;
var Compra = models.compra;
const uuidv4 = require('uuid/v4');
class CompraController {
    guardar(req, res) {
        //console.log('external............................' + req.body.external1);
        if (req.body.external1 == 0) {
            Compra.create({
                external_id: uuidv4(),
                fecha: req.body.fecha,
                valor: req.body.valor,
                entrada: req.body.entrada,
                saldo: req.body.saldo,
                id_producto: req.body.producto,
                id_cliente: req.body.cliente
            }).then(function (newCliente, created) {
                if (newCliente) {
                    console.log('Se guardo cliente............');
                    res.redirect('/clientes');
                    req.flash('info', 'Se ha creado correctamente');
                    //res.redirect('/administracion');
                }
            });
        } else {
            Compra.update({
                fecha: req.body.fecha,
                valor: req.body.valor,
                entrada: req.body.entrada,
                saldo: req.body.saldo,
                id_producto: req.body.producto,
                id_cliente: req.body.cliente
            }, {where: {external_id: req.body.external1}}).then(function (updatedcategoria, created) {
                
                if (updatedcategoria) {
                    res.redirect('/clientes');
                    req.flash('info', 'Se ha creado correctamente', false);
                    console.log('Se modifico cliente............');
                }
            });
        }
    }
    listarCompras(req, res){
        Compra.findAll({include: {model: Producto}}).then(function (compras) {
            res.status(200).json(compras);
        });
    }
   
}
module.exports = CompraController;




