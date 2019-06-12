'use strict';
var models = require('../models/index');
var Categoria = models.categoria;
const uuidv4 = require('uuid/v4');
class CategoriaController {
    guardarCategoria(req, res) {
        if (req.body.external == 0) {
            Categoria.create({
                nombre: req.body.nombre,
                external_id: uuidv4()

            }).then(function (newCategoria, created) {
                console.log(newCategoria);
                if (newCategoria) {
                    res.redirect('/categorias2');
                    console.log('Se guardo categoria............');
                    req.flash('info', 'Creación exitosa', false);
                }
            });
        } else {
            Categoria.update({
                nombre: req.body.nombre
            }, {where: {external_id: req.body.external}}).then(function (updatedcategoria, created) {
                res.redirect('/categorias2');
                if (updatedcategoria) {
                    req.flash('info', 'Modificación éxitosa', false);
                    console.log('Se modifico categoria............');
                }
            });
        }
    }

    listarCategoria(req, res) {
        Categoria.findAll({}).then(function (listaCategoria) {            
            res.render('categoria', {title: 'Categorias', categoria: listaCategoria});
        });
    }
    listarC(req, res) {        
        Categoria.findAll({}).then(function (listaCategoria) {            
            res.render('categoria', {title: 'Categorias', categoria: listaCategoria, orden: true});
            console.log(true);
        });
    }
}
module.exports = CategoriaController;
