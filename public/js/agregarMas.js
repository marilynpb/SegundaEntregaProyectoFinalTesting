
    function validar(){
        let agregar = document.getElementById('agregar')
        let carrera = document.getElementById('carrera')
        let instituto = document.getElementById('instituto')
        let egreso = document.getElementById('finalizado')
        let nuevoForm1 = document.getElementById('nuevoForm1')

        if(carrera.value == null || carrera.value == "" || instituto.value == null || instituto.value == ""|| egreso.value == null || egreso.value == ""){
            alert(carrera.value, instituto.value, egreso.value)
            alert("Debe completar los datos actuales para agregar otro formulario")
        }
        else{
            nuevoForm1.classList.remove("deshabilitado")
            console.log("Si")
        }
    }









