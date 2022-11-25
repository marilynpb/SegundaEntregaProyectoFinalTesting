const express = require('express');
const { 
    agregarDatosPersonales, 
    leerDatosPersonales, 
    eliminarDatosPersonales, 
    editarDatosPersonales, 
    guardarDatosEditados 
} = require('../controllers/datosPersonalesControllers');
const verificarUser = require('../middlewares/verificarUser')

const router = express.Router();

router.get('/datosPersonales', verificarUser, (req, res)=>{
    res.render('datosPersonales')
})

router.post('/datosPersonales',verificarUser, agregarDatosPersonales)
router.get('/verMisDatos', verificarUser, leerDatosPersonales)
router.get('/eliminar/:id', verificarUser, eliminarDatosPersonales)
router.get('/editar/:id', verificarUser, editarDatosPersonales)
router.post('/editar/:id', verificarUser, guardarDatosEditados)




module.exports = router