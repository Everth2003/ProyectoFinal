'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class registroingreso extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      registroingreso.belongsTo(models.Estudiante,{foreignKey:'idEstudiante'})
      registroingreso.belongsTo(models.Vigilante,{foreignKey:'idVigilante'});
      registroingreso.belongsTo(models.Objeto,{foreignKey:'idObjeto'})
      registroingreso.belongsTo(models.puntoControl,{foreignKey:'idPunto'})
    }
  }
  registroingreso.init({
    fechaIngreso: DataTypes.DATE,
    fechaSalida: DataTypes.DATE,

    idEstudiante:{
      type: DataTypes.INTEGER,
      references:{
        model: 'Estudiante',
        key:'id'
      },
    },
    idVigilante:{
      type: DataTypes.INTEGER,
      references:{
        model: 'Vigilante',
        key:'id'
      },
    },
    idObjeto:{
      type: DataTypes.INTEGER,
      references:{
        model: 'Objeto',
        key:'id'
      },
    },
    idPunto:{
      type: DataTypes.INTEGER,
      references:{
        model: 'puntoControl',
        key:'id'
      },
    }

  }, {
    sequelize,
    modelName: 'registroingreso',
  });
  return registroingreso;
};