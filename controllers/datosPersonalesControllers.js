const PersonalData = require('../models/PersonalData')

//Trae todos los Datos Personales
const leerDatosPersonales = async(req, res) =>{
    try{
        const personaldatas = await PersonalData.find().lean() 
        res.render('datosPersonales', {personaldatas : personaldatas})
    }
    catch(error){
        console.log(error)
        res.send('Hubo un error')
    }
}


//Agregar nuevos Datos Personales
const agregarDatosPersonales = async(req, res)=>{
    const {nombre, apellido, email, /*fechaNac,*/ sexo, estadoCivil, calle, altura, cp, pais, telefono} = req.body

    try{
        const personaldata = new PersonalData({
            nombre: nombre,
            apellido: apellido,
            email: email,
            /*fechaNac: fechaNac,*/
            sexo: sexo,
            estadoCivil: estadoCivil,
            calle: calle,
            altura: altura,
            cp: cp,
            pais: pais,
            telefono: telefono
        })
        await personaldata.save()
        res.redirect('/verMisDatos/verMisDatos')
    }
    catch(error){
        console.log(error)
        res.send('Hubo un error')
    }
}

//Elimina todos los Datos Personales segun el ID
const eliminarDatosPersonales = async(req, res)=>{
    const {id} = req.params
    try{
        await PersonalData.findByIdAndDelete(id)
        res.redirect('/datosPersonales/datosPersonales')
    }
    catch(error){
        console.log(error)
        res.send('Hubo un error')
    }
}

//Editar Datos Personales segun el ID
const editarDatosPersonales = async(req, res)=>{
    const {id} = req.params
    try{
        const personaldata = await PersonalData.findById(id).lean()
        res.render('datosPersonales', {personaldata : personaldata})
    }
    catch(error){
        console.log(error)
        res.send('Hubo un error')
    }
}


//Guarda los datos editados 
const guardarDatosEditados = async(req, res)=>{
    const {id} = req.params
    const {nombre, apellido, email} = req.body
    try{
        await PersonalData.findByIdAndUpdate(id, {nombre: nombre, apellido:apellido, email:email} ).lean()
        res.redirect('/datosPersonales/datosPersonales')
    }
    catch(error){
        console.log(error)
        res.send('Hubo un error')
    }
}




module.exports = {
    leerDatosPersonales,
    agregarDatosPersonales,
    eliminarDatosPersonales,
    editarDatosPersonales,
    guardarDatosEditados
}

