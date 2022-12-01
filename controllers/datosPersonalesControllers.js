const LaboralData = require('../models/LaboralData')
const PersonalData = require('../models/PersonalData')
const User = require('../models/User')
const DescripcionData = require('../models/DescripcionData')
const formidable = require('formidable')
const fs = require('fs')
const path = require('path')
const Jimp = require('jimp')

//Trae los Datos Personales
const leerDatosPersonales = async(req, res) =>{
    try{
        const datosDescripcion = await DescripcionData.find({user: req.user.id}).lean() 
        const personaldatas = await PersonalData.find({user: req.user.id}).lean() 
        const laboralData = await LaboralData.find({user: req.user.id}).lean()
        const user = await User.find(req.user.id)
        
        res.render('verMisDatos', {personaldatas : personaldatas, laboralData: laboralData, user: user, datosDescripcion: datosDescripcion})
    }
    catch(error){
        req.flash("mensajes", [{msg: error.message}])
        return res.redirect('/datosPersonales/verMisDatos')
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
        return res.redirect('/datosPersonales/verMisDatos')
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
        if(!nombre && !apellido && !calle && !altura && !cp && !pais && !telefono)
            throw new Error("No hay datos para actualizar")

        await personaldata.updateOne({nombre, apellido, calle, altura, cp, pais, telefono})
        req.flash("mensajes", [{msg: "Datos actualizados"}])
        0
        res.redirect('/datosPersonales/verMisDatos')
    }
    catch(error){
        req.flash("mensajes", [{msg: error.message}])
        return res.redirect('/datosPersonales/verMisDatos')
    }
}


//Elimina todos los Datos Personales segun el ID
const eliminarDatosPersonales = async(req, res)=>{
    const {id} = req.params
    console.log(id)
    try{
        await User.findById(id)

        await User.remove()
        req.flash("mensajes", [{msg: "Datos eliminados correctamente"}])

        res.redirect('/')
    }
    catch(error){
        req.flash("mensajes", [{msg: error.message}])
        return res.redirect('/datosPersonales/verMisDatos')
    }
}

//Muestra el Form de Editar Foto
const formEditarFoto = async(req, res)=>{
    try{
        const user = await User.findById(req.user.id)
        console.log(user)
        res.render('editarFoto', {user: req.user, imagen: user.imagen})  
    }
    catch(error){
        req.flash("mensajes", [{msg: "Error al mostrar la imagen"}])
        res.redirect('datosPerfil')
    }
    res.render('editarFoto')
}


//Guarda la foto de perfil nueva
const editarFoto = async(req, res)=>{
    const form = new formidable.IncomingForm()
    form.maxFileSize = 50 * 1024 * 1024//50mb
    form.parse(req, async(err, fields, files)=>{
        try{
            if(err){
                throw new Error('Hubo un error al subir el archivo')
            }

            const file= files.myFile
            if(file.originalFilename === ""){
                throw new Error("Por favor agrega una imagen")
            }
    
            const imageTypes = ["image/jpeg", "image/png"]
            if(!imageTypes.includes(file.mimetype)){
                throw new Error('El archivo debe ser .jpg o .png')
            }
    
            if(file.size > 50 * 1024 * 1024){
                throw new Error('El archivo no debe pesar mas de 50MB')
            }
    
            const extension = file.mimetype.split("/")[1]
            const dirFile = path.join(__dirname, `../public/img/perfiles/${req.user.id}.${extension}`)
            fs.renameSync(file.filepath, dirFile)
            const image = await Jimp.read(dirFile)
            image.resize(200, 200).quality(90).writeAsync(dirFile)
            const user = await User.findById(req.user.id)
            user.imagen = `${req.user.id}.${extension}`
    
            await user.updateOne({imagen: user.imagen})
    
            req.flash("mensajes", [{msg: "Datos actualizados"}])
            return res.redirect('/datosPersonales/verMisDatos')
        }
        catch(error){
            req.flash("mensajes", [{msg: error.message}])
            res.redirect('/datosPersonales/verMisDatos')
        }
    })
}

//Muestra el Form de Editar Experiencia
const formEditarExperiencia = async(req, res)=>{
    try{
        const laboralData =  await LaboralData.findById(req.user.id)
        res.render('editarExperiencia', {laboralData: laboralData})
    }
    catch(error){
        req.flash("mensajes", [{msg: "Error al cargar el formulario"}])
        res.redirect('/datosPersonales/verMisDatos')
    }
}

//Guarda los datos nuevos de Experiencia
const editarExperiencia = async(req, res)=>{
    const {id} = req.params
    const {puesto, empresa, desde, hasta,descripcion,puesto2,empresa2,desde2,hasta2,descripcion2,puesto3,empresa3,desde3,hasta3,descripcion3} = req.body
    try{
        const laboralData = await LaboralData.findById(id)

        if(!puesto && !empresa && !desde && !hasta && !descripcion && !puesto2 && !empresa2 && !desde2 && !hasta2 && !descripcion2 && !puesto3 && !empresa3 && !desde3 && !hasta3 && !descripcion3)
            throw new Error("No hay datos para actualizar")

        await laboralData.updateOne({puesto, empresa, desde, hasta,descripcion,puesto2,empresa2,desde2,hasta2,descripcion2,puesto3,empresa3,desde3,hasta3,descripcion3})

        req.flash("mensajes", [{msg: "Datos actualizados"}])
        
        res.redirect('/datosPersonales/verMisDatos')
    }
    catch(error){
        req.flash("mensajes", [{msg: error.message}])
        return res.redirect('/datosPersonales/verMisDatos')
    }
}

//Muestra el Form de Editar Perfíl
const formEditarPerfil = async(req, res)=>{
    try{
        const descripcionData =  await DescripcionData.findById(req.user.id)
        res.render('editarPerfil', {descripcionData: descripcionData})
    }
    catch(error){
        req.flash("mensajes", [{msg: "Error al cargar el formulario"}])
        res.redirect('/datosPersonales/verMisDatos')
    }
}

//Guarda los datos nuevos de Perfil
const editarPerfil = async(req, res)=>{
    const {id} = req.params
    const {descripcionPerfil} = req.body
    try{
        const descripcionData = await DescripcionData.findById(id)
        if(!descripcionPerfil || descripcionPerfil== "" || descripcionPerfil == null)
            throw new Error("No hay datos para actualizar")

        await descripcionData.updateOne({descripcionPerfil})

        req.flash("mensajes", [{msg: "Datos actualizados"}])
        res.redirect('/datosPersonales/verMisDatos')
    }
    catch(error){
        req.flash("mensajes", [{msg: error.message}])
        return res.redirect('/datosPersonales/verMisDatos')
    }
}

//Muestra el Form de Editar Formación
const formEditarFormacion = async(req, res)=>{
    try{
        const laboralData =  await LaboralData.findById(req.user.id)
        res.render('editarFormacion', {laboralData: laboralData})
    }
    catch(error){
        req.flash("mensajes", [{msg: "Error al cargar el formulario"}])
        res.redirect('/datosPersonales/verMisDatos')
    }
}

//Guarda los datos nuevos de Formación
const editarFormacion = async(req, res)=>{
    const {id} = req.params
    const {carrera, instituto, finalizado,carrera2, instituto2, finalizado2,carrera3, instituto3, finalizado3} = req.body
    try{
        const laboralData = await LaboralData.findById(id)

        if(!carrera && !instituto && !finalizado && !carrera2 && !instituto2 && !finalizado2 && !carrera3 && !instituto3 && !finalizado3)
            throw new Error("No hay datos para actualizar")

        await laboralData.updateOne({carrera, instituto, finalizado,carrera2, instituto2, finalizado2,carrera3, instituto3, finalizado3})

        req.flash("mensajes", [{msg: "Datos actualizados"}])
        
        res.redirect('/datosPersonales/verMisDatos')
    }
    catch(error){
        req.flash("mensajes", [{msg: error.message}])
        return res.redirect('/datosPersonales/verMisDatos')
    }
}

//Muestra el Form de Editar Idioma
const formEditarIdioma = async(req, res)=>{
    try{
        const laboralData =  await LaboralData.findById(req.user.id)
        res.render('editarIdioma', {laboralData: laboralData})
    }
    catch(error){
        req.flash("mensajes", [{msg: "Error al cargar el formulario"}])
        res.redirect('/datosPersonales/verMisDatos')
    }
}

//Guarda los datos nuevos de Idiomas
const editarIdioma = async(req, res)=>{
    const {id} = req.params
    const {idioma, nivel, idioma2, nivel2, idioma3, nivel3} = req.body
    
    try{
        const laboralData = await LaboralData.findById(id)

        if(!idioma && !nivel && !idioma2 && !nivel2 && !idioma3 && !nivel3)
            throw new Error("No hay datos para actualizar")

        await laboralData.updateOne({idioma, nivel, idioma2, nivel2, idioma3, nivel3})

        req.flash("mensajes", [{msg: "Datos actualizados"}])
        
        res.redirect('/datosPersonales/verMisDatos')
    }
    catch(error){
        req.flash("mensajes", [{msg: error.message}])
        return res.redirect('/datosPersonales/verMisDatos')
    }
}


module.exports = {
    leerDatosPersonales,agregarDatosPersonales,eliminarDatosPersonales,
    editarDatosPersonales,guardarDatosEditados,
    formEditarFoto,editarFoto,
    formEditarExperiencia,editarExperiencia,
    formEditarPerfil,editarPerfil,
    formEditarFormacion,editarFormacion,
    formEditarIdioma,editarIdioma
}

