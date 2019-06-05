module.exports = function (sequelize, Sequelize) {
    var articulo = require('../models/articulo');
    var Articulo = new articulo(sequelize, Sequelize);
    var Galeria = sequelize.define('galeria', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        foto: {
            type: Sequelize.STRING(50)
        },
        external_id: {
            type: Sequelize.UUID
        }

    },{timestamps: false,
        freezeTableName: true
    });
    
    Galeria.belongsTo(Articulo, {
        foreignKey: 'id_articulo',
        constraints: false
    });

    return Galeria;
};


