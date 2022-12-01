const Plantilla = require('../models/Plantilla')

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
                res.render('basico', {miPlantilla : miPlantilla})
            break;

            case creativo1:
                res.render('creativo1', {miPlantilla : miPlantilla})
            break;

            case creativo2:
                res.render('creativo2', {miPlantilla : miPlantilla})
            break;

            case moderno1:
                res.render('moderno1', {miPlantilla : miPlantilla})
            break;

            case cronologico:
                res.render('cronologico', {miPlantilla : miPlantilla})
            break;

            case funcional:
                res.render('funcional', {miPlantilla : miPlantilla})
            break;

            case mixto:
                res.render('mixto', {miPlantilla : miPlantilla})
            break;

            case moderno2:
                res.render('moderno2', {miPlantilla : miPlantilla})
            break;

            case moderno3:
                res.render('moderno3', {miPlantilla : miPlantilla})
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

const leerPlantilla = async(req, res)=>{
    try{
        const plantilla = await Plantilla.find({user: req.user.id}).lean()

        let basico = "basico"
        switch (plantilla.elegirPlantilla) {
            case basico:
                console.log("BASICO")
                res.render('basico', {plantilla : plantilla})
                break;
        
            default:
                res.render('miCV', {plantilla : plantilla})
                break;
        }/*( plantilla.elegirPlantilla !=('wwbasico')){
            throw new Error ("No se encontró la plantilla, intente nuevamente")
            console.log(plantilla.elegirPlantilla)
        }
        else{
            res.render('miCV', {plantilla : plantilla})
        }*/


    }
    catch(error){
        req.flash("mensajes", [{msg: error.message}])
        return res.redirect('/elegirPlantilla/soloElegirPlantilla')
    }
}


module.exports = {
    agregarPlantilla,
    leerPlantilla
}