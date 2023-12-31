const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Paciente', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      cel:{
        type: DataTypes.STRING,
        allowNull: true
      },
      insurance:{
        type: DataTypes.STRING,
        allowNull: false
      }
  },{
    createdAt: false,
    updatedAt: false,
  });
};
