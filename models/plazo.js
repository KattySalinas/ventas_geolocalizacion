module.exports = function (sequelize, Sequelize) { 
    var pago = require('../models/pago');
    var Pago = new pago(sequelize, Sequelize);
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
    
    Plazo.belongsTo(Pago, {
        foreignKey: 'id_pago',
        constraints: false
    });
    
    Plazo.associate = function (models) {        
        models.plazo.hasMany(models.cuota, {
            foreignKey: 'id_plazo'
        });
    };
    
    return Plazo;
};
