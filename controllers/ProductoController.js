'use strict';
var models = require('../models/index');
var Galeria = models.galeria;
var Producto = models.articulo;
var Categoria = models.categoria;
const uuidv4 = require('uuid/v4');
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
                    res.render('producto', {producto: listaProducto, title: 'Productos', categoria: categoria});
                });
            }
        });
    }
}
module.exports = ProductoController;
