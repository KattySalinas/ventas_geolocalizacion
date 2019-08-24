module.exports = function (sequelize, Sequelize) {
    var persona = require('../models/persona');
    var Persona = new persona(sequelize, Sequelize);
    var Comerciante = sequelize.define('comerciante', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        ruc: {
            type: Sequelize.STRING(50)
        },
        external_id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4
        },
        estado: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }

    }, {freezeTableName: true,
        createdAt: 'fecha_registro',
        updatedAt: 'fecha_modificacion'
    });

    Comerciante.belongsTo(Persona, {
        foreignKey: 'id_persona'
    });
    Comerciante.associate = function (models) {
        models.comerciante.hasMany(models.venta, {
            foreignKey: 'id_comerciante'
        });        
    };


    return Comerciante;
};
