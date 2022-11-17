const mongoose = require('mongoose');

mongoose.connect(process.env.URI)
    .then(()=> console.log("Aplicación conectada a la Base de Datos ✅"))
    .catch((e)=> console.log("Error al conectar la Base de Datos ❌" + e))