'use strict';
var models = require('../models/index');
var Persona = models.persona;
var Comerciante = models.comerciante;
var Cuenta = models.cuenta;
var Cliente = models.cliente;
var uuidv4 = require('uuid/v4');
var Geolocalizacion = models.geolocalizacion;
class CuentaController {
    guardarComerciante(req, res) {
        console.log('ruc....' + req.body.ruc);
        Comerciante.findOne({where: {ruc: req.body.ruc}}).then(function (comerciante) {
            if (comerciante) {
                console.log("comerciante registrado :)");
                req.flash('info', '¡Ya existe esta cuenta!');
                res.redirect("/registrarCuenta");
            } else {
                Persona.create({
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    telefono: req.body.telefono
                }).then(function (newPersona) {
                    if (newPersona) {
                        // console.log('persona..........' + newPersona.id);
                        Comerciante.create({
                            ruc: req.body.ruc,
                            id_persona: newPersona.id
                        }).then(function (newComerciante) {
                            if (newComerciante) {
                                console.log("...Se registrò comerciante");
                                Cuenta.create({
                                    correo: req.body.correo,
                                    clave: req.body.contraseña,
                                    id_persona: newPersona.id
                                }).then(function (newCuenta) {
                                    if (newCuenta) {
                                        res.redirect("/registrarCuenta");
                                        req.flash('info', 'Se ha registrado ');
                                        console.log("...Se registrò correctamente");

                                    }
                                });
                            }
                        });
                    }

                });


            }
        });

    }
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
    listarCLientes(req, res){
        Geolocalizacion.findAll({include: {model: Persona}}).then(function (listaClientes) {
            console.log('clientes................'+listaClientes);
            res.render('cliente', {title: 'Clientes', clientes: listaClientes});
        });
    }
    iniciarSesion(req, res) {
        Cuenta.findOne({where: {correo: req.body.correo}}).then(function (cuenta) {
            console.log('cuenta..' + cuenta);
            console.log('correo..' + req.body.correo);
            if (cuenta) {
                if (cuenta.clave == req.body.clave) {
                    console.log("Se inicio session");
                    res.redirect('/categorias');
                } else {
                    console.log("datos erroneos");
                    res.redirect('/');
                }
            }
        });

    }
}
module.exports = CuentaController;