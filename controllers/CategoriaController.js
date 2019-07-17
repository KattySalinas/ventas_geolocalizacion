'use strict';
var models = require('../models/index');
var Categoria = models.categoria;
const uuidv4 = require('uuid/v4');
class CategoriaController {
    guardarCategoria(req, res) {
        Categoria.create({
            nombre: req.body.nombre,
            external_id: uuidv4()

        }).then(function (newCategoria, created) {
            console.log(newCategoria);
            if (newCategoria) {
                res.redirect('/categorias');
                console.log('Se guardo categoria............');
                req.flash('info', 'Creación exitosa', false);
            }
        });

    }
    editarCategoria(req, res) {
        Categoria.update({
            nombre: req.body.nombre1
        }, {where: {external_id: req.body.external}}).then(function (updatedcategoria, created) {
            if (updatedcategoria) {
                req.flash('info', 'Modificación éxitosa', false);
                console.log('Se modifico categoria............');
                res.redirect('/categorias');
            }
        });
    }

    listarCategoria(req, res) {
        Categoria.findAll({}).then(function (listaCategoria) {
            res.render('categoria', {title: 'Categorias', categoria: listaCategoria});
        });
    }
}
module.exports = CategoriaController;
