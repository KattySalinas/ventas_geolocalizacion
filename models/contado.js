module.exports = function (sequelize, Sequelize) {
    var Contado = sequelize.define('contado', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        total: {
            type: Sequelize.DOUBLE
        }
    },{freezeTableName: true,
        timestamps: false
    });
    
    Contado.associate = function (models) {
        models.contado.hasOne(models.pago, {
            foreignKey: 'id_contado'
        });
    };

    return Contado;
};


