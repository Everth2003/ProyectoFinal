const express = require('express');
const router = express.Router();


const objetoController= require('../controllers/objetoController');


router.post('/crear', objetoController.crearObjeto);

router.get('/listar', objetoController.listarObjeto);

router.put('/editar/:id', objetoController.actulizarObjeto);

router.delete('/eliminar/:id', objetoController.eliminarObjeto)




module.exports=router;