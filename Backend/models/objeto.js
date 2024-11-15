'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Objeto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Objeto.hasMany(models.registroingreso, {foreignKey:'idObjeto'})

    }
  }
  Objeto.init({
    nombre: DataTypes.STRING,
    marca: DataTypes.STRING,
    serial: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Objeto',
  });
  return Objeto;
};