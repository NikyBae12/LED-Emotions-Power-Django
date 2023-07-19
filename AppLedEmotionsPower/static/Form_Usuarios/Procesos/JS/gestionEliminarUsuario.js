let selectUsers = document.querySelector('#id');
let tablaUsuarios = document.querySelector('#tablaBody');
tablaUsuarios.innerHTML = '';
let filtroId = document.querySelector('#idBusqueda');
let filtroCorreo = document.querySelector('#correo');
let filtroEstado = document.querySelector('#estado');
filtroId.addEventListener('input', listarUsuarios);
filtroCorreo.addEventListener('input', listarUsuarios);
filtroEstado.addEventListener('change', listarUsuarios);

$(document).ready(function(){
    listarTabla();

    // METODO ELIMINAR
    $('.btnEliminar').on('click', function(){
        
        eliminarUser(this);
        
        
    });

    // METODO ACTIVAR
    $('.btnActivar').on('click', function(){
        
        cambiarEstadoU(this);
        
    });

    // METODO ACTIVAR
    $('.btnDesactivar').on('click', function(){
        
        cambiarEstadoU(this);
        
    });

    
});


function eliminarUser(boton){

    let id = boton.getAttribute('id');

    if (confirm("¿Estás seguro de eliminar este registro?")) {
        $.ajax({
            url: "http://127.0.0.1:8080/eliminarUsuario/" + id,
            type: "DELETE",
            datatype: "JSON",
            success: function (respuesta) {
                alert(respuesta);
                location.reload();
            }
        });
    } else {
        alert('No se elimino el usuario.')

    }

}

function cambiarEstadoU(boton){

    let tipoUser = '';
    let id = boton.getAttribute('id');

    if (boton.getAttribute('value') == 'Activar'){
        tipoUser = 'Invitado';
    } else {
        tipoUser = 'Restringido';
    }

    if (confirm("¿Estás seguro de " + boton.getAttribute('value') +" este registro?")) {
        $.ajax({
            url: "http://127.0.0.1:8080/actualizarEstadoUsuario/" + tipoUser + "/" + id,
            type: "PUT",
            datatype: "JSON",
            success: function (respuesta) {
                alert(respuesta);
                location.reload();
            }
        });
    } else {
        alert('No se ' + boton.getAttribute('value') +' el usuario.');

    }


}



function listarTabla(){


    // METODO LISTAR    

    $.ajax({
        url : "http://localhost:8080/listarUsuarios",
        type : "GET",
        async: false,
        datatype : "JSON",
        success : function (respuesta){
            let inputBtn = '';
            
            for (let i = 0; i < respuesta.length; i++) {
                if (respuesta[i].estadoCuenta == 'Restringido'){
                    inputBtn = '<input type="button" class="btnActivar" id="' + respuesta[i].idUsuario + '" value="Activar">' + '<input type="button" class="btnEliminar" id="' + respuesta[i].idUsuario + '" value="Eliminar">';
                } else {
                    inputBtn = '<input type="button" class="btnDesactivar" id="' + respuesta[i].idUsuario + '" value="Desactivar">';
                }

                tablaUsuarios.innerHTML += '<tr><td>' + respuesta[i].idUsuario +
                '</td><td>' + respuesta[i].nombres +
                '</td><td>' + respuesta[i].email + 
                '</td><td>' + respuesta[i].contraseña + 
                '</td><td>' + respuesta[i].fechaN + 
                '</td><td>' + respuesta[i].codVerif +
                '</td><td>' + respuesta[i].estadoCuenta + 
                '</td><td>' + inputBtn + 
                '</td><td>' + respuesta[i].imgPerfil + 
                '</td></tr>';
                
            }

        }
    }); 

}


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