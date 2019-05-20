'use strict';
var models = require('../models/index');
var Categoria = models.categoria;
const uuidv4 = require('uuid/v4');
class CategoriaController {
    guardar(req, res) {
        //console.log('external............................' + req.body.external);

        Categoria.create({
            external_id: uuidv4(),
            nombre: req.body.nombre
        }).then(function (newCategoria, created) {
            if (newCategoria) {
                console.log('Se guardo categoria............');
                res.redirect('/categoria');
                req.flash('info', 'Se ha creado correctamente');
                //res.redirect('/administracion');
            }

        });
    }
    modificar(req, res) {
        Categoria.update({
            nombre: req.body.nombre1
        }, {where: {external_id: req.body.external}}).then(function (updatedcategoria, created) {
            if (updatedcategoria) {
                res.redirect('/categoria');
                req.flash('info', 'Se ha modifico categoria', false);
                console.log('Se modifico categoria............');
            }
        });
    }

    verCategorias(req, res) {
        Categoria.findAll({}).then(function (categorias) {
            res.status(200).json(categorias);
        });
    }

}
module.exports = CategoriaController;

