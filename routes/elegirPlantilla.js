const express = require('express')
const { agregarPlantilla, leerPlantilla } = require('../controllers/elegirPlantillaController')
const verificarUser = require('../middlewares/verificarUser')
const { route } = require('./datosLaborales')

const router = express.Router()

router.get('/elegirPlantilla', verificarUser, (req, res)=>{
    res.render('elegirPlantilla')
})

router.post('/elegirPlantilla/soloElegirPlantilla', verificarUser, agregarPlantilla)

router.get('/basico', verificarUser, (req, res)=>{
    res.render('basico')
})

router.get('/moderno2', verificarUser, (req, res)=>{
    res.render('moderno2')
})

//router.get('/miCV',verificarUser, leerPlantilla)
router.get('/basico',verificarUser, leerPlantilla)
router.get('/moderno3',verificarUser, leerPlantilla)
router.get('/creativo1',verificarUser, leerPlantilla)
router.get('/creativo2',verificarUser, leerPlantilla)
router.get('/moderno1',verificarUser, leerPlantilla)
router.get('/moderno2',verificarUser, leerPlantilla)
router.get('/moderno3',verificarUser, leerPlantilla)
router.get('/cronologico',verificarUser, leerPlantilla)
router.get('/funcional',verificarUser, leerPlantilla)
router.get('/mixto',verificarUser, leerPlantilla)

router.get('/soloElegirPlantilla', verificarUser, (req, res)=>{
    res.render('soloElegirPlantilla')
})

router.post('/soloElegirPlantilla', verificarUser, agregarPlantilla)


module.exports = router