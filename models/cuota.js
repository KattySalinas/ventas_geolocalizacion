module.exports = function (sequelize, Sequelize) {
    var plazo = require('../models/plazo');
    var Plazo = new plazo(sequelize, Sequelize);
    var Cuota = sequelize.define('cuota', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        abono: {
            type: Sequelize.DOUBLE
        },
        fecha: {
            type: Sequelize.DATEONLY
        }
    },{freezeTableName: true,
        timestamps: false
    });    
    
    Cuota.belongsTo(Plazo, {
        foreignKey: 'id_plazo',
        constraints: false
    });

    return Cuota;
};
