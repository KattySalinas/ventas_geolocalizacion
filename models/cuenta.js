module.exports = function (sequelize, Sequelize) {
    var comerciante = require('../models/comerciante');
    var Comerciante = new comerciante(sequelize, Sequelize);
    var Cuenta = sequelize.define('cuenta', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        }, 
        correo: {
            type: Sequelize.STRING(50)
        },
        clave: {
            type: Sequelize.STRING
        },
        external_id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4
        },
        estado: { 
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
        
    }, {timestamps: false,
        freezeTableName: true
    });
    
    Cuenta.belongsTo(Comerciante, {
        foreignKey: 'id_comerciante',
        constraints: false
    });
    
    return Cuenta;
};

