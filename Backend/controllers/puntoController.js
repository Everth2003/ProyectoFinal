

const { puntoControl } = require('../models')

exports.crearPuntoControl = async (req, res) => {
    const { nombre } = req.body;


    try {
        const nuevoPunto = await puntoControl.create({
            nombre
        })
        res.status(201).json({
            message: 'El punto de control creado exitosamente',
            data: { nuevoPunto }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al crear el punto de control',
            error: error.message
        });
    }
}



exports.listarPuntoControl= async (req, res )=>{


    try {
        const punto= await puntoControl.findAll();
        res.status(200).json({ punto });
    } catch (error) {
        res.status(500).json({ message: 'Error al listar los punto de control', error });
    }
}

exports.actualizarPuntoControl= async(req,res)=>{
    const { id } = req.params;
    const { nombre} = req.body;

    try {
        const punto = await puntoControl.findByPk(id);
        if (!punto) {
            return res.status(404).json({ message: "Punto de control  no encontrado" });
        }

        await punto.update({
            nombre
            
        })
        res.status(200).json({ message: "Punto de control actualizado exitosamente", punto });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al editar el punto de control", error: error.message });
    }
}



exports.eliminarPuntoControl = async (req, res) => {


    const { id } = req.params;
    try {
        const punto = await puntoControl.findByPk(id);

        if (!punto) {
            return res.status(404).json({ message: 'Punto de control no encontrado' });
        }
        await objeto.destroy();
        res.status(200).json({ message: 'Punto de control eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el punto de control', error });
    }
}