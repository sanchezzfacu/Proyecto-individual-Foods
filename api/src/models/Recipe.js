const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    resumen: {
      type: DataTypes.STRING,
      allowNull: false
    },
    img: {
      type: DataTypes.STRING,
      allowNull: true
    },
    puntuacion: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    healthy_level: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    step_by_step: {
      type: DataTypes.STRING,
      allowNull: true
    },
  });
};
