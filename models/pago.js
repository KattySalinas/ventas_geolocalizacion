module.exports = function (sequelize, Sequelize) {
    var contado = require('../models/contado');
    var Contado = new contado(sequelize, Sequelize);
    var plazo = require('../models/plazo');
    var Plazo = new plazo(sequelize, Sequelize);
    var venta = require('../models/plazo');
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
    },{freezeTableName: true,
        timestamps: false
    });
    
    Pago.belongsTo(Contado, {
        foreignKey: 'id_contado',
        constraints: false
    });
    
    Pago.belongsTo(Plazo, {
        foreignKey: 'id_plazo',
        constraints: false
    });
    
    Pago.belongsTo(Venta, {
        foreignKey: 'id_venta',
        constraints: false
    });

    return Pago;
};

