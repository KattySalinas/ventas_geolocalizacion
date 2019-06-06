module.exports = function (sequelize, Sequelize) {
    var Persona = sequelize.define('persona', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        nombre: {
            type: Sequelize.STRING(50)
        },
        apellido: {
            type: Sequelize.STRING(50)
        },
        telefono: {
            type: Sequelize.STRING(15)
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
    
    Persona.associate = function (models) {
        models.persona.hasOne(models.cuenta, {
            foreignKey: 'id_persona'
        });
        models.persona.hasMany(models.geolocalizacion, {
            foreignKey: 'id_persona'
        });
        models.persona.hasOne(models.comerciante, {
            foreignKey: 'id_persona'
        });
        models.persona.hasOne(models.cliente, {
            foreignKey: 'id_persona'
        });
    };

    return Persona;
};
