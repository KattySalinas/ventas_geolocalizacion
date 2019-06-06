module.exports = function (sequelize, Sequelize) {    
    var venta = require('../models/venta');
    var Venta = new venta(sequelize, Sequelize);
    var Pago = sequelize.define('pago', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        valor: {
            type: Sequelize.DOUBLE
        }
    }, {freezeTableName: true,
        createdAt: 'fecha_registro',
        updatedAt: 'fecha_modificacion'
    });
    
    Pago.associate = function (models) {
        models.pago.hasOne(models.contado, {
            foreignKey: 'id_pago'
        });
        models.pago.hasMany(models.plazo, {
            foreignKey: 'id_pago'
        });
    };
        
    Pago.belongsTo(Venta, {
        foreignKey: 'id_venta',
        constraints: false
    });

    return Pago;
};

