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
        },
        entrada: {
            type: Sequelize.DOUBLE
        },
        saldo: {
            type: Sequelize.DOUBLE
        },
        external_id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4
        },
        fecha: {
            type: Sequelize.DATEONLY
        }                                                                                                                                                                           
    }, {freezeTableName: true,
        createdAt: 'fecha_registro',
        updatedAt: 'fecha_modificacion'
    });  
    Pago.belongsTo(Venta, {
        foreignKey: 'id_venta',
        constraints: false
    });
    Pago.associate = function (models) {
        models.pago.hasMany(models.cronograma, {
            foreignKey: 'id_pago'
        });
    };


    return Pago;
};

