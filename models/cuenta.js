module.exports = function (sequelize, Sequelize) {
    var rol = require('../models/rol');
    var Rol = new rol(sequelize, Sequelize);
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
    
    Cuenta.belongsTo(Rol, {
        foreignKey: 'id_rol',
        constraints: false
    });
    Rol.associate = function (models) {
        models.cuenta.hasOne(models.persona, {
            foreignKey: 'id_cuenta'
        });
    };
    
    return Cuenta;
};

