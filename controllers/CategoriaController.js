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
    
    listarCategoria(req, res){
        Categoria.findAll({}).then(function (listaCategoria) {
            console.log(listaCategoria);
            res.render('categoria', {title: 'Categorias', categoria: listaCategoria});
        });
    }
}
module.exports = CategoriaController;
