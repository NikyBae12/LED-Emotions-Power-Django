$(document).ready(function(){

    let date = new Date().toISOString().slice(0, 10);
    document.querySelector('#fechaN').setAttribute('max', date);
    let divRegistrar = document.querySelector('#divNull');
    let validacionNull = document.createElement('p');
    divRegistrar.appendChild(validacionNull);

    $('#registrar').on('click', function(){
        
        let documento = $('#documento').val();
        let nombre = $('#nombre').val();
        let email = $('#email').val();
        let contraseña = $('#contraseña').val();
        let confirmacion = $('#confirmacion').val();
        let fechaNa = $('#fechaN').val();


        if (documento != '' && nombre != '' && email != '' && contraseña != '' && confirmacion != '' && fechaNa != ''){
            validacionNull.textContent = "";
    
            if (validarRegistro(documento, email, contraseña, confirmacion) >= 6){
                
                let usuario = {
                    idUsuario: documento,
                    nombres: nombre,
                    email: email,
                    contraseña: confirmacion,
                    fechaN: fechaNa,
                    estadoCuenta: 'Invitado'
        
                }

                let datosUsuario = JSON.stringify(usuario);
                $.ajax({
                    url: "http://localhost:8080/agregarUsuario",
                    type :"POST",
                    data: datosUsuario,
                    contentType: "application/JSON",
                    datatype: JSON,
                    success: function(respuesta) {
                        
                        validarRegistroResponse(respuesta, usuario);
                    }
                })
    
            }

        } else {

            
            validacionNull.textContent = "Campos Vacios. Por favor, llena todos los campos.";

        }
        

    })

})


/*FUNCIONES ADICIONALES */
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

    return contraseña.length >= 8;
 
}

function validarConfirmacion(contraseña, confirmacion){
    return confirmacion == contraseña;

}

function validarDocumento(documento){
    return documento.length <= 10;

}

let divDocumento = document.querySelector('#divDocumento');
    let validacionDocumento = document.createElement("p");
    divDocumento.appendChild(validacionDocumento);

    let divCorreo = document.querySelector('#divCorreo');
    let validacionCorreo = document.createElement("p");
    divCorreo.appendChild(validacionCorreo);

    let divContraseña = document.querySelector('#divContraseña');
    let validacionPass = document.createElement("p");
    divContraseña.appendChild(validacionPass);

    let divConfirmacion = document.querySelector('#divConfirmacion');
    let validacionConf = document.createElement("p");
    divConfirmacion.appendChild(validacionConf);


function validarRegistro(documento, email, contraseña, confirmacion){
 
    contador = 0;

    if(validarDocumento(documento)){
        contador++;

        if(validarDocumentoDB(documento)){
            contador++;
            validacionDocumento.textContent = '';

        } else {
            validacionDocumento.textContent = "Documento ya registrado.";

        }

    } else {
        validacionDocumento.textContent = "Longitud de Documento Invalida";

    }

    if(validarEmail(email)){
        contador++;

        if(validarEmailDB(email)){
            contador++;
            validacionCorreo.textContent = '';
            
    
        } else {
            
            validacionCorreo.textContent = "Correo ya registrado.";
            
    
        }

    } else {
        validacionCorreo.textContent = "Correo no Valido.";

    }

    if (validarContraseña(contraseña)){
        contador++;
        validacionPass.textContent = '';

    } else {
        validacionPass.textContent = "Contraseña Invalida";

    }

    if (validarConfirmacion(contraseña, confirmacion)){
        contador++;
        validacionConf.textContent = '';

    } else {
        validacionConf.textContent = "Las contraseñas no coinciden.";

    }

    return contador;

}


function validarRegistroResponse(response, usuario){
    alert(response);
    if (response == 'Usuario registrado exitosamente.'){
        agregarComprobante(crearComprobante(usuario.estadoCuenta), usuario.idUsuario);
        window.location.replace('http://127.0.0.1:5500/login.html');
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
    }

    return comprobante;

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
        }

    })

}