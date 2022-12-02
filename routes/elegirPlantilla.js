const express = require('express')
const { agregarPlantilla} = require('../controllers/elegirPlantillaController')
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

router.get('/soloElegirPlantilla', verificarUser, (req, res)=>{
    res.render('soloElegirPlantilla')
})

router.post('/soloElegirPlantilla', verificarUser, agregarPlantilla)


module.exports = router