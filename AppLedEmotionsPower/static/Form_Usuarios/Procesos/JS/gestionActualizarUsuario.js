let tablaUsuarios = document.querySelector('#tablaBody');
tablaUsuarios.innerHTML = '';
let filtroId = document.querySelector('#idBusqueda');
let filtroCorreo = document.querySelector('#correo');
let filtroEstado = document.querySelector('#estado');
filtroId.addEventListener('input', listarUsuarios);
filtroCorreo.addEventListener('input', listarUsuarios);
filtroEstado.addEventListener('change', listarUsuarios);

let validacionDocumento = document.querySelector('#valDocumento');
let validacionCorreo = document.querySelector('#valEmail');
let validacionPass = document.querySelector('#valContraseña');
let validacionConf = document.querySelector('#valConfir');
let validacionTipoUser = document.querySelector('#valTipoUser');
let validacionNull = document.querySelector('#valNull');
let validacionCodigo = document.querySelector('#valCodigo');

$(document).ready(function(){
    listarTabla();
    let date = new Date().toISOString().slice(0, 10);
    document.querySelector('#FechaN').setAttribute('max', date);
    
    $('#actualizarUsu').on('click', function(){

        let idUsuario= $('#IdUsuario').val();
        let nombres = $('#Nombres').val();
        let email = $('#Email').val();
        let contraseña = $('#Contraseña').val();
        let confirmacion = $('#Confir').val();
        let fechaN = $('#FechaN').val();
        let codVerif= $('#CodVerif').val();
        let imgPerfil = $('#imgPerfil').val(); 
        let estadoCuenta = $('#EstadoCuenta').val(); 
        
        validarNull();
        if (idUsuario != '' && nombres != '' && email != '' && contraseña != '' && confirmacion != '' && fechaN != '' && estadoCuenta != ''){
            validacionNull.textContent = '';
            if (validarCode(estadoCuenta, codVerif) && validarRegistro(idUsuario, email, contraseña, confirmacion) >= 3){
                
                if(confirm("¿Estás seguro de actualizar este Usuario?")){
                    let Usuarios = {
                        idUsuario: idUsuario,
                        nombres : nombres,
                        email : email,
                        contraseña : contraseña,
                        fechaN : fechaN,
                        codVerif: codVerif,
                        imgPerfil : imgPerfil, 
                        estadoCuenta : estadoCuenta,   
                    }
        
                    let actuUsuario = JSON.stringify(Usuarios);
        
                    $.ajax({
                        url: "http://127.0.0.1:8080/actualizarUsuario",
                        type: "PUT",
                        data: actuUsuario,
                        contentType: "application/JSON",
                        datatype: "JSON",
        
                        success: function(response){
                            alert(response);
                            location.reload();
                        }
                    })
                } else {
                    alert('No se actualizo el usuario.')
                }

            }
    
        } else {
            validacionNull.textContent = "Campos Vacios. Por favor, llena todos los campos.";  
        }
    
        
    })

})




function listarTabla(){


    // METODO LISTAR    

    $.ajax({
        url : "http://localhost:8080/listarUsuarios",
        type : "GET",
        async: false,
        datatype : "JSON",
        success : function (respuesta){


            for (let i = 0; i < respuesta.length; i++) {
                if (respuesta[i].estadoCuenta != "Restringido"){
                    tablaUsuarios.innerHTML += '<tr><td>' + respuesta[i].idUsuario +
                    '</td><td>' + respuesta[i].nombres +
                    '</td><td>' + respuesta[i].email + 
                    '</td><td>' + respuesta[i].contraseña + 
                    '</td><td>' + respuesta[i].fechaN + 
                    '</td><td>' + respuesta[i].codVerif +
                    '</td><td>' + respuesta[i].estadoCuenta + 
                    '</td><td> <input type="button" class="btnListar" id="' + respuesta[i].idUsuario + '" value="Actualizar">' + 
                    '</td><td>' + respuesta[i].imgPerfil + 
                    '</td></tr>';

                }
                
            }
            listarUsuarioForm();

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




function listarUsuarioForm(){

    $('.btnListar').on('click', function(){

        let btnId = this.getAttribute('id');

        $.ajax({
            url: "http://localhost:8080/buscarUsuario/" + btnId,
            type: "GET",
            datatype: "JSON",
            async: false,
            success: function(respuesta){

                document.querySelector('#IdUsuario').setAttribute('value', respuesta.idUsuario);
                document.querySelector('#Nombres').setAttribute('value', respuesta.nombres);
                document.querySelector('#Email').setAttribute('value', respuesta.email);
                document.querySelector('#Contraseña').setAttribute('value', respuesta.contraseña);
                document.querySelector('#Confir').setAttribute('value', respuesta.contraseña);
                document.querySelector('#FechaN').setAttribute('value', respuesta.fechaN);
                document.querySelector('#CodVerif').setAttribute('value', respuesta.codVerif);
                document.querySelector('#imgPerfil').setAttribute('value', respuesta.imgPerfil);
                document.querySelector('#EstadoCuenta').value = respuesta.estadoCuenta;

            }

    })

    })

}



/*VALIDAR FORMULARIO ACTUALIZAR*/

function validarNull(){
    let datos = document.querySelectorAll('.controls:required');
    datos.forEach(valor => {
        if(valor.value == ''){
            valor.setAttribute('style', 'border-color: red;');
        } else {
            valor.setAttribute('style', 'border-color: #595b61;');
        }                       
    });

}

/*FUNCIONES ADICIONALES */

function validarEmail(email){

    var emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    return emailRegex.test(email);

}

function validarContraseña(contraseña){

    return contraseña.length > 8;
 
}

function validarConfirmacion(contraseña, confirmacion){
    return confirmacion == contraseña;

}


function validarRegistro(documento, email, contraseña, confirmacion){
 
    contador = 0;

    if(validarEmail(email)){
        contador++;
        validacionCorreo.textContent = '';

    } else {

        validacionCorreo.textContent = "Correo no Valido.";
        document.querySelector('#Email').setAttribute('style', 'border-color: red;');

    }

    if (validarContraseña(contraseña)){
        contador++;
        validacionPass.textContent = '';
        document.querySelector('#Contraseña').setAttribute('style', 'border-color: #595b61;');

    } else {
 
        validacionPass.textContent = "Contraseña Invalida";
        document.querySelector('#Contraseña').setAttribute('style', 'border-color: red;');


    }

    if (validarConfirmacion(contraseña, confirmacion)){
        contador++;
        validacionConf.textContent = '';
        document.querySelector('#Confir').setAttribute('style', 'border-color: #595b61;');

    } else {

        validacionConf.textContent = "Las contraseñas no coinciden.";
        document.querySelector('#Confir').setAttribute('style', 'border-color: red;');

    }

    return contador;

}

function validarCode(tipoUser, codigoVer){
    let estado = true;
    if (tipoUser == 'Administrador'){
        estado = codigoVer != '';

        if (estado){
            validacionCodigo.textContent = '';
            document.querySelector('#CodVerif').setAttribute('style', 'border-color: #595b61;');

        } else {

            validacionCodigo.textContent = '*Campo obligatorio para Administrador';
            document.querySelector('#CodVerif').setAttribute('style', 'border-color: red;');
        }

    }

    return estado;

}


function validarRegistroResponse(response){

    alert(response);
    if (response == 'Usuario registrado exitosamente.'){
        
        location.reload();
    } 

}



/* FUNCIONES PARA CREAR EL COMPROBANTE AL ACTUALIZAR EL USUARIO */


let valores = {

    'Invitado': 0,
    'Suscrito': 15000,
    'MonthLED': 0,
    'Premium': 8000,
    'LEDUser': 0

}

function crearComprobante(tipoUser){

    let comprobante = {
        valor: null
    }

    if (tipoUser != ""){
        Object.keys(valores).forEach(function (clave) {
            let valorS = valores[clave];
    
            if (clave == tipoUser) {
                comprobante.valor = valorS;
            }
    
        });
    }else {
        document.querySelector('#valor').value = '';
    }

}

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