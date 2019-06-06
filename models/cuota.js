module.exports = function (sequelize, Sequelize) {
    var Cuota = sequelize.define('cuota', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        abono: {
            type: Sequelize.DOUBLE
        },
        fecha: {
            type: Sequelize.DATEONLY
        }
    },{freezeTableName: true,
        timestamps: false
    });
    
    Cuota.associate = function (models) {
        models.cuota.hasMany(models.plazo, {
            foreignKey: 'id_cuota'
        });
    };

    return Cuota;
};
