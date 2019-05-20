'use strict';
var models = require('../models/index');
var Producto = models.producto;
var Categoria = models.categoria;
var Cliente = models.cliente;
const uuidv4 = require('uuid/v4');
class CategoriaController {
    guardar(req, res) {
        //console.log('external............................' + req.body.external);
        if (req.body.external == 0) {
            Cliente.create({
                external_id: uuidv4(),
                nombre: req.body.nombre,
                direccion: req.body.direccion,
                referencias: req.body.referencias,
                telefono: req.body.telefono               
            }).then(function (newCliente, created) {
                if (newCliente) {
                    console.log('Se guardo cliente............');
                    res.redirect('/clientes');
                    req.flash('info', 'Se ha creado correctamente');
                    //res.redirect('/administracion');
                }
            });
        } else {
            Categoria.update({
                nombre: req.body.nombre,
                direccion: req.body.direccion,
                referencias: req.body.referencias,
                telefono: req.body.telefono
            }, {where: {external_id: req.body.external}}).then(function (updatedcategoria, created) {
                
                if (updatedcategoria) {
                    res.redirect('/clientes');
                    req.flash('info', 'Se ha creado correctamente', false);
                    console.log('Se modifico cliente............');
                }
            });
        }
    }
    verProductos(req, res){
        Producto.findAll({include: {model: Categoria}}).then(function (productos) {
             res.status(200).json(productos);
        });       
    }
    listarClientes(req, res){
        Cliente.findAll({}).then(function (clientes) {
             res.status(200).json(clientes);
        });
    }

}
module.exports = CategoriaController;

