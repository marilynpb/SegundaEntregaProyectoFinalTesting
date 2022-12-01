const express = require('express');
const {body} = require('express-validator')

const { 
    loginForm, 
    registerForm, 
    registerUser, 
    confirmarCuenta, 
    loginUser, 
    cerrarSesion,
    eliminarCuenta
} = require('../controllers/authController');
const verificarUser = require('../middlewares/verificarUser');

const router = express.Router();

router.get('/register', registerForm)

router.post('/register', [
    body('email', "Ingrese un correo electrónico válido")
        .trim()
        .isEmail()
        .normalizeEmail(),

    body('password', "La contaseña debe tener al menos 6 carácteres")
        .trim()
        .isLength({min:6})
        .escape()
        .custom((value, {req})=>{
            if(value !== req.body.rePassword){
                throw new Error('Las contraseñas no coinciden')
            }
            else{
                return value;
            }
    })
], registerUser)

router.get('/confirmar/:token', confirmarCuenta)
router.get('/login', loginForm)

router.post('/login',[
    body('email', "Ingrese un correo electrónico válido")
        .trim()
        .isEmail()
        .normalizeEmail(),

    body('password', "La contaseña debe tener al menos 6 carácteres")
        .trim()
        .isLength({min:6})
        .escape()
] ,loginUser)


router.get('/loguot', cerrarSesion)

//router.get('/eliminarCuenta/:id', verificarUser, eliminarCuenta)


module.exports = router