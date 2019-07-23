'use strict';
var models = require('../models/index');
var Galeria = models.galeria;
var Producto = models.articulo;
var Categoria = models.categoria;
var Galeria = models.galeria;
const uuidv4 = require('uuid/v4');
//para subir archivos
var fs = require('fs');
//var maxFileSize = 1 * 1024 * 1024;
//var extensiones = ["jpg", "png"];
//var formidable = require('formidable');
const Sequelize = require('sequelize');

//Subir imagenes 
/*  
 const fs = require('fs-extra');
 const path = require('path');
 
 const md5 = require('md5');
 
 const ctrl = {};
 
 const sidebar = require('../helpers/sidebar');
 const { randomNumber } = require('../helpers/libs');
 const { Image, Comment } = require('../models');*/

class ProductoController {
    /*guardarProductoo(req, res) {
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
     }*/

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
        })
                .then(producto => {
                    var data = [];
                    req.files.forEach(element => {
                        var extension = element.originalname.split(".").pop();
                        var name = uuidv4() + "." + extension;
                        fs.renameSync(element.destination + "/" + element.filename, "public/uploads/" + name);
                        data.push({foto: name, id_articulo: producto.id_articulo});
                    });
                    if (data.length > 0) {
                        Galeria.bulkCreate(data).then(() => {
                            res.status(201).send();
                        }).catch(err => {
                            console.log(err);
                            res.status(500).json(err);
                        });
                    }

                    res.status(201).send();
                })
                .catch((err) => {
                    console.log(err)
                    res.status(500).json(err);
                });
    }
    guardarImagen(req, res) {
        Producto.findOne({
            where: {id_articulo: req.body.id_articulo}
        }).then(producto => {
            if (producto) {
                var extension = req.file.originalname.split(".").pop();
                var name = uuidv4() + "." + extension;
                fs.renameSync(req.file.destination + "/" + req.file.filename, "public/uploads/" + name);

                Galeria.create({
                    foto: name,
                    id_articulo: req.body.id_articulo
                }).then(image => {
                    res.status(200).json(image);
                }).catch(err => {
                    console.log(err);
                    res.status(500).send();
                });
            }
        }).catch(err => {
            console.log(err);
            fs.unlinkSync(req.file.destination + "/" + req.file.filename);
            res.status(500).send();
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

            }
        }).then(function (newProducto, created) {
            if (newProducto) {
                console.log(newProducto);
                Galeria.create({
                    base: req.body.base,
                    external_id: uuidv4(),
                    id_articulo: newProducto.id
                }).then(function (newGaleria) {
                    if (newGaleria) {
                        res.redirect('/productos');
                        console.log('Se guardo producto............');
                    }
                });
            }
        });
    }
    ;
            /*guardarImagens(req, res) {
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
             }*/
            /*static eliminar(link) {
             fs.exists(link, function (exists) {
             if (exists) {
             console.log('File exists. Deleting now ...');
             fs.unlinkSync(link);
             } else {
             console.log('No se borro ' + link);
             }
             });
             }
             */
            /*  guardarImagen(req, res) {
             ctrl.create = (req, res) => {
             const saveImage = async () => {
             const imgUrl = randomNumber();
             const images = await Image.find({filename: imgUrl});
             if (images.length > 0) {
             saveImage()
             } else {
             // Image Location
             const imageTempPath = req.file.path;
             const ext = path.extname(req.file.originalname).toLowerCase();
             const targetPath = path.resolve(`src/public/upload/${imgUrl}${ext}`);
             
             // Validate Extension
             if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
             // you wil need the public/temp path or this will throw an error
             await fs.rename(imageTempPath, targetPath);
             const newImg = new Image({
             title: req.body.title,
             filename: imgUrl + ext,
             description: req.body.description
             });
             const imageSaved = await newImg.save();
             res.redirect('/images/' + imageSaved.uniqueId);
             } else {
             await fs.unlink(imageTempPath);
             res.status(500).json({error: 'Only Images are allowed'});
             }
             }
             };
             
             saveImage();
             };
             }
             */
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
