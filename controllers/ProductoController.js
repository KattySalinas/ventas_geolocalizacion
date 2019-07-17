'use strict';
var models = require('../models/index');
var Producto = models.articulo;
var Categoria = models.categoria;
var Galeria = models.galeria;
const uuidv4 = require('uuid/v4');
//para subir archivos
var fs = require('fs');
var maxFileSize = 1 * 1024 * 1024;
var extensiones = ["jpg", "png"];
var formidable = require('formidable');
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

        }).then(function (newProducto, created) {
            console.log(newProducto);
            if (newProducto) {
                Galeria.create({
                    id_articulo: newProducto.id,
                    foto: '8.jpg',
                    external_id: uuidv4()
                }).then(function (newfoto, created) {
                    if (newfoto) {
                        req.flash('info', 'Se ha creado correctamente');
                        console.log('se ha creado producto');
                        res.redirect('/productos');
                    }
                });

            }
        });

    }
    editarProducto(req, res) {
        Producto.update({
            id_categoria: req.body.categoria1,
            nombre: req.body.nombre1,
            marca: req.body.marca1,
            descripcion: req.body.descripcion1,
            cantidad: req.body.cantidad1,
            precio: req.body.precio1,
            estado: req.body.estado1
        }, {where: {external_id: req.body.external}}).then(function (updatedcategoria, created) {
            if (updatedcategoria) {
                res.redirect('/productos');
                req.flash('info', 'Modificación éxitosa', false);
                console.log('Se modifico producto............');
            }
        });
    }

    guardarImagen(req, res) {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            console.log(files.archivo);
            if (files.archivo.size <= maxFileSize) {
                var extension = files.archivo.name.split(".").pop().toLowerCase();
                if (extensiones.includes(extension)) {
                    var nombre = fields.external + "." + extension;
                    fs.rename(files.archivo.path, "public/img/" + nombre, function (err) {
                        if (err)
                            next(err);
                        Galeria.update({
                            foto: nombre
                        }, {where: {external_id: fields.external}}).then(function (updatedImagen, created) {
                            if (updatedImagen) {
                                console.log("Segun yo guarde " + nombre);
                                req.flash('info', 'Se ha subido correctamente', false);
                                res.redirect('/productos');
                            }
                        });
                    });
                } else {
                    ProductoController.eliminar(files.archivo.path);
                    req.flash('error', 'Error de extension');
                    res.redirect('/productos' + fields.external);
                    console.log("error de extension");
                }
            } else {
                ProductoController.eliminar(files.archivo.path);
                req.flash('error', 'Error de tamanio se admite ' + maxFileSize, false);
                res.redirect('/productosa' + fields.external);
                console.log("error de tamanio solo se adminte " + maxFileSize);

            }
        });
    }
    static eliminar(link) {
        fs.exists(link, function (exists) {
            if (exists) {
                console.log('File exists. Deleting now ...');
                fs.unlinkSync(link);
            } else {
                console.log('No se borro ' + link);
            }
        });
    }

    listarProducto(req, res) {
        Categoria.findAll({}).then(function (categoria) {
            if (categoria) {
                Producto.findAll({include: {model: Categoria}}).then(function (listaProducto) {
                    //console.log('producto...' + listaProducto);
                    if (listaProducto) {
                        Galeria.findAll({include: {model: Producto}}).then(function (Lgaleria) {
                           // console.log('galeria...' + Lgaleria);
                            res.render('producto', {
                                title: 'Productos',
                                producto: listaProducto,
                                categoria: categoria,
                                galeria: Lgaleria
                            });
                        });
                    }

                });
            }
        });
    }
}
module.exports = ProductoController;