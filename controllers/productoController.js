'use strict';
var models = require('../models/index');
var Producto = models.producto;
var Categoria = models.categoria;
const uuidv4 = require('uuid/v4');
class ProductoController {

    guardar(req, res) {
        //console.log('external............................' + req.body.external);

        Producto.create({
            nombre: req.body.nombre,
            marca: req.body.marca,
            subnombre: req.body.detalle,
            precio: req.body.precio,
            cantidad: req.body.cantidad,
            id_categoria: req.body.categoria,
            external_id: uuidv4(),
            foto: 'iphone-8-negro.jpg'
        }).then(function (newCategoria, created) {
            if (newCategoria) {
                console.log('Se guardo producto............');
                res.redirect('/producto');
                req.flash('info', 'Se ha creado correctamente');
                //res.redirect('/administracion');
            }
        });
    }
    modificar(req, res) {
        Producto.update({
            nombre: req.body.nombre,
            marca: req.body.marca,
            subnombre: req.body.detalle,
            precio: req.body.precio,
            cantidad: req.body.cantidad,
            id_categoria: req.body.categoria,
            foto: 'iphone-8-negro.jpg'
        }, {where: {external_id: req.body.external1}}).then(function (updatedcategoria, created) {

            if (updatedcategoria) {
                res.redirect('/producto');
                req.flash('info', 'Se ha creado correctamente', false);
                console.log('Se modifico categoria............');
            }
        });
    }

    listarProductos(req, res) {
        Producto.findAll({include: {model: Categoria}}).then(function (productos) {
            res.status(200).json(productos);
        });
    }

}
module.exports = ProductoController;







