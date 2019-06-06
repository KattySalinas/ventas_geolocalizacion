module.exports = function (sequelize, Sequelize) {
    var cuota = require('../models/cuota');
    var Cuota = new cuota(sequelize, Sequelize);
    var Plazo = sequelize.define('plazo', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        saldo: {
            type: Sequelize.DOUBLE
        },
        interes: {
            type: Sequelize.DOUBLE
        }
    },{freezeTableName: true,
        timestamps: false
    });
    
    Plazo.associate = function (models) {
        models.plazo.hasOne(models.pago, {
            foreignKey: 'id_plazo'
        });
    };
    Plazo.belongsTo(Cuota, {
        foreignKey: 'id_cuota',
        constraints: false
    });

    return Plazo;
};
