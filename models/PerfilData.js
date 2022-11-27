const mongoose = require('mongoose')
const {Schema} = mongoose

const PerfilDataSchema = new Schema({
    descripcion: {
        type: String,
        unique: false,
        required: true,
    },
    /*imagen:{
        type: String,
        default: null,
    },*/
    user: {
        type: Schema.Types.ObjectId, 
        ref: "User",
        required: true,
    }
})

const PerfilData = mongoose.model('PerfilData', PerfilDataSchema)
module.exports = PerfilData