



/*
const PersonalData = require('../models/PersonalData')
//Trae los Datos Personales
const leerDatos = async(req, res) =>{
    try{
        const personaldatos = await PersonalData.find({user: req.user.id}).lean() 
        res.render('verMisDatos', {personaldatos : personaldatos})
    }
    catch(error){
        req.flash("mensajes", [{msg: error.message}])
        return res.redirect('verMisDatos/verMisDatos')
    }
}

module.exports = {
    misDatosForm,
    leerDatos
}


*/


