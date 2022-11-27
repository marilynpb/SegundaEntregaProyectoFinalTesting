const mongoose = require('mongoose')
const {Schema} = mongoose


const LaboralDataSchema = new Schema({
    carrera:{
        type: String,
        require: true,
        unique: false
    },
    instituto:{
        type: String,
        require: true,
        unique: false
    },
    finalizado:{
        type: String,
        require: true,
        unique: false
    },
    puesto:{
        type: String,
        unique: false,
        require: false
    },
    empresa:{
        type: String,
        unique: false,
        require: false
    },
    desde:{
        type: String,
        require: true,
        unique: false,
    },
    hasta:{
        type: String,
        require: true,
        unique: false
    },
    descripcion:{
        type: String,
        unique: false,
        require: true
    },
    idioma:{
        type: String,
        unique: false,
        require: false
    },
    nivel:{
        type: String,
        unique: false,
        require: false
    },
    user:{
        type: Schema.Types.ObjectId, 
        ref: "User",
        required: true,
    }
})


const LaboralData = mongoose.model('LaboralData', LaboralDataSchema)
module.exports = LaboralData