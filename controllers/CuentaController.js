'use strict';
var models = require('../models/index');
var Persona = models.persona;
var Comerciante = models.comerciante;
var Cuenta = models.cuenta;
class CuentaController {
    guardarComerciante(req, res) {
        Comerciante.findOne({ruc: req.body.ruc}).then(function (err, comerciante) {
            if (err) {
                console.log('error....' + err);
                res.redirect('/registrarCuenta');
            } else {
                if (comerciante) {
                    console.log("comerciante registrado :)");
                    res.redirect("/");
                } else {
                    Persona.create({
                        nombre: req.body.nombre,
                        apellido: req.body.apellido,
                        telefono: req.body.telefono
                    }).then(function (newPersona) {
                        if (newPersona) {
                            console.log('persona..........' + newPersona.id);
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
                                        if (newComerciante) {
                                            console.log("...Se registrò correctamente");
                                            res.redirect("/registrarCuenta");
                                        }
                                    });
                                }
                            });
                        }

                    });


                }
            }
        });

    }
}
module.exports = CuentaController;