'use strict';
var models = require('../models/index');
var uuidv4 = require('uuid/v4');
var Galeria = models.galeria;
var Producto = models.articulo;
var Categoria = models.categoria;
var Galeria = models.galeria;
var Geolocalizacion = models.geolocalizacion;
var Cliente = models.cliente;
var Persona = models.persona;
var Venta = models.venta;
var Detalle = models.detalle_articulo;
var Pago = models.pago;

class VentaController {
    listarCLientes(req, res) {

        Producto.findAll({include: [{model: Galeria}, {model: Categoria}]}).then(function (productos) {
            // console.log(productos);
            Geolocalizacion.findAll({include: [{model: Persona, include: [Cliente]}]}).then(function (Lclientes) {
                Venta.findAll({include: [
                        {model: Cliente, include:
                                    [{model: Persona,
                                            include: [Geolocalizacion]}]},
                        {model: Detalle, include:
                                    [{model: Producto, include: [Categoria]}]},
                        {model: Pago}
                    ]}).then(function (ventas) {
                    req.session.carrito = [];
                    res.render('venta', {
                        title: 'Ventas',
                        clientes: Lclientes,
                        productos: productos,
                        ventas: ventas
                    });
                });

            });
        });
    }
    mostrarCarrito(req, res) {
        res.status(200).json(req.session.carrito);

    }

    cargarCarro(req, res) {
        var carrito = req.session.carrito;
        console.log(carrito);
        var external = req.params.external;
        Producto.findOne({where: {external_id: external}, include: {model: Categoria}}).then(function (producto) {
            var pos = VentaController.verificar(carrito, external);
            if (pos == -1) {
                var data = {external: external, categoria: producto.categorium.nombre, nombre: producto.nombre, cant: 1, pu: producto.precio, pt: producto.precio, id: producto.id};
                carrito.push(data);
                console.log(req.session.carrito);
            } else {
                var data = carrito[pos];
                data.cant = data.cant + 1;
                data.pt = data.cant * data.pu;
                carrito[pos] = data;
            }
            req.session.carrito = carrito;
            res.status(200).json(req.session.carrito);
        }).catch(function (err) {
            console.log("Error:", err);
            res.status(500).json(err);
        });
    }
    static verificar(lista, external) {
        console.log('lista');
        console.log(lista);
        var pos = -1;
        for (var i = 0; i < lista.length; i++) {
            if (lista[i].external == external) {
                pos = i;
                break;
            }
        }
        return pos;
    }

    quitar_item(req, res) {
        var carrito = req.session.carrito;
        var external = req.params.external;
        var pos = VentaController.verificar(carrito, external);
        var data = carrito[pos];
        if (data.cant > 1) {
            data.cant = data.cant - 1;
            data.pt = data.cant * data.pu;
            carrito[pos] = data;
            req.session.carrito = carrito;
            res.status(200).json(req.session.carrito);
        } else {
            var aux = [];
            for (var i = 0; i < carrito.length; i++) {
                var items = carrito[i];
                if (items.external != external) {
                    aux.push(items);
                }
            }
            req.session.carrito = aux;
            res.status(200).json(req.session.carrito);
        }
    }

    agregar_item(req, res) {
        var carrito = req.session.carrito;
        var external = req.params.external;
        var pos = VentaController.verificar(carrito, external);
        var data = carrito[pos];
        data.cant = data.cant + 1;
        data.pt = data.cant * data.pu;
        carrito[pos] = data;
        req.session.carrito = carrito;
        res.status(200).json(req.session.carrito);
    }

    guardar(req, res) {
        var carrito = req.session.carrito;
        Venta.create({
            external_id: uuidv4(),
            fecha: req.body.fecha,
            valor_total: req.body.total,
            id_cliente: req.body.cliente
        }).then(function (newVenta, created) {
            if (newVenta) {
                var detalle = [];
                for (var i = 0; i < carrito.length; i++) {
                    var aux = carrito[i];
                    var item = {external_id: uuidv4(), cantidad: aux.cant, precio_unitario: aux.pu, precio_total: aux.pt, id_venta: newVenta.id, id_articulo: aux.id};
                    detalle[i] = item;
                }
                Pago.create({
                    external_id: uuidv4(),
                    valor: req.body.total,
                    entrada: 0,
                    saldo: req.body.total,
                    fecha:req.body.fecha,
                    id_venta: newVenta.id
                });
                Detalle.bulkCreate(detalle).then(() => {
                    return Detalle.findAll({where: {id_venta: newVenta.id}});
                }).then(detalles => {
                    detalles.forEach(function (item) {
                        Producto.findOne({where: {id: item.id_articulo}}).then(function (articulo) {
                            Producto.update({cantidad: articulo.cantidad - item.cantidad},
                                    {where: {id: item.id_articulo}});
                        });
                        req.session.carrito = [];
                        res.redirect("/pagos");
                    });
                });
            }
        });
    }

}

module.exports = VentaController;


