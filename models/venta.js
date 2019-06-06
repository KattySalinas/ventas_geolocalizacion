module.exports = function (sequelize, Sequelize) {
    var cliente = require('../models/cliente');
    var Cliente = new cliente(sequelize, Sequelize);
    var comerciante = require('../models/comerciante');
    var Comerciante = new comerciante(sequelize, Sequelize);
    var Venta = sequelize.define('venta', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        fecha: {
            type: Sequelize.DATEONLY
        },
        valor_total: {
            type: Sequelize.DOUBLE
        },
        descuento: {
            type: Sequelize.DOUBLE
        },
        external_id: {
            type: Sequelize.UUID
        },
        estado: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }

    },{timestamps: false,
        freezeTableName: true
    });
    Venta.belongsTo(Cliente, {
        foreignKey: 'id_cliente'
    });
    Venta.belongsTo(Comerciante, {
        foreignKey: 'id_comerciante'
    });
     Venta.associate= function (models){
        models.venta.hasMany(models.detalle_articulo, {
            foreignKey:'id_venta'});
        models.venta.hasOne(models.pago, {
            foreignKey:'id_venta'});
    };
    

    return Venta;
};




