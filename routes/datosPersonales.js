const express = require('express');
const { 
    agregarDatosPersonales, 
    leerDatosPersonales, 
    eliminarDatosPersonales, 
    editarDatosPersonales, 
    guardarDatosEditados 
} = require('../controllers/datosPersonalesControllers');

const router = express.Router();


router.post('/datosPersonales', agregarDatosPersonales)
router.get('/datosPersonales', leerDatosPersonales)
router.get('/eliminar/:id', eliminarDatosPersonales)
router.get('/editar/:id', editarDatosPersonales)
router.post('/editar/:id', guardarDatosEditados)



module.exports = router