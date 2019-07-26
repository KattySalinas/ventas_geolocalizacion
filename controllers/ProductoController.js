'use strict';
var models = require('../models/index');
var Galeria = models.galeria;
var Producto = models.articulo;
var Categoria = models.categoria;
var Galeria = models.galeria;
const uuidv4 = require('uuid/v4');
var fs = require('fs');
const Sequelize = require('sequelize');

var base64ToImage = require('base64-to-image');
var uuid = require('uuid');
class ProductoController {
    guardarProducto(req, res) {
        Producto.create({
            id_categoria: req.body.categoria,
            nombre: req.body.nombre,
            marca: req.body.marca,
            descripcion: req.body.descripcion,
            cantidad: req.body.cantidad,
            precio: req.body.precio,
            estado: req.body.estado,
            external_id: uuidv4()
        }).then(producto => {
            var data = [];
            var path = "public/uploads/";
            console.log("*********");
            console.log(req.body.base[1]);
            console.log("*********");
            console.log("****-------*****");
            req.body.base.forEach(element => {
                console.log("***///////******");
                if (element.length > 0) {
                    var base64Str = element;
                    var name = uuid();
                    var optionalObj = {'fileName': uuid(), 'type': 'png'};
                    base64ToImage(base64Str, path, optionalObj);
                    console.log("***///////******");
                    data.push({foto: name + ".png", external_id: name, id_articulo: producto.id});
                }
            });
            if (data.length > 0) {
                Galeria.bulkCreate(data).then(() => {                    
                    res.redirect('/productos');
                }).catch(err => {
                    console.log(err);
                    res.status(500).json(err);
                });
            }
        }).catch((err) => {
            console.log(err)
            res.status(500).json(err);
        });
    }

    listarProducto(req, res) {
        Categoria.findAll({}).then(function (categoria) {
            if (categoria) {
                Producto.findAll({include: {model: Categoria}}).then(function (listaProducto) {
                    console.log('ESTOY AQUI ***********producto...' + listaProducto);
                    if (listaProducto) {
                        Galeria.findAll({include: {model: Producto}}).then(function (listaGaleria) {
                            console.log('galeria...' + listaGaleria);
                            res.render('producto', {
                                title: 'Productos',
                                producto: listaProducto,
                                categoria: categoria,
                                galeria: listaGaleria
                            });
                        });
                    }

                });
            }
        });
    }
}
module.exports = ProductoController;
