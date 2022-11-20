const User = require("../models/User")
const {validationResult} = require('express-validator')
const randomId = require('random-id');
const bcrypt = require('bcryptjs')


const registerForm = (req, res)=>{
    res.render('register', {mensajes: req.flash("mensajes")})
}

//Registro de usuarios
const registerUser = async(req, res)=>{

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        req.flash("mensajes", errors.array())
        return res.redirect('/auth/register')
    }

    const {email, password} = req.body
    var patrón = 'aA0'
    var largo = 30;
    try{
        let user = await User.findOne({email:email})

        if(user) throw new Error("Ya existe un usuario registrado con ese Email")
        
        user = new User({email, password, tokenConfirm: randomId(largo, patrón)})
        await user.save()

        req.flash("mensajes", 
        [{msg: "Necesitás activar tu cuenta, por favor revisá tu correo electrónico y accede al link de confirmación que te hemos enviado"}])
        //Enviar correo de confirmacion
        res.redirect('/auth/login')
    }
    catch(error){
        req.flash("mensajes", [{msg: error.message}])
        return res.redirect('/auth/register')
    }
}

const confirmarCuenta = async (req, res)=>{
    const {token} = req.params
    try{
        const user = await User.findOne({tokenConfirm: token})

        if(!user) throw new Error("Usuario inválido")

        user.cuentaConfirmada = true
        user.tokenConfirm = null

        await user.save()

        req.flash("mensajes", 
        [{msg: "Cuenta activada, ya podés iniciar sesión"}])

        res.redirect('/auth/login')
    }
    catch(error){
        req.flash("mensajes", [{msg: error.message}])
        return res.redirect('/auth/login')
    }
}

const loginForm = (req, res)=>{
    res.render('login', {mensajes: req.flash("mensajes")})
}


const loginUser = async(req, res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        req.flash("mensajes", errors.array())
        return res.redirect('/auth/login')
    }

    const {email, password} = req.body
    try{
        const user = await User.findOne({email})
        if(!user) throw new Error("No existe un usuario registrado con ese Email")
    
        if(!user.cuentaConfirmada) throw new Error ("Por favor, verifique su cuenta")
        
        if(!(await user.comparePassword(password))) 
            throw new Error ("Contraseña incorrecta")
    
        res.redirect('/auth/login')
    }
    catch(error){
        req.flash("mensajes", [{msg: error.message}])
        return res.redirect('/auth/login')
    }
}



module.exports = {
    registerForm,
    registerUser,
    confirmarCuenta,
    loginForm,
    loginUser
}