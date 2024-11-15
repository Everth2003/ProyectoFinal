const express = require('express');
const router = express.Router();

const userController= require('../controllers/userController')


router.post('/crear', userController.crearUser);

router.get('/listar', userController.listarUsuarios);

router.put('/editar/:id', userController.editarUsuario);

router.delete('/eliminar/:id' ,userController.eliminarUsuario)


module.exports = router;