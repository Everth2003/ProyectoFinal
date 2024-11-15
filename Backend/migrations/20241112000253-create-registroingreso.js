'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('registroingresos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fechaIngreso: {
        type: Sequelize.DATE
      },
      fechaSalida: {
        type: Sequelize.DATE
      },
      idEstudiante:{
        type: Sequelize.INTEGER
      },
      idVigilante:{
        type: Sequelize.INTEGER
      },
      idObjeto:{
        type: Sequelize.INTEGER
      },
      idPunto:{
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('registroingresos');
  }
};