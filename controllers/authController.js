const User = require("../models/User")
const randomId = require('random-id');
const bcrypt = require('bcryptjs')


const registerForm = (req, res)=>{
    res.render("register")
}

const registerUser = async(req, res)=>{
    console.log(req.body)
    const {email, password} = req.body
    var patrón = 'aA0'
    var largo = 30;
    try{
        let user = await User.findOne({email:email})

        if(user) throw new Error("Ya existe un usuario registrado con ese Email")
        
        user = new User({email, password, tokenConfirm: randomId(largo, patrón)})
        await user.save()

        //Enviar correo de confirmacion
        res.redirect('login')
    }
    catch(error){
        console.log(error)
        res.send(error.message)
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

        res.redirect('/auth/login')
    }
    catch(error){
        console.log(error)
        res.send(error.message)
    }
}

const loginForm = (req, res)=>{
    res.render('login')
}

const loginUser = async(req, res)=>{
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
        console.log(error)
        res.send(error.message)
    }
}



module.exports = {
    registerForm,
    registerUser,
    confirmarCuenta,
    loginForm,
    loginUser
}