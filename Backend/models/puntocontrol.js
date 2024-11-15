'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class puntoControl extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      puntoControl.hasMany(models.registroingreso, {foreignKey: 'idPunto'})
    }
  }
  puntoControl.init({
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'puntoControl',
  });
  return puntoControl;
};