const express = require('express');
const router = express.Router();




const puntoControl= require('../controllers/puntoController');

router.post('/crear', puntoControl.crearPuntoControl);

router.get('/listar', puntoControl.listarPuntoControl);

router.put('/editar/:id',puntoControl.actualizarPuntoControl);

router.delete('/eliminar/:id', puntoControl.eliminarPuntoControl)



module.exports=router;