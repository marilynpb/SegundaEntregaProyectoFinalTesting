const express = require('express');
const { 
    leerDatosPersonales 
} = require('../controllers/datosPersonalesControllers');
const verificarUser = require('../middlewares/verificarUser')

const router = express.Router();

router.get('/verMisDatos', verificarUser, (req, res)=>{
    res.render('verMisDatos')
})

//router.get('/', leerDatosPersonales)

module.exports = router