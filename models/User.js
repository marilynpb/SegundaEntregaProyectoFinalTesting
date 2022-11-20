const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const {Schema} = mongoose

const UserSchema = new Schema({
    email:{
        type: String,
        lowercase: true,
        required: true,
        index: {unique: true}
    },
    password:{
        type: String,
        lowercase: true,
        required: true
    },
    tokenConfirm:{
        type: String,
        default: null
    },
    cuentaConfirmada:{
        type: Boolean,
        default: false
    }
})

UserSchema.pre("save", async function(next){
    const user = this;
    if(!user.isModified("password")) return next()

    try{
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(user.password, salt)

        user.password = hash
        next()
    }
    catch (error){
        console.log(error)
        throw new Error ("Error al codificar la contraseña")
    }
})


UserSchema.methods.comparePassword = async function(canditePassword){
    return await bcrypt.compare(canditePassword, this.password)
}

module.exports = mongoose.model('User', UserSchema)