



const express = require('express');
const router = express.Router();


const registroController = require('../controllers/registroController');


router.post('/crear', registroController.crearRegistroIngreso);

router.get('/listar',registroController.listarRegistroIngresos);

router.put('/editar/:id', registroController.actualizarRegistroIngreso);

router.delete('/delete/:id',registroController.eliminarRegistroIngreso)












module.exports = router;