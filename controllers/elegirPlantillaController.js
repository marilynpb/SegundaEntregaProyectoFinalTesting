const DescripcionData = require('../models/DescripcionData')
const LaboralData = require('../models/LaboralData')
const PersonalData = require('../models/PersonalData')
const Plantilla = require('../models/Plantilla')
const User = require('../models/User')

//Guarda la plantilla seleccionada
const agregarPlantilla = async(req, res)=>{
    const {elegirPlantilla} = req.body
    try{
        const miPlantilla = new Plantilla({
            elegirPlantilla: elegirPlantilla,
            user: req.user.id
        })
        if(!elegirPlantilla){
            throw new Error("Debe elegir una plantilla")
        }

        await miPlantilla.save()
        req.flash("mensajes", [{msg: "Se guardó la plantilla"}])

        let basico = "basico"
        let creativo1 = "creativo1"
        let creativo2 = "creativo2"
        let moderno1 = "moderno1"
        let moderno3 = "moderno3"
        let moderno2 = "moderno2"
        let cronologico = "cronologico"
        let funcional = "funcional"
        let mixto = "mixto"

        switch (miPlantilla.elegirPlantilla) {
            case basico:
                res.redirect('basico')
            break;

            case creativo1:
                res.redirect('creativo1')
            break;

            case creativo2:
                res.redirect('creativo2')
            break;

            case moderno1:
                res.redirect('moderno1')
            break;

            case cronologico:
                res.redirect('cronologico')
            break;

            case funcional:
                res.redirect('funcional')
            break;

            case mixto:
                res.redirect('mixto')
            break;

            case moderno2:
                res.redirect('moderno2')
            break;

            case moderno3:
                res.redirect('moderno3')
            break;
        
            default:
                res.redirect("/elegirPlantilla/soloElegirPlantilla")
                req.flash("mensajes", [{msg: "No se pudo encontrar la plantilla, vuelva a intentar"}])
            break;
        }
    }
    catch(error){
        req.flash("mensajes", [{msg: error.message}])
        return res.redirect('/elegirPlantilla/soloElegirPlantilla')
    }
}

/*---------Completa el modelo elegido con los datos del usuario-----*/
const leerDatosBasico = async(req, res)=>{
    try{
        const descripcionData = await DescripcionData.find({user: req.user.id}).lean()
        const personal = await PersonalData.find({user: req.user.id}).lean() 
        const laboralData = await LaboralData.find({user: req.user.id}).lean()
        const user = await User.find(req.user.id)

        res.render('basico',  {personal : personal, laboralData: laboralData, user: user, descripcionData: descripcionData})
    }
    catch(error){
        req.flash("mensajes", [{msg: error.message}])
        return res.redirect('/elegirPlantilla/soloElegirPlantilla')
    }
}

const leerDatosCreativo1 = async(req, res)=>{
    try{
        const descripcionData = await DescripcionData.find({user: req.user.id}).lean()
        const personal = await PersonalData.find({user: req.user.id}).lean() 
        const laboralData = await LaboralData.find({user: req.user.id}).lean()
        const user = await User.find(req.user.id)

        res.render('creativo1',  {personal : personal, laboralData: laboralData, user: user, descripcionData: descripcionData})
    }
    catch(error){
        req.flash("mensajes", [{msg: error.message}])
        return res.redirect('/elegirPlantilla/soloElegirPlantilla')
    }
}

const leerDatosModerno1 = async(req, res)=>{
    try{
        const descripcionData = await DescripcionData.find({user: req.user.id}).lean()
        const personal = await PersonalData.find({user: req.user.id}).lean() 
        const laboralData = await LaboralData.find({user: req.user.id}).lean()
        const user = await User.find(req.user.id)

        res.render('moderno1',  {personal : personal, laboralData: laboralData, user: user, descripcionData: descripcionData})
    }
    catch(error){
        req.flash("mensajes", [{msg: error.message}])
        return res.redirect('/elegirPlantilla/soloElegirPlantilla')
    }
}

const leerDatosCronologico = async(req, res)=>{
    try{
        const descripcionData = await DescripcionData.find({user: req.user.id}).lean()
        const personal = await PersonalData.find({user: req.user.id}).lean() 
        const laboralData = await LaboralData.find({user: req.user.id}).lean()
        const user = await User.find(req.user.id)

        res.render('cronologico',  {personal : personal, laboralData: laboralData, user: user, descripcionData: descripcionData})
    }
    catch(error){
        req.flash("mensajes", [{msg: error.message}])
        return res.redirect('/elegirPlantilla/soloElegirPlantilla')
    }
}

const leerDatosFuncional = async(req, res)=>{
    try{
        const descripcionData = await DescripcionData.find({user: req.user.id}).lean()
        const personal = await PersonalData.find({user: req.user.id}).lean() 
        const laboralData = await LaboralData.find({user: req.user.id}).lean()
        const user = await User.find(req.user.id)

        res.render('funcional',  {personal : personal, laboralData: laboralData, user: user, descripcionData: descripcionData})
    }
    catch(error){
        req.flash("mensajes", [{msg: error.message}])
        return res.redirect('/elegirPlantilla/soloElegirPlantilla')
    }
}

const leerDatosMixto = async(req, res)=>{
    try{
        const descripcionData = await DescripcionData.find({user: req.user.id}).lean()
        const personal = await PersonalData.find({user: req.user.id}).lean() 
        const laboralData = await LaboralData.find({user: req.user.id}).lean()
        const user = await User.find(req.user.id)

        res.render('mixto',  {personal : personal, laboralData: laboralData, user: user, descripcionData: descripcionData})
    }
    catch(error){
        req.flash("mensajes", [{msg: error.message}])
        return res.redirect('/elegirPlantilla/soloElegirPlantilla')
    }
}

const leerDatosModerno2 = async(req, res)=>{
    try{
        const descripcionData = await DescripcionData.find({user: req.user.id}).lean()
        const personal = await PersonalData.find({user: req.user.id}).lean() 
        const laboralData = await LaboralData.find({user: req.user.id}).lean()
        const user = await User.find(req.user.id)

        res.render('moderno2',  {personal : personal, laboralData: laboralData, user: user, descripcionData: descripcionData})
    }
    catch(error){
        req.flash("mensajes", [{msg: error.message}])
        return res.redirect('/elegirPlantilla/soloElegirPlantilla')
    }
}

const leerDatosCreativo2 = async(req, res)=>{
    try{
        const descripcionData = await DescripcionData.find({user: req.user.id}).lean()
        const personal = await PersonalData.find({user: req.user.id}).lean() 
        const laboralData = await LaboralData.find({user: req.user.id}).lean()
        const user = await User.find(req.user.id)

        res.render('creativo2',  {personal : personal, laboralData: laboralData, user: user, descripcionData: descripcionData})
    }
    catch(error){
        req.flash("mensajes", [{msg: error.message}])
        return res.redirect('/elegirPlantilla/soloElegirPlantilla')
    }
}

const leerDatosModerno3 = async(req, res)=>{
    try{
        const descripcionData = await DescripcionData.find({user: req.user.id}).lean()
        const personal = await PersonalData.find({user: req.user.id}).lean() 
        const laboralData = await LaboralData.find({user: req.user.id}).lean()
        const user = await User.find(req.user.id)

        res.render('moderno3',  {personal : personal, laboralData: laboralData, user: user, descripcionData: descripcionData})
    }
    catch(error){
        req.flash("mensajes", [{msg: error.message}])
        return res.redirect('/elegirPlantilla/soloElegirPlantilla')
    }
}


module.exports = {
    agregarPlantilla,
    leerDatosBasico,
    leerDatosCreativo1,
    leerDatosModerno1,
    leerDatosCronologico,
    leerDatosFuncional,
    leerDatosMixto,
    leerDatosModerno2,
    leerDatosCreativo2,
    leerDatosModerno3
}