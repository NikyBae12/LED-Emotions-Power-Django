let validacionDocumento = document.querySelector('#valDocumento');
let validacionCorreo = document.querySelector('#valEmail');
let validacionPass = document.querySelector('#valContraseña');
let validacionConf = document.querySelector('#valConfir');
let validacionTipoUser = document.querySelector('#valTipoUser');
let validacionNull = document.querySelector('#valNull');
let validacionCodigo = document.querySelector('#valCodigo');

$(document).ready(function(){

    let date = new Date().toISOString().slice(0, 10);
    document.querySelector('#FechaN').setAttribute('max', date);

    // METODO AGREGAR
    $('#agregar').on('click', function(){

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
            if (validarCode(estadoCuenta, codVerif) && validarRegistro(idUsuario, email, contraseña, confirmacion) >= 6){

                let datos = {
                    idUsuario: idUsuario,
                    nombres : nombres,
                    email : email,
                    contraseña : contraseña,
                    fechaN : fechaN,
                    codVerif: codVerif,
                    imgPerfil : imgPerfil, 
                    estadoCuenta : estadoCuenta,   
                }
    
                let datosEnvio = JSON.stringify(datos);
                $.ajax({
                    url: "http://127.0.0.1:8080/agregarUsuario",
                    type :"POST",
                    data: datosEnvio,
                    contentType: "application/JSON",
                    datatype: JSON,
                    success: function(respuesta) {
                        alert(respuesta);
                        location.reload();
                    }
                })

            }
        
        }else {
            validacionNull.textContent = "Campos Vacios. Por favor, llena todos los campos.";  
            
        }

    });
})


/*FUNCIONES ADICIONALES */
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

function validarDocumentoDB(documento){
    var valDoc = false;

    $.ajax({
        url: "http://localhost:8080/buscarUsuario/" + documento,
        type: "GET",
        datatype: "JSON",
        async: false,
        success: function(respuesta){
            valDoc = respuesta == '';
        }

    })

    return valDoc;

}


function validarEmailDB(email){
    var usuario = false;

    $.ajax({
        url: "http://localhost:8080/buscarxCorreo/" + email,
        type: "GET",
        datatype: "JSON",
        async: false,
        success: function(respuesta){
 
            usuario = respuesta == '';

        }

    })

    return usuario;

}

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

function validarDocumento(documento){
    return documento.length <= 10;

}


function validarRegistro(documento, email, contraseña, confirmacion){
 
    contador = 0;

    if(validarDocumento(documento)){
        contador++;

        if(validarDocumentoDB(documento)){
            contador++;
            validacionDocumento.textContent = '';
            document.querySelector('#IdUsuario').setAttribute('style', 'border-color: #595b61;');

        } else {

            validacionDocumento.textContent = "Documento ya registrado.";
            document.querySelector('#IdUsuario').setAttribute('style', 'border-color: red;');
        }

    } else {

        validacionDocumento.textContent = "Longitud de Documento Invalida";
        document.querySelector('#IdUsuario').setAttribute('style', 'border-color: red;');

    }

    if(validarEmail(email)){
        contador++;

        if(validarEmailDB(email)){
            contador++;
            validacionCorreo.textContent = '';
            document.querySelector('#Email').setAttribute('style', 'border-color: #595b61;');
            
    
        } else {
            

            validacionCorreo.textContent = "Correo ya registrado.";
            document.querySelector('#Email').setAttribute('style', 'border-color: red;');
            
    
        }

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

