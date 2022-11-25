const { event } = require("jquery")

window.addEventListener('DOMContentLoaded', (event)=>{
    console.log("hola1")
    
    let agregar = document.getElementById('agregar')
    let carrera = document.getElementsByName('carrera')
    let instituto = document.getElementsByName('instituto')

    agregar.addEventListener('click', validar)

    function validar(){
        console.log("hola")
        if(carrera.value === null || carrera.value === "" || instituto.value === null || instituto.value === ""){
            alert("Debe completar los datos actuales para agregar otro formulario")
        }
        else{
            agregar.classList.remove("deshabilitado")
        }
    }
})






