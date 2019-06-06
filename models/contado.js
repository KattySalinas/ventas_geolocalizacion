module.exports = function (sequelize, Sequelize) {
    var pago = require('../models/pago');
    var Pago = new pago(sequelize, Sequelize);
    var Contado = sequelize.define('contado', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        total: {
            type: Sequelize.DOUBLE
        }
    },{freezeTableName: true,
        timestamps: false
    });    
    
    Contado.belongsTo(Pago, {
        foreignKey: 'id_pago',
        constraints: false
    });

    return Contado;
};


