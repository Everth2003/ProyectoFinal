const { Model } = require('sequelize');
const { Objeto, Persona , Estudiante} = require('../models')

exports.crearObjeto = async (req, res) => {

    const { nombre, marca, serial, } = req.body;

    try {
        const nuevoObjeto = await Objeto.create({
            nombre,
            marca,
            serial
        })
        res.status(201).json({
            message: 'El objeto creado exitosamente',
            data: { nuevoObjeto }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al crear el objeto',
            error: error.message
        });
    }

}

exports.listarObjeto = async (req, res) => {

    try {
        const objetos = await Objeto.findAll();
        res.status(200).json({ objetos });
    } catch (error) {
        res.status(500).json({ message: 'Error al listar objetos', error });
    }

}

exports.actulizarObjeto = async (req, res) => {
    const { id } = req.params;
    const { nombre, marca, serial, } = req.body;

    try {
        const objeto = await Objeto.findByPk(id);
        if (!objeto) {
            return res.status(404).json({ message: "Objeto  no encontrado" });
        }

        await objeto.update({
            nombre,
            marca,
            serial
        })
        res.status(200).json({ message: "Objeto actualizado exitosamente", objeto });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al editar el objeto", error: error.message });
    }
}

exports.eliminarObjeto = async (req, res) => {


    const { id } = req.params;
    try {
        const objeto = await Objeto.findByPk(id);

        if (!objeto) {
            return res.status(404).json({ message: 'Objeto no encontrado' });
        }
        await objeto.destroy();
        res.status(200).json({ message: 'Objeto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el objeto', error });
    }
}