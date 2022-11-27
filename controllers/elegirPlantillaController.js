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
        res.redirect("/elegirPlantilla/miCV")
    }
    catch(error){
        req.flash("mensajes", [{msg: error.message}])
        return res.redirect('/elegirPlantilla/elegirPlantilla')
    }

}

module.exports = {
    agregarPlantilla
}