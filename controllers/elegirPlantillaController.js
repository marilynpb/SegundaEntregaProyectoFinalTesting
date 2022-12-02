const DescripcionData = require('../models/DescripcionData')
const LaboralData = require('../models/LaboralData')
const PersonalData = require('../models/PersonalData')
const Plantilla = require('../models/Plantilla')
const User = require('../models/User')

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

        const descripcionData = await DescripcionData.find({user: req.user.id}).lean()
        const personal = await PersonalData.find({user: req.user.id}).lean() 
        const laboralData = await LaboralData.find({user: req.user.id}).lean()
        const user = await User.find(req.user.id)

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
                res.render('basico', {personal : personal, laboralData: laboralData, user: user, descripcionData: descripcionData})
            break;

            case creativo1:
                res.render('creativo1', {personal : personal, laboralData: laboralData, user: user, descripcionData: descripcionData})
            break;

            case creativo2:
                res.render('creativo2', {personal : personal, laboralData: laboralData, user: user, descripcionData: descripcionData})
            break;

            case moderno1:
                res.render('moderno1', {personal : personal, laboralData: laboralData, user: user, descripcionData: descripcionData})
            break;

            case cronologico:
                res.render('cronologico', {personal : personal, laboralData: laboralData, user: user, descripcionData: descripcionData})
            break;

            case funcional:
                res.render('funcional', {personal : personal, laboralData: laboralData, user: user, descripcionData: descripcionData})
            break;

            case mixto:
                res.render('mixto', {personal : personal, laboralData: laboralData, user: user, descripcionData: descripcionData})
            break;

            case moderno2:
                res.render('moderno2', {personal : personal, laboralData: laboralData, user: user, descripcionData: descripcionData})
            break;

            case moderno3:
                res.render('moderno3', {personal : personal, laboralData: laboralData, user: user, descripcionData: descripcionData})
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


module.exports = {
    agregarPlantilla,
}