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
                    res.redirect('/categorias');
                    console.log('Se guardo categoria............');
                    req.flash('info', 'Creación exitosa', false);
                }
            });
        } else {
            Categoria.update({
                nombre: req.body.nombre
            }, {where: {external_id: req.body.external}}).then(function (updatedcategoria, created) {
                res.redirect('/categorias');
                if (updatedcategoria) {
                    req.flash('info', 'Modificación éxitosa', false);
                    console.log('Se modifico categoria............');
                }
            });
        }
    }

    listarCategoria(req, res) {
<<<<<<< HEAD
        Categoria.findAll({where:{estado: true}}).then(function (listaCategoria) {                 
            res.render('categoria', {title: 'Categorias', categoria: listaCategoria});
=======
        Categoria.findAll({}).then(function (listaCategoria) {
            res.render('categoria', {title: 'Categorias', categoria: listaCategoria, comerciante: req.user.nombre});
        });
    }
    listarCategorias(req, res) {
        Categoria.findAll({}).then(function (listaCategoria) {
            res.status(200).json(listaCategoria);
>>>>>>> next
        });
    }

    //metodo para elminar  
    static eliminarCategoria(id) {
        console.log("id****************");
        console.log(id);
        Categoria.destroy({where: [{estado: false}, {id: id_categoria}]}); //borrar reserva no pagada
    }



    buscarCategoria(req, res) {
        var nombre = req.params.nombre;
        Categoria.findAll({where: {nombre: {$like: '' + nombre + '%'}}}).then(function (categoria) {
            if (categoria) {
                res.status(200).json(categoria);
            }
        }).catch(function (err) {
            res.status(500).json(err);
        });
    }
}
module.exports = CategoriaController;
