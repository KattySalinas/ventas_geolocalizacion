'use strict';
var models = require('../models/index');
var Persona = models.persona;
var Comerciante = models.comerciante;
var Cuenta = models.cuenta;
var Cliente = models.cliente;
var uuidv4 = require('uuid/v4');
var Geolocalizacion = models.geolocalizacion;
class ClienteController {
    guardarCliente(req, res) {
        if (req.body.external == 0) {
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
        } else {
            Persona.update({
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                telefono: req.body.telefono
            }, {where: {external_id: req.body.externalp}}).then(function (newPersona) {
                if (newPersona) {
                    Cliente.update({
                        referencias: req.body.referencias,
                        cedula: req.body.cedula,
                        id_persona: newPersona.id
                    }, {where: {external_id: req.body.externalc}}).then(function (newCliente) {
                        if (newCliente) {
                            console.log('se modifico');
                            // res.redirect("/registrarCliente");
                            // req.flash('info', 'Se ha registrado ');
                        }
                    });
                    Geolocalizacion.update({
                        latitud: req.body.latitud,
                        longitud: req.body.longitud,
                        ciudad: req.body.ciudad,
                        direccion: req.body.direccion,
                        id_persona: newPersona.id
                    },  {where: {external_id: req.body.external}}).then(function (newCliente) {
                        if (newCliente) {
                            console.log('se modifico cliente');
                            res.redirect("/clientes");
                            //req.flash('info', 'Se ha registrado ');
                        }
                    });
                    ;
                }
            });
        }
    }
    listarCLientes(req, res) {
        Geolocalizacion.findAll({include: [{model: Persona, include: [Cliente]}]}).then(function (Lclientes) {
            res.render('cliente', {
                title: 'Clientes',
                clientes: Lclientes
            });
        });
    }

    buscarCliente(req, res) {
        var nombre = req.params.nombre;
        Cliente.findAll({include:[{model: Persona, where: {nombre: {$like: '' + nombre + '%'}}}]}).then(function (cliente) {
            if (cliente) {             
                res.status(200).json(cliente);
                console.log(cliente);
            }
        }).catch(function (err) {
            res.status(500).json(err);
        });
    }

}
module.exports = ClienteController;


