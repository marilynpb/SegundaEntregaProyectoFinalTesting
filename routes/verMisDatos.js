const express = require('express');
/*const { 
    leerDatos
} = require('../controllers/verMisDatos');*/
const verificarUser = require('../middlewares/verificarUser')

const router = express.Router();

router.get('/verMisDatos', verificarUser, (req, res)=>{
    res.render('verMisDatos')
})


//router.get('/verMisDatos/:id', verificarUser, leerDatos)


module.exports = router