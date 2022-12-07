const User = require("../models/User")
const {validationResult} = require('express-validator')
const randomId = require('random-id');
const bcrypt = require('bcryptjs')
const nodemailer = require("nodemailer")
require('dotenv').config()

//Render Form Registro
const registerForm = (req, res)=>{
    res.render('register')
}

//Render Form Login
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


//Formulario de Reestablecer Password y envio de email de reestablecer
const enviarResetPass = async(req, res)=>{
    const {email} = req.body
    try{
        
        const user = await User.findOne({email})
        if(!user) throw new Error("No existe un usuario registrado con ese Email")

        //Envía correo de reset
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
            subject: "Reestablecer contraseña",
            html: `<h2>FreeCVMaker<h2>
                    <h2>Reestablecé tu contraseña<h2>
                    <p>Para hacerlo hacé click aquí:</p>
                    <a href="http://localhost:3000/auth/reestablecerPassword/${user._id}">Reestablecer mi contraseña</a>
                    <br><br><p>Atentamente,</p><p>Equipo FreeCVMaker!💖</p>`,
        });

        req.flash("mensajes", 
        [{msg: "Por favor, revise su correo electrónico para reestablecer su contraseña"}])

        res.redirect('/auth/login')
    }
    catch(error){
        req.flash("mensajes", [{msg: error.message}])
        return res.redirect('/auth/rememberPass')
    }
}


//Guarda la nueva Password
const guardarNuevaPass = async(req, res)=>{
    const {id} = req.params
    const {password} = req.body

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        req.flash("mensajes", errors.array())
        return res.redirect(`/auth/reestablecerPassword/${id}`)
    }
    try{
        const user = await User.findById(id)
        if(!password){
            throw new Error("Debe escribir una nueva contraseña")
        }

        await user.updateOne({password})
        req.flash("mensajes", [{msg: "Su contraseña ha sido reestablecida"}])
        res.redirect('/auth/login')
    }
    catch(error){
        req.flash("mensajes", [{msg: error.message}])
        return res.redirect(`/auth/reestablecerPassword/${id}`)
    }
}


//Formulario de eliminar cuenta
const eliminarCuenta = async(req, res)=>{
    const {id} = req.params
    try{
        const user = await User.findOne(id)
        res.render(`eliminarCuenta`)
    }
    catch(error){
        req.flash("mensajes", [{msg: error.message}])
        return res.redirect('/datosPersonales/verMisDatos')
    }
}


//Elimina cuenta segun el ID
const confirmEliminar = async(req, res)=>{
    const {id} = req.params
    try{
        await User.deleteOne(id)
        req.logout(function(err){
            if(err){
                return next(err)
            }
        req.flash("mensajes", [{msg: "Datos eliminados correctamente"}])
        res.redirect('/')
        })
    }
    catch(error){
    req.flash("mensajes", [{msg: error.message}])
    return res.redirect('/datosPersonales/verMisDatos')
    }
}


module.exports = {
    registerForm,
    registerUser,
    confirmarCuenta,
    loginForm,
    loginUser,
    cerrarSesion,
    eliminarCuenta,
    enviarResetPass,
    guardarNuevaPass,
    confirmEliminar
}