module.exports = function (sequelize, Sequelize) {
    var comerciante = require('../models/comerciante');
    var Comerciante = new comerciante(sequelize, Sequelize);
    var Cronograma = sequelize.define('cronograma', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        fecha: {
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
    
    Cronograma.belongsTo(Comerciante, {
        foreignKey: 'id_comerciante'
    }); 
    
    return Cronograma;
};