'use strict';
var models = require('../models/index');
var Persona = models.persona;
var Comerciante = models.comerciante;
var Cuenta = models.cuenta;
var Cliente = models.cliente;
var uuidv4 = require('uuid/v4');
var Geolocalizacion = models.geolocalizacion;
class RutasController {
    BuscarCliente(req, res) {
        Cliente.findAll()
    }
 
   
}
module.exports = RutasController;


