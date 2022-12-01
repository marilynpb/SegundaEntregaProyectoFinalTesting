const User = require("../models/User")
const {validationResult} = require('express-validator')
const randomId = require('random-id');
const bcrypt = require('bcryptjs')
const nodemailer = require("nodemailer")
require('dotenv').config()


const registerForm = (req, res)=>{
    res.render('register')
}

const loginForm = (req, res)=>{
    res.render('login')
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

        //Envía correo de confirmación
        const transport = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
            user: "300b9ef3b1b13e",
            pass: "a2f7ffdebdab15"
            }
        });
        
        await transport.sendMail({
            from: '"🔹 FreeCVMaker 🔹" <FreeCVMaker@example.com>',
            to: user.email,
            subject: "Verificá tu correo electrónico",
            html: `<h2>Gracias por registrarte en FreeCVMaker<h2/>
                    <h2>Ya casi podés comenzar a crear tu CV, primero activá tu cuenta.
                    <p>Para activar tu cuenta necesitamos que valides tu correo electrónico haciendo click aquí:</p>
                    <a href="http://localhost:3000/auth/confirmar/${user.tokenConfirm}">Verificar cuenta</a>
                    <br><br><p>Atentamente,</p><p>Equipo FreeCVMaker!💖</p>`,
        });


        req.flash("mensajes", 
        [{msg: "Necesitás activar tu cuenta, por favor revisá tu correo electrónico y accede al link de confirmación que te hemos enviado"}])

        res.redirect('/auth/login')
    }
    catch(error){
        req.flash("mensajes", [{msg: error.message}])
        return res.redirect('/auth/register')
    }
}


//Confirmarcion de cuenta a través de un Token
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


//Iniciar sesion Usuarios
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
        
        //if(!(await user.comparePassword(password))) 
        if( user.password !=(password)) 
            throw new Error ("Contraseña incorrecta")

        req.login(user, function(err){
            if(err) throw new Error('Error al crear la sesión')
            res.redirect('/')
        })
    }
    catch(error){
        req.flash("mensajes", [{msg: error.message}])
        return res.redirect('/auth/login')
    }
}


//Cerrar sesión
const cerrarSesion = (req, res)=>{
    req.logout(function(err){
        if(err){
            return next(err)
        }
        res.redirect('/auth/login')
        req.flash("mensajes", [{msg: "Sesión cerrada"}])
    })
}

//Elimina cuenta segun el ID
const eliminarCuenta = async(req, res)=>{

    try{
        const user = await User.find({user: req.user.id})
        console.log(user)

        if(!user.user.equals(req.user.id)){
            throw new Error("No posee permiso para eliminar los datos")
        }
        await user.remove()
        req.flash("mensajes", [{msg: "Datos eliminados correctamente"}])

        res.redirect('/')
    }
    catch(error){
        req.flash("mensajes", [{msg: error.message}])
        return res.redirect('verMisDatos/verMisDatos')
    }
    
}
/*
const mostrarDatosUser = async(req, res)=>{
    try{
        const user = await User.find({user: req.user.id}).lean()
        res.render('verMisDatos', {user:user})
    }
    catch(error){
        req.flash("mensajes", [{msg: error.message}])
        res.redirect('/verMisDatos/verMisDatos')
    }
}*/



module.exports = {
    registerForm,
    registerUser,
    confirmarCuenta,
    loginForm,
    loginUser,
    cerrarSesion,
    eliminarCuenta
}