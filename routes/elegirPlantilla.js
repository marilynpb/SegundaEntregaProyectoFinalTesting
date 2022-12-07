const express = require('express')
const { agregarPlantilla, leerDatosBasico, leerDatosCreativo1, leerDatosModerno1, leerDatosCronologico, leerDatosFuncional, leerDatosMixto, leerDatosModerno2, leerDatosCreativo2, leerDatosModerno3} = require('../controllers/elegirPlantillaController')
const verificarUser = require('../middlewares/verificarUser')
const { route } = require('./datosLaborales')

const router = express.Router()

router.get('/elegirPlantilla', verificarUser, (req, res)=>{
    res.render('elegirPlantilla')
})

router.post('/elegirPlantilla/soloElegirPlantilla', verificarUser, agregarPlantilla)

router.get('/basico', verificarUser, leerDatosBasico)
router.get('/creativo1', verificarUser, leerDatosCreativo1)
router.get('/moderno1', verificarUser, leerDatosModerno1)
router.get('/cronologico', verificarUser, leerDatosCronologico)
router.get('/funcional', verificarUser, leerDatosFuncional)
router.get('/mixto', verificarUser, leerDatosMixto)
router.get('/moderno2', verificarUser, leerDatosModerno2)
router.get('/creativo2', verificarUser, leerDatosCreativo2)
router.get('/moderno3', verificarUser, leerDatosModerno3)

router.get('/soloElegirPlantilla', verificarUser, (req, res)=>{
    res.render('soloElegirPlantilla')
})

router.post('/soloElegirPlantilla', verificarUser, agregarPlantilla)


module.exports = router