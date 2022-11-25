const LaboralData = require('../models/LaboralData')

const agregarDatos = async(req, res)=>{
    const {
        carrera, instituto, puesto, empresa, descripcion, idioma, nivel
    } = req.body

    try{
        const laboralData = new LaboralData({
            carrera: carrera,
            instituto: instituto,
            puesto: puesto,
            empresa: empresa,
            descripcion: descripcion,
            idioma: idioma,
            nivel: nivel,
            user: req.user.id
        })

        if(!carrera){
            throw new Error("Complete los campos obligatorios: (*)")
        }
        if(!instituto){
            throw new Error("Complete los campos obligatorios: (*)")
        }
        if(!puesto){
            throw new Error("Complete los campos obligatorios: (*)")
        }
        if(!empresa){
            throw new Error("Complete los campos obligatorios: (*)")
        }
        if(!descripcion){
            throw new Error("Complete los campos obligatorios: (*)")
        }

        await laboralData.save()
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
