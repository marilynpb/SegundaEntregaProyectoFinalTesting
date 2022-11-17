const express = require('express');
const { 
    leerDatosPersonales 
} = require('../controllers/datosPersonalesControllers');

const router = express.Router();

router.get('/verMisDatos', (req, res)=>{
    res.render('verMisDatos')
})

//router.get('/', leerDatosPersonales)

module.exports = router