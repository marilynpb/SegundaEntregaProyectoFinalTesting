const express = require('express');
const path = require('path')
const hbs = require('hbs');
const app = express();
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport');
const { initialize } = require('passport');
const User = require('./models/User');
const PORT = process.env.PORT || 3000;
require('dotenv').config();
require('./database/db');


//Hbs
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));


//Sesiones configuracion
app.use(session ({
    secret: 'keyboard glumy',
    resave: false,
    saveUninitialized: false,
    name: "secret-name-aoaoao"
}))

//Passport configuracion
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => 
    done(null, {id: user._id, email: user.email}));

passport.deserializeUser( async (user, done)=>{
    const userDB = await User.findById(user.id)
    return done(null, {id: userDB._id, email: userDB.email})
})


//Middlewares
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(flash())




//Rutas
app.use('/', require('./routes/home'))
app.use('/datosPersonales', require('./routes/datosPersonales'))
app.use('/verMisDatos', require('./routes/verMisDatos'))
app.use('/auth', require('./routes/auth'))


app.listen(PORT, ()=>
console.log("Aplicación corriendo en el puerto: "+PORT+" 🚀"))

app.on('Error', (err) => {
    console.log(`Tenemos un error en el Espacio`);
})