const LaboralData = require('../models/LaboralData')

const agregarDatos = async(req, res)=>{
    const {
        carrera, instituto, finalizado, puesto, empresa, desde, hasta, descripcion, idioma, nivel
    } = req.body

    try{
        const laboralData = new LaboralData({
            carrera: carrera,
            instituto: instituto,
            finalizado: finalizado,
            puesto: puesto,
            empresa: empresa,
            desde: desde,
            hasta: hasta,
            descripcion: descripcion,
            idioma: idioma,
            nivel: nivel,
            user: req.user.id
        })

        if(!carrera){
            throw new Error("Complete los campos obligatorios: (*carrera)")
        }
        if(!instituto){
            throw new Error("Complete los campos obligatorios: (*instituto)")
        }
        if(!finalizado){
            console.log(finalizado)
            throw new Error("Complete los campos obligatorios: (*egreso)")
        }
        if(!puesto){
            throw new Error("Complete los campos obligatorios: (*puesto)")
        }
        if(!empresa){
            throw new Error("Complete los campos obligatorios: (*empresa)")
        }
        if(!desde){
            throw new Error("Complete los campos obligatorios: (*desde)")
        }
        if(!hasta){
            throw new Error("Complete los campos obligatorios: (*hasta)")
        }
        if(!descripcion){
            throw new Error("Complete los campos obligatorios: (*descripcion)")
        }

        await laboralData.save()
        req.flash("mensajes", [{msg: "Datos agregados correctamente"}])
        
        res.redirect('/datosPerfil/datosPerfil')
    }
    catch(error){
        req.flash("mensajes", [{msg: error.message}])
        return res.redirect('/datosLaborales/datosLaborales')
    }
}

module.exports = {
    agregarDatos
}
