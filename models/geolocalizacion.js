module.exports = function (sequelize, Sequelize) {
    var persona = require('../models/persona');
    var Persona = new persona(sequelize, Sequelize);
    var Geolocalizacion = sequelize.define('geolocalizacion', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        latitud: {
            type: Sequelize.DOUBLE
        },
        longitud: {
            type: Sequelize.DOUBLE
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
    
    Geolocalizacion.belongsTo(Persona, {
        foreignKey: 'id_persona'       
    });

    return Geolocalizacion;
};


