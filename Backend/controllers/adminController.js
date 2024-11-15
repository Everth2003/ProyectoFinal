const { Persona, Admin, Role, User } = require('../models');
const bcrypt = require('bcryptjs');

exports.crearAdmin = async (req, res) => {
    const { documento, nombres, apellidos, sexo, telefono, email, nombreAutorizacion } = req.body;

    try {
        const personaExistente = await Persona.findOne({ where: { documento } });
        if (personaExistente) {
            return res.status(400).json({ message: "La persona ya está registrada" });
        }

        const nuevaPersona = await Persona.create({
            documento,
            nombres,
            apellidos,
            sexo,
            telefono,
            email
        });

        const nuevoAdmin = await Admin.create({
            idPersona: nuevaPersona.id,
            nombreAutorizacion
        });

        const username = email.split('@')[0];
        const role = await Role.findOne({ where: { roleName: 'Admin' } });
        if (!role) {
            return res.status(400).json({ message: "Rol 'admin' no encontrado" });
        }

        const hashedPassword = await bcrypt.hash(documento, 10);

        const nuevoUsuario = await User.create({
            idPersona: nuevaPersona.id,
            idRole: role.id,
            username,
            password: hashedPassword
        });

        res.status(201).json({
            message: 'Admin y usuario creados exitosamente',
            data: { nuevaPersona, nuevoAdmin, nuevoUsuario }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al crear el vigilante',
            error: error.message
        });
    }
};

exports.listarAdmin = async (req, res) => {
    try {
        const admin = await Admin.findAll({
            include: [
                {
                    model: Persona,
                    as: 'persona',
                    include: [
                        { model: User, as: 'usuario' }
                    ]
                }
            ]
        });

        res.status(200).json({ admin });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al listar los administradores', error: error.message });
    }
};

exports.eliminarAdmin = async (req, res) => {
    const { id } = req.params;

    try {
        const admin = await Admin.findByPk(id);
        if (!admin) {
            return res.status(404).json({ message: "Admin no encontrado" });
        }

        await admin.destroy();

        res.status(200).json({ message: 'Admin eliminado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el Administrador', error: error.message });
    }
};

exports.editarAdmin = async (req, res) => {
    const { id } = req.params;
    const { documento, nombres, apellidos, sexo, telefono, email, nAutorizacion, username, password } = req.body;

    try {
        const admin = await Admin.findByPk(id, {
            include: [{ model: Persona, as: 'persona' }]
        });
        if (!admin) {
            return res.status(404).json({ message: "Admin no encontrado" });
        }

        await admin.persona.update({
            documento,
            nombres,
            apellidos,
            sexo,
            telefono,
            email
        });

        const usuario = await User.findOne({ where: { idPersona: admin.idPersona } });
        if (usuario) {
            let newPassword = usuario.password;
            if (password) {
                newPassword = await bcrypt.hash(password, 10);
            }

            await usuario.update({
                username: username || usuario.username,
                password: newPassword
            });
        }

        res.status(200).json({ message: "Admin actualizado exitosamente", admin });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al editar el admin", error: error.message });
    }
};
