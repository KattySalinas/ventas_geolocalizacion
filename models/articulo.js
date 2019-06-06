module.exports = function (sequelize, Sequelize) {
    var categoria = require('../models/categoria');
    var Categoria = new categoria(sequelize, Sequelize);
    
    var Articulo = sequelize.define('articulo', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        external_id: {
            type: Sequelize.UUID
        },
        marca: {
            type: Sequelize.STRING(50)
        }, 
        nombre: {
            type: Sequelize.STRING(50)
        },      
        descripcion: {type: Sequelize.STRING
        }
    }, {freezeTableName: true,
        createdAt: 'fecha_registro',
        updatedAt: 'fecha_modificacion'
    });
    
    Articulo.associate = function (models) {
        models.articulo.hasMany(models.galeria, {
            foreignKey: 'id_articulo'
        });
        models.articulo.hasMany(models.detalle_articulo, {
            foreignKey: 'id_articulo'
        });
    };
    
    Articulo.belongsTo(Categoria, {
        foreignKey: 'id_categoria'
    });
 
 
    return Articulo;
};


