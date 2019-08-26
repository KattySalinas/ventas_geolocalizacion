'use strict';
var models = require('../models/index');
var Persona = models.persona;
var Comerciante = models.comerciante;
var Cuenta = models.cuenta;
var Cliente = models.cliente;
var uuidv4 = require('uuid/v4');
var Geolocalizacion = models.geolocalizacion;
var Cronograma = models.cronograma;
var Venta = models.venta;
var Pago = models.pago;

class RutasController {
    BuscarFechaPago(req, res) {
        var fecha = req.params.fecha        
        Cronograma.findAll({ where:{fechaVisita: fecha}, include: 
            [{model: Pago, include: 
                [{model: Venta, include: 
                    [{model: Cliente, include: 
                        [{model: Persona, include: 
                            [{model:Geolocalizacion}]}]}]}]}]
        }).then(function (cronogramas) {
            if(cronogramas){
                console.log(cronogramas);
                res.status(200).json(cronogramas);
            }
        });             
    }
};   

module.exports = RutasController;