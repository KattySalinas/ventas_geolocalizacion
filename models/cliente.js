module.exports = function (sequelize, Sequelize) {
    var Cliente = sequelize.define('cliente', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        nombre: {
            type: Sequelize.STRING(100)
        },
        direccion: {
            type: Sequelize.STRING(50)
        },
        referencias: {
            type: Sequelize.STRING(50)
        },
        telefono: {
            type: Sequelize.STRING(11)
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

    Cliente.associate = function (models) {
        models.cliente.hasMany(models.compra, {
            foreignKey: 'id_cliente'
        });
    };

    return Cliente;
};


