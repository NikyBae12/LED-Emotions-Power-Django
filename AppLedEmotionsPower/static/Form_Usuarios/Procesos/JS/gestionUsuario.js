let tablaUsuarios = document.querySelector('#tablaBody');
tablaUsuarios.innerHTML = '';
let filtroId = document.querySelector('#id');
let filtroCorreo = document.querySelector('#correo');
let filtroEstado = document.querySelector('#estado');
filtroId.addEventListener('input', listarUsuarios);
filtroCorreo.addEventListener('input', listarUsuarios);
filtroEstado.addEventListener('change', listarUsuarios);

$(document).ready(function(){


    // METODO LISTAR    

    $.ajax({
        url : "http://localhost:8080/listarUsuarios",
        type : "GET",
        async: false,
        datatype : "JSON",
        success : function (respuesta){

            for (let i = 0; i < respuesta.length; i++) {
                tablaUsuarios.innerHTML += '<tr><td>' + respuesta[i].idUsuario +
                '</td><td>' + respuesta[i].nombres +
                '</td><td>' + respuesta[i].email + 
                '</td><td>' + respuesta[i].contraseña + 
                '</td><td>' + respuesta[i].fechaN + 
                '</td><td>' + respuesta[i].codVerif +
                '</td><td>' + respuesta[i].estadoCuenta + 
                '</td><td>' + respuesta[i].imgPerfil + 
                '</td></tr>';
                
            }

        }
    }); 

})

function listarUsuarios(){
    let valId = filtroId.value;
    let valCorreo = filtroCorreo.value;
    let valEstado = filtroEstado.value;
    
    for (let i = 0; i < tablaUsuarios.rows.length; i++) {
        var fila = tablaUsuarios.rows[i];

        var id = fila.cells[0].textContent.toLowerCase();
        var correo = fila.cells[2].textContent.toLowerCase();
        var estado = fila.cells[6].textContent;

        if (id.includes(valId) && correo.includes(valCorreo) && estado.includes(valEstado)){
            fila.style.display = '';

        } else {
            fila.style.display = 'none';

        }
        
        
    }

    

}