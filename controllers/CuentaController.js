'use strict';
var models = require('../models/index');
var Persona = models.persona;
var Comerciante = models.comerciante;
var Cuenta = models.cuenta;
var Cliente = models.cliente;
var uuidv4 = require('uuid/v4');
var Geolocalizacion = models.geolocalizacion;
class CuentaController {
   
    guardarCliente(req, res) {
        Persona.create({
            nombre: req.body.nombre,
            external_id: uuidv4(),
            apellido: req.body.apellido,
            telefono: req.body.telefono
        }).then(function (newPersona) {
            if (newPersona) {
                Cliente.create({
                    external_id: uuidv4(),
                    referencias: req.body.referencias,
                    cedula: req.body.cedula,
                    id_persona: newPersona.id
                }).then(function (newCliente) {
                    if (newCliente) {
                        console.log('se creo cliente');
                        // res.redirect("/registrarCliente");
                        // req.flash('info', 'Se ha registrado ');
                    }
                });
                Geolocalizacion.create({
                    external_id: uuidv4(),
                    latitud: req.body.latitud,
                    longitud: req.body.longitud,
                    ciudad: req.body.ciudad,
                    direccion: req.body.direccion,
                    id_persona: newPersona.id
                }).then(function (newCliente) {
                    if (newCliente) {
                        console.log('se creo geolo');
                        res.redirect("/clientes");
                        //req.flash('info', 'Se ha registrado ');
                    }
                });
                ;
            }
        });
    }
    editarCliente() {

    }
    listarCLientes(req, res) {
        Geolocalizacion.findAll({include: [{model: Persona, include: [Cliente]}]}).then(function (Lclientes) {
            res.render('cliente', {
                title: 'Clientes',
                clientes: Lclientes
            });
        });
    }
    
   cerrar(req, res) {
        req.session.destroy();
        res.redirect("/");
    }
}
module.exports = CuentaController;