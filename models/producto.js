module.exports = function (sequelize, Sequelize) {
    var categoria = require('../models/categoria');
    var Categoria = new categoria(sequelize, Sequelize);
    
    var Producto = sequelize.define('producto', {
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
        subnombre: {type: Sequelize.STRING(100)
        },
        precio: {type: Sequelize.DOUBLE
        },
        cantidad: {type: Sequelize.INTEGER
        },
        
        foto: {type: Sequelize.STRING(50)
        }
    }, {
        freezeTableName: true
    });
    
    Producto.associate = function (models) {
        models.producto.hasMany(models.compra, {
            foreignKey: 'id_producto'
        });
    };
    
    Producto.belongsTo(Categoria, {
        foreignKey: 'id_categoria'
    });
 
 
    return Producto;
};


