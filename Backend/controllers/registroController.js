


const { registroingreso,Persona, Estudiante, Vigilante, Objeto, puntoControl } = require('../models');

// Crear un nuevo registro de ingreso
exports.crearRegistroIngreso = async (req, res) => {
    try {
        const { fechaIngreso, fechaSalida, idEstudiante, idVigilante, idObjeto, idPuntoControl } = req.body;
        const nuevoRegistro = await registroingreso.create({
            fechaIngreso,
            fechaSalida,
            idEstudiante,
            idVigilante,
            idObjeto,
            idPuntoControl
        });
        res.status(201).json({
            message: 'Registro de Equipo creado exitosamente',
            data: { nuevoRegistro }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el registro de ingreso', error });
    }
};

// Mostrar todos los registros de ingreso con nombres en lugar de IDs
exports.listarRegistroIngresos = async (req, res) => {
    try {
        const registros = await registroingreso.findAll({
            include: [
                {
                    model: Estudiante,
                    include: { model: Persona, as: 'persona' }
                },
                {
                    model: Vigilante,
                    include: { model: Persona , as: 'persona'}
                },
                { model: Objeto },
                { model: puntoControl }
            ]
        });


        res.json({ registros });
    } catch (error) {
        res.status(500).json({ message: 'Error al listar los registros de ingreso', error });
    }
};

// Actualizar un registro de ingreso
exports.actualizarRegistroIngreso = async (req, res) => {
    try {
        const { id } = req.params;
        const { fechaIngreso, fechaSalida, idEstudiante, idVigilante, idObjeto, idPuntoControl } = req.body;

        const registro = await registroingreso.findByPk(id);
        if (!registro) {
            return res.status(404).json({ message: 'Registro no encontrado' });
        }

        await registro.update({
            fechaIngreso,
            fechaSalida,
            idEstudiante,
            idVigilante,
            idObjeto,
            idPuntoControl
        });

        res.json({ message: 'Registro actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el registro de ingreso', error });
    }
};

// Eliminar un registro de ingreso
exports.eliminarRegistroIngreso = async (req, res) => {
    try {
        const { id } = req.params;

        const registro = await registroingreso.findByPk(id);
        if (!registro) {
            return res.status(404).json({ message: 'Registro no encontrado' });
        }

        await registro.destroy();
        res.json({ message: 'Registro eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el registro de ingreso', error });
    }
};