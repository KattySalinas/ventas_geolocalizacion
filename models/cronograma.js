module.exports = function (sequelize, Sequelize) {
    var pago = require('../models/pago');
    var Pago = new pago(sequelize, Sequelize);
    var Cronograma = sequelize.define('cronograma', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        fechaVisita: {
            type: Sequelize.DATEONLY
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
    
    Cronograma.belongsTo(Pago, {
        foreignKey: 'id_pago'
    });
    
    
    return Cronograma;
};