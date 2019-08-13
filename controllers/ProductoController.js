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
        if(req.body.external == 0) {
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
                //console.log("*********");
                //console.log(req.body);
                //console.log("*********");
                //console.log("****-------*****");
                var i = 0;
                req.body.base.forEach(element => {
                    console.log("***///////******");
                    if (element.length > 0) {
                        i++;
                        var base64Str = element;
                        var external = uuid();
                        var name = req.body.nombre+"_"+i;
                        var optionalObj = {'fileName': name, 'type': 'png'};
                        base64ToImage(base64Str, path, optionalObj);
                        console.log("***///////******");
                        data.push({foto: name + ".png", external_id: external, id_articulo: producto.id});
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
        } else {
            Producto.update({
                id_categoria: req.body.categoria,
                nombre: req.body.nombre,
                marca: req.body.marca,
                descripcion: req.body.descripcion,
                cantidad: req.body.cantidad,
                precio: req.body.precio,
                estado: req.body.estado,
            },{where: {external_id: req.body.external}} ).then((updated, created) => {
                Producto.findAll({limit: 1, where: {external_id: req.body.external}}).then(produ => {
                    let id = produ[0].dataValues.id;
                    var data = [];
                    var path = "public/uploads/";
                    var i = 0;
                    req.body.base.forEach(element => {
                        console.log('aqui estoy');
                        //console.log(element);
                        console.log("***///;////******");
                        if (element.length > 0) {
                            i++;
                            var base64Str = element;
                            var external = uuid();
                            var name = req.body.nombre+"_"+i;
                            var optionalObj = {'fileName': name, 'type': 'png'};
                            base64ToImage(base64Str, path, optionalObj);
                            console.log("***///////******");
                            data.push({foto: name + ".png", external_id: external, id_articulo: id});
                        }
                    });
                    if (data.length > 0) {
                        Galeria.destroy({where: {id_articulo: id}}).then(()=>{
                            Galeria.bulkCreate(data).then(() => {
                                res.redirect('/productos');
                            }).catch(err => {
                                console.log(err);
                                res.status(500).json(err);
                            });
                        });
                    }
                });
            });
        }
    }
    listarProducto(req, res) {
        Categoria.findAll({}).then(function (categoria) {
            if (categoria) {
                Producto.findAll({include: [{model: Galeria},{model:Categoria}]}).then(function (listaProducto) {
                    console.log(listaProducto[0].galeria);
                    /*Galeria.findAll({include: {model: Producto}}).then(function (listaGaleria) {
                        //console.log(listaGaleria);
                        res.render('producto', {
                            title: 'Productos',
                            producto: listaProducto,
                            categoria: categoria,
                            galeria: listaGaleria
                        });
                    });*/
                    
                            res.render('producto', {
                            title: 'Productos',
                            producto: listaProducto,
                            categoria: categoria
                        });


                });
            }
        });
    }
 

}
module.exports = ProductoController;
