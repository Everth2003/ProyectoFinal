const express = require('express');
const router = express.Router();



const  adminController = require('../controllers/adminController')



router.post('/crear', adminController.crearAdmin);

router.get('/listar', adminController.listarAdmin);

router.put('/editar/:id/', adminController.editarAdmin)

router.delete('eliminar/:id', adminController.eliminarAdmin)
module.exports= router;