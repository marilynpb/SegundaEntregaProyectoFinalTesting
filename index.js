const express = require('express');
const path = require('path')
const hbs = require('hbs');
const app = express();
const PORT = process.env.PORT || 3000;
require('dotenv').config();
require('./database/db');

//Hbs
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));

//Middlewares
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'))
app.use(express.json());



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