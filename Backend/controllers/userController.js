const bcrypt = require('bcryptjs');

const { User, Persona, Role } = require('../models');

exports.crearUser = async (req, res) => {
    const { documento, nombres, apellidos, sexo, telefono, email, roleName, username, password } = req.body;

    try {
        // Verificar si la persona ya existe
        const personaExistente = await Persona.findOne({ where: { documento } });
        if (personaExistente) {
            // Verificar si ya existe un usuario asociado a esa persona
            const usuarioExistente = await User.findOne({ where: { idPersona: personaExistente.id } });
            if (usuarioExistente) {
                return res.status(400).json({ message: "El usuario ya está registrado para esta persona" });
            }

            // Si la persona existe pero no el usuario, crear el usuario
            const role = await Role.findOne({ where: { roleName } });
            if (!role) {
                return res.status(400).json({ message: "Rol no válido" });
            }

            // Hashear la contraseña
            const hashedPassword = await bcrypt.hash(password, 10);

            // Crear el nuevo usuario
            const newUser = await User.create({
                idPersona: personaExistente.id,
                idRole: role.id,
                username,
                password: hashedPassword
            })
            return res.status(201).json({ message: "Usuario creado exitosamente para la persona existente", user: newUser, persona: personaExistente });
        }


        // Si la persona no existe, crear persona y usuario
        const newPersona = await Persona.create({
            documento,
            nombres,
            apellidos,
            sexo,
            telefono,
            email
        });
        // Buscar el rol por nombre
        const role = await Role.findOne({ where: { roleName } });
        if (!role) {
            return res.status(400).json({ message: "Rol no válido" });
        }
        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear el nuevo usuario
        const newUser = await Users.create({
            idPersona: newPersona.id,
            idRole: role.id,
            username,
            password: hashedPassword
        });
        res.status(201).json({ message: "Persona y usuario creados exitosamente", user: newUser, persona: newPersona });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error en el servidor", error });

    }
};


exports.editarUsuario = async (req, res) => {
    const { id } = req.params; // ID del usuario a editar
    const { documento, nombres, apellidos, sexo, telefono, email, roleName, username, password } = req.body;
  
    try {
        // Buscar el usuario por ID
        const usuario = await User.findByPk(id, { include: Persona , as: 'persona'});
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
  
        // Actualizar la información de la persona
        await usuario.persona.update({
            documento,
            nombres,
            apellidos,
            sexo,
            telefono,
            email
        });
  
        // Actualizar el rol
        const role = await Roles.findOne({ where: { roleName } });
        if (!role) {
            return res.status(400).json({ message: "Rol no válido" });
        }
  
        // Hashear la contraseña si se envía una nueva
        let newPassword = usuario.password;
        if (password) {
            newPassword = await bcrypt.hash(password, 10);
        }
  
        // Actualizar el usuario
        await usuario.update({
            id_rol: role.id,
            username,
            password: newPassword
        });
  
        res.status(200).json({ message: "Usuario actualizado exitosamente", usuario });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error en el servidor", error });
    }
  };

  exports.eliminarUsuario = async (req, res) => {
    const { id } = req.params; // ID del usuario a eliminar
  
    try {
        // Buscar el usuario por ID
        const usuario = await User.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
  
        // Eliminar el usuario
        await usuario.destroy();
  
        res.status(200).json({ message: "Usuario eliminado exitosamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error en el servidor", error });
    }
  };
  
exports.listarUsuarios = async (req, res) => {
    try {
        // Buscar todos los usuarios e incluir la información de persona y rol
        const usuarios = await User.findAll({
            include: [
                { model: Persona, as: 'persona' , as: 'usuario' },
                { model: Role, as: 'role', as:'role' }
            ]
        });
             // Verifica que los usuarios tengan la propiedad persona
             usuarios.forEach(usuario => {
                console.log('Usuario:', usuario.username, 'Persona:', usuario.persona);
            });
        res.status(200).json({ usuarios });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error en el servidor", error });
    }
  };
  
  