'use strict';
var models = require('../models/index');
var Persona = models.persona;
var Comerciante = models.comerciante;
var Cuenta = models.cuenta;
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
    iniciarSesion(req, res){
        Cuenta.findOne({where: {correo: req.body.correo}}).then(function (cuenta) {
            console.log('cuenta..' + cuenta);
            console.log('correo..' + req.body.correo);
            if (cuenta) {
                if (cuenta.clave == req.body.clave) {
                    console.log("Se inicio session");
                    res.redirect('/categorias');  
                }else {
                    console.log("datos erroneos");
                    res.redirect('/');  
                }
            }            
        });
        
    }
}
module.exports = CuentaController;