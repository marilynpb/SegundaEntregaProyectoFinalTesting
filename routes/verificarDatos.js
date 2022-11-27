const express = require('express');
const { verificarDatos } = require('../controllers/verificarDatosController');

const verificarUser = require('../middlewares/verificarUser')

const router = express.Router();



router.get('/verificarDatos', verificarUser, verificarDatos)

module.exports = router