const mongoose = require('mongoose');
const {Schema} = mongoose

const PersonalDataSchema = new Schema({
    nombre:{
        type: String,
        unique:false,
        required: true
    },
    apellido:{
        type: String,
        unique:false,
        required: true
    },
    email:{
        type: String,
        unique:true,
        required: true
    },
    /*fechaNac:{
        type: Date,
        unique:false,
        required: false
    },*/
    sexo:{
        type: String,
        unique:false,
        required: false
    },
    estadoCivil:{
        type: String,
        unique:false,
        required: false
    },
    calle:{
        type: String,
        unique:false,
        required: false
    },
    altura:{
        type: Number,
        unique:false,
        required: false
    },
    cp:{
        type: Number,
        unique:false,
        required: false
    },
    pais:{
        type: String,
        unique:false,
        required: true
    },
    telefono:{
        type: Number,
        unique:false,
        required: false
    }
})

const PersonalData= mongoose.model('PersonalData', PersonalDataSchema)
module.exports = PersonalData;