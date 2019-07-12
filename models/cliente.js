module.exports = function (sequelize, Sequelize) {
    var persona = require('../models/persona');
    var Persona = new persona(sequelize, Sequelize);
    var Cliente = sequelize.define('cliente', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        referencias: {
            type: Sequelize.STRING(50)
        },
        cedula: {
            type: Sequelize.INTEGER
        },
        external_id: {
            type: Sequelize.UUID
        },
        estado: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }

    },{freezeTableName: true,
        createdAt: 'fecha_registro',
        updatedAt: 'fecha_modificacion'
    });
    Cliente.belongsTo(Persona, {
        foreignKey: 'id_persona'
    });

    Cliente.associate = function (models) {
        models.cliente.hasMany(models.venta, {
            foreignKey: 'id_cliente'
        });
    };

    return Cliente;
};


