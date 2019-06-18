'use strict';
var models = require('../models/index');
var Producto = models.articulo;
var Categoria = models.categoria;
const uuidv4 = require('uuid/v4');
class ProductoController {
    guardarProducto(req, res) {
        if (req.body.external == 0) {
            Producto.create({
                id_categoria: req.body.categoria,
                nombre: req.body.nombre,
                marca: req.body.marca,
                descripcion: req.body.descripcion,
                cantidad: req.body.cantidad,
                precio: req.body.precio,
                estado: req.body.estado,
                external_id: uuidv4()

            }).then(function (newProducto, created) {
                console.log(newProducto);
                if (newProducto) {
                    res.redirect('/productos');
                    console.log('Se guardo producto............');
                    req.flash('info', 'Creación exitosa', false);
                }
            });
        } else {
            Producto.update({
                id_categoria: req.body.categoria,
                nombre: req.body.nombre,
                marca: req.body.marca,
                descripcion: req.body.descripcion,
                cantidad: req.body.cantidad,
                precio: req.body.precio,
                estado: req.body.estado,
            }, {where: {external_id: req.body.external}}).then(function (updatedcategoria, created) {
                res.redirect('/productos');
                if (updatedcategoria) {
                    req.flash('info', 'Modificación éxitosa', false);
                    console.log('Se modifico producto............');
                }
            });
        }
    }
    listarProducto(req, res) {
        Categoria.findAll({}).then(function (categoria) {
            if (categoria) {
                Producto.findAll({include: {model: Categoria}}).then(function (listaProducto) {
                    res.render('producto', {producto: listaProducto, title: 'Productos', categoria: categoria});
                });
            }
        });
    }
}
module.exports = ProductoController;
