'use strict';
var models = require('../models/index');
var uuidv4 = require('uuid/v4');
var Producto = models.articulo;
var Categoria = models.categoria;
var Cliente = models.cliente;
var Persona = models.persona;
var Venta = models.venta;
var Detalle = models.detalle_articulo;
var Pago = models.pago;
var Cronograma = models.cronograma;

class HomeController {
    contarClientes(req, res){
        Cliente.count().then(clientesCount => {
            Venta.count().then(ventasCount => {
                Producto.count().then(productosCount => {
                    console.log("Hay " + clientesCount + " clientes");
                    console.log("Hay " + ventasCount + " ventas");
                    console.log("Hay " + productosCount + " productos");
                    res.render('home', {
                        title: 'Home', 
                        clientesCount: clientesCount,
                        ventasCount: ventasCount,
                        productosCount: productosCount,
                        comerciante: req.user.nombre
                    });
                });
            });            
        });
    }

    listarCronogramaRuta(req, res) {
        console.log("Estoy en cronograma");
        Cronograma.findAll({include: 
            [{model: Pago, include: 
                [{model: Venta, include:
                    [{model:Cliente, include: 
                        [{model: Persona}]}]}]}]
            }).then(function (cronograma) {
                res.render('home', {
                    title: 'Home',
                    cronograma: cronograma                    
                });
                console.log(cronograma +"cronogrma");
            });

    }

}

module.exports = HomeController;