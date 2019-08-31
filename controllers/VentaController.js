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
var Comerciante = models.comerciante;

class VentaController {
    listarCLientes(req, res) {

        Producto.findAll({include: [{model: Galeria}, {model: Categoria}]}).then(function (productos) {
            // console.log(productos);
            Geolocalizacion.findAll({include: [{model: Persona, include: [Cliente]}]}).then(function (Lclientes) {
                Venta.findAll({include: [{model: Cliente, include: [{model: Persona, include: [Geolocalizacion]}]},
                        {model: Detalle, include: [{model: Producto, include: [Categoria]}]},
                        {model: Pago}
                    ]}).then(function (ventas) {
                    req.session.carrito = [];
                    res.render('venta', {
                        title: 'Ventas',
                        comerciante: req.user.nombre,
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
        //console.log('lista');
        //console.log(lista);
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
        console.log('...'+ req.user.id_comerciante);
        Comerciante.findOne({where: {external_id: req.user.id_comerciante}}).then(function (comerciante) {
            console.log('comerciante');
            console.log(comerciante);
            Venta.create({
                external_id: uuidv4(),
                fecha: req.body.fecha,
                valor_total: req.body.total,
                id_cliente: req.body.cliente,
                id_comerciante: comerciante.id
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
                        fecha: req.body.fecha,
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
        });
    }

    buscarProductoVenta(req, res) {
        var nombre = req.params.nombre;
        Producto.findAll({where: {nombre: {$like: '' + nombre + '%'}}}).then(function (productos) {
            if (productos) {
                console.log(productos.length);
                getGalerias([], productos, 0, function (galerias){
                    console.log('volvi');
                    console.log(galerias);
                    res.status(200).json(galerias);
                });
            }
        }).catch(function (err) {
            res.status(500).json(err);
        });
    }
    mostrarProductoVenta(req, res) {
        Producto.findAll({}).then(function (productos) {
            if (productos) {
                console.log(productos.length);
                getGalerias([], productos, 0, function (galerias){
                    console.log('volvi');
                    console.log(galerias);
                    res.status(200).json(galerias);
                });
            }
        }).catch(function (err) {
            res.status(500).json(err);
        });
    }

    buscarVenta(req, res) {
        var nombre = req.params.nombre;
        Geolocalizacion.findAll({include: {model: Persona, where: {nombre: {$like: '' + nombre + '%'}},
        include: [{ model: Cliente, include: { model: Venta,include: { model: Detalle, include: { model: Producto, attributes: ['nombre'], include: [Categoria]}}}}]             
        }}).then((venta) => {
        console.log(venta);
        console.log(venta.length);
        res.status(200).send(venta);
        }).catch((err) => {
        res.status(500).send({ message: 'Error en la peticion' });
        });  
        /*Venta.findAll({ where: {'$Instruments.nombre$': {$like: '' + nombre + '%'}},include: [{model: Cliente, include: [{model: Persona, as: 'Instruments', include: [Geolocalizacion]}]},
            {model: Detalle, include: [{model: Producto, include: [Categoria]}]},
            {model: Pago}
        ]}).then(function (ventas) {
            console.log(ventas.length);
            res.status(200).send(ventas);
        }).catch((err) => {
            res.status(500).send({ message: 'Error en la peticion' });
        }); */     
        
    }   

}
function getGalerias(galerias, productos, pos, callback) {
    if (pos < productos.length) {
        var id_producto = productos[pos].dataValues.id;
        //console.log(id_dependencia);
        Galeria.findAll({where: {id_articulo: id_producto }}).then(function (galeria) {
            console.log(galeria);
            console.log(galeria.length);
            galerias.push({
                producto: productos[pos].dataValues,
                url: (galeria && galeria.length>0)?galeria[0].dataValues.foto:''
            });
            pos = pos + 1;
            getGalerias(galerias, productos, pos, callback);
        }).catch(function (err) {
            console.log("galerias " + err);
            pos = pos + 1;
            getGalerias(galerias, productos, pos, callback)
        });
    } else {
        callback(galerias);
    }
}


module.exports = VentaController;


