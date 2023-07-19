let usuarios = document.querySelector('#idUsuario');
usuarios.innerHTML = "<option value=''>Selecciona un Usuario</option>";
usuarios.addEventListener('change', listarUsuario);
let tipoUser = document.querySelector('#EstadoCuenta');
tipoUser.addEventListener('change', listarValor)

let validacionComprobante = document.querySelector('#valAgregar');

$(document).ready(function(){
    consultarUsuarios();

    $('#agregar').on('click', function(){

        let idUser = $('#idUsuario').val();
        let valorSuscripcion = $('#valor').val();
        let tipo = document.querySelector('#EstadoCuenta').value;
        validarNull();
        

        if (idUser != '' && valorSuscripcion != ''){
            validacionComprobante.textContent = '';

            let comprobante = {
                valor: valorSuscripcion
            }

            if (cambiarEstadoUser(tipo, idUser)){
                agregarComprobante(comprobante, idUser);
            }

        } else {
            validacionComprobante.textContent = 'No has seleccionado los campos necesarios.';
            
        }

    })
    
    


})


function agregarComprobante(comprobante, documento){

    let datosEnvio = JSON.stringify(comprobante);

    $.ajax({
        url: "http://127.0.0.1:8080/agregarComprobante/" + documento,
        type :"POST",
        data: datosEnvio,
        contentType: "application/JSON",
        async: false,
        datatype: JSON,
        success: function(respuesta) {
            alert(respuesta);
            location.reload();
        }

    })

}


function cambiarEstadoUser(tipoUser, id){

    let response = false;

    if (confirm("¿Estás seguro de actualizar la suscripción de este registro?")) {
        $.ajax({
            url: "http://127.0.0.1:8080/actualizarEstadoUsuario/" + tipoUser + "/" + id,
            type: "PUT",
            async: false,
            datatype: "JSON",
            success: function (respuesta) {
                if (respuesta = 'Tipo de Usuario actualizado con exito.'){
                    alert(respuesta);
                    response = true;
                }

            }
        });
    } else {
        alert('No se actualizo la suscripción del usuario.');

    }

    return response;

}


function validarNull(){
    let datos = document.querySelectorAll('.controls');
    datos.forEach(valor => {
        if(valor.value == ''){
            valor.setAttribute('style', 'border-color: red;');
        } else {
            valor.setAttribute('style', 'border-color: #595b61;');
        }                       
    });

}


function consultarUsuarios(){

    $.ajax({

        url : "http://localhost:8080/listarUsuarios",
        type : "GET",
        async: false,
        datatype : "JSON",
        success : function (respuesta){

            for (let i = 0; i < respuesta.length; i++) {
                if (respuesta[i].estadoCuenta != 'Administrador' && respuesta[i].estadoCuenta != 'Restringido'){
                    usuarios.innerHTML += '<option value="' + respuesta[i].idUsuario + '">' + respuesta[i].nombres + " - " + respuesta[i].idUsuario +'</option>';
                }
                
            }

        }

    })


}

function listarUsuario(){

    let documento = $('#idUsuario').val();

    if (documento != ""){
        $.ajax({
            url: "http://localhost:8080/buscarUsuario/" + documento,
            type: "GET",
            datatype: "JSON",
            async: false,
            success: function(respuesta){
                document.querySelector('#EstadoCuenta').value = respuesta.estadoCuenta;
                
            }
    
        })
        
    } else {
        document.querySelector('#EstadoCuenta').value = '';
        document.querySelector('#valor').value = '';
    }
    listarValor();
}

let valores = {

    'Invitado': 0,
    'Suscrito': 15000,
    'MonthLED': 0,
    'Premium': 8000,
    'LEDUser': 0

}

function listarValor(){

    let tipo = document.querySelector('#EstadoCuenta').value;

    if (tipo != ""){
        Object.keys(valores).forEach(function (clave) {
            let valor = valores[clave];
    
            if (clave == tipo) {
                document.querySelector('#valor').value = valor;
            }
    
        });
    }else {
        document.querySelector('#valor').value = '';
    }

}
