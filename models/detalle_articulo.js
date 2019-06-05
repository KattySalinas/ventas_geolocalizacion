module.exports = function (sequelize, Sequelize) {
    var venta = require('../models/venta');
    var Venta = new venta(sequelize, Sequelize);
    var articulo = require('../models/articulo');
    var Articulo = new articulo(sequelize, Sequelize);
    
    var Detalle_articulo = sequelize.define('detalle_articulo', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        cantidad: {
            type: Sequelize.INTEGER
        },
        precio_unitario: {
            type: Sequelize.DOUBLE(7, 2)
        },
        precio_total: {
            type: Sequelize.DOUBLE(7, 2)
        }
    }, {timestamps: false,
        freezeTableName: true
    });
    
    Detalle_articulo.belongsTo(Venta, {
        foreignKey: 'id_venta',
        constraints: false
    });
    
    Detalle_articulo.belongsTo(Articulo, {
        foreignKey: 'id_articulo',
        constraints: false
    });
    
    return Detalle_articulo;
};

