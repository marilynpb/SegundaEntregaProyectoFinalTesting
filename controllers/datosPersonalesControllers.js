const PersonalData = require('../models/PersonalData')

//Trae los Datos Personales
const leerDatosPersonales = async(req, res) =>{
    try{
        const personaldatas = await PersonalData.find({user: req.user.id}).lean() 
        res.render('verMisDatos', {personaldatas : personaldatas})
    }
    catch(error){
        req.flash("mensajes", [{msg: error.message}])
        return res.redirect('verMisDatos/verMisDatos')
    }
}


//Agregar nuevos Datos Personales
const agregarDatosPersonales = async(req, res)=>{
    const {
        nombre, apellido, fechaNac, sexo, estadoCivil, 
        calle, altura, cp, pais, telefono
    } = req.body

    try{
        const personaldata = new PersonalData({
            nombre: nombre,
            apellido: apellido,
            fechaNac: fechaNac,
            sexo: sexo,
            estadoCivil: estadoCivil,
            calle: calle,
            altura: altura,
            cp: cp,
            pais: pais,
            telefono: telefono,
            user: req.user.id
        })

        if(!nombre) 
            throw new Error("Debe completar los campos obligatorios: (*)")

        if(!apellido) 
            throw new Error("Debe completar los campos obligatorios: (*)")

        if(!pais) 
            throw new Error("Debe completar los campos obligatorios: (*)")

        await personaldata.save()
        req.flash("mensajes", [{msg: "Datos agregados correctamente"}])

        res.redirect('/datosLaborales/datosLaborales')
    }
    catch(error){
        req.flash("mensajes", [{msg: error.message}])
        return res.redirect('/datosPersonales/datosPersonales')
    }
}


//Editar Datos Personales segun el ID
const editarDatosPersonales = async(req, res)=>{
    const {id} = req.params
    try{
        const personaldata = await PersonalData.findById(id).lean()

        if(!personaldata.user.equals(req.user.id)){
            throw new Error("No posee permiso para editar los datos")
        }

        res.render('cardEditar', {personaldata : personaldata})
    }
    catch(error){
        req.flash("mensajes", [{msg: error.message}])
        return res.redirect('verMisDatos/verMisDatos')
    }
}


//Guarda los datos editados 
const guardarDatosEditados = async(req, res)=>{
    const {id} = req.params
    const {nombre, apellido, calle, altura, cp, pais, telefono} = req.body
    try{
        const personaldata = await PersonalData.findById(id)
        if(!personaldata.user.equals(req.user.id)){
            throw new Error("No posee permiso para editar los datos")
        }

        await personaldata.updateOne({nombre, apellido, calle, altura, cp, pais, telefono})
        //await PersonalData.findByIdAndUpdate(id, {nombre: nombre, apellido:apellido, email:email} ).lean()
        req.flash("mensajes", [{msg: "Datos actualizados"}])
        
        res.redirect('/datosPersonales/verMisDatos')
    }
    catch(error){
        req.flash("mensajes", [{msg: error.message}])
        return res.redirect('verMisDatos/verMisDatos')
    }
}


//Elimina todos los Datos Personales segun el ID
const eliminarDatosPersonales = async(req, res)=>{
    const {id} = req.params
    try{
        const personaldata = await PersonalData.findById(id)
        //await PersonalData.findByIdAndDelete(id)
        if(!personaldata.user.equals(req.user.id)){
            throw new Error("No posee permiso para eliminar los datos")
        }
        await personaldata.remove()
        req.flash("mensajes", [{msg: "Datos eliminados correctamente"}])

        res.redirect('/verMisDatos/verMisDatos')
    }
    catch(error){
        req.flash("mensajes", [{msg: error.message}])
        return res.redirect('verMisDatos/verMisDatos')
    }
}


module.exports = {
    leerDatosPersonales,
    agregarDatosPersonales,
    eliminarDatosPersonales,
    editarDatosPersonales,
    guardarDatosEditados
}

