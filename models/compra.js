module.exports = function (sequelize, Sequelize) {
    var cliente = require('../models/cliente');
    var Cliente = new cliente(sequelize, Sequelize);
    var producto = require('../models/producto');
    var Producto = new producto(sequelize, Sequelize);
    var Compra = sequelize.define('compra', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        fecha: {
            type: Sequelize.DATEONLY
        },
        entrada: {
            type: Sequelize.DOUBLE
        },
        saldo: {
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
    Compra.belongsTo(Producto, {
        foreignKey: 'id_producto'
    });
    Compra.belongsTo(Cliente, {
        foreignKey: 'id_cliente'
    });
    

    return Compra;
};




