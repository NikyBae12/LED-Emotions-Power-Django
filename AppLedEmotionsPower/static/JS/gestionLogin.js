$(document).ready(function(){

    $('.login').on('click', function(){

        let correo = $('#correo').val();
        let contraseña = $('#contraseña').val();

        validarDatos(correo, contraseña);

        if (!$('#respuesta').html()){
            
            $.ajax({
                url: "http://localhost:8080/buscarxCorreo/" + correo,
                type: "GET",
                datatype: "JSON",
                success: function(respuesta){
                    validarLogIn(respuesta, contraseña);

                }

            })

        }

    })

})



/*FUNCIONES ADICIONALES */

function validarEmail(email){

    var emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    return emailRegex.test(email);

}

function validarNull(email, contraseña){

    return !email == '' && !contraseña == '';

}

function validarDatos(email, contraseña){

    let campoVal = document.querySelector('#respuesta');

    if (validarNull(email, contraseña)){
        campoVal.innerHTML = '';

        if(validarEmail(email)){
            campoVal.innerHTML = '';
            

        } else {
            campoVal.innerHTML = '';
            let respuesta = document.createElement("p");
            respuesta.textContent = "Correo no valido.";
            campoVal.appendChild(respuesta);
            

        }

    } else {
        campoVal.innerHTML = '';
        let respuesta = document.createElement("p");
        respuesta.textContent = "Campos Vacios. Por favor, llena todos los campos.";
        campoVal.appendChild(respuesta);

    }

}

function validarLogIn(usuario, pass){
    let campoVal = document.querySelector('#respuesta');

    if (usuario != ''){

        if (usuario.contraseña == pass){
            
            if (usuario.estadoCuenta == 'Administrador'){
                crearCampoCodigo(usuario, campoVal);
                
            } else {
                window.location.replace("http://127.0.0.1:5500/principalUser.html");

            }

        } else {
            campoVal.innerHTML = '';
            let respuesta = document.createElement("p");
            respuesta.textContent = "Contraseña Incorrecta.";
            campoVal.appendChild(respuesta);

        }

    } else {
        campoVal.innerHTML = '';
        let respuesta = document.createElement("p");
        respuesta.textContent = "Usuario no existente.";
        campoVal.appendChild(respuesta);

    }

}

function crearCampoCodigo(usuario, campoVali){
    let btnSpace = document.querySelector('#btnInicio');
    btnSpace.innerHTML = '';
    let btnInicio = document.createElement('input');
    btnInicio.setAttribute('class', 'verifCode');
    btnInicio.setAttribute('type', 'button');
    btnInicio.setAttribute('value', 'Verificar Código');
    btnSpace.appendChild(btnInicio);
    
    let codigoVerif = document.querySelector('#codeSpace');
    codigoVerif.innerHTML = '';
    let inputCode = document.createElement('input');
    inputCode.setAttribute('id', 'codigoVer');
    inputCode.setAttribute('type', 'text');
    inputCode.setAttribute('placeholder', 'Código de Verificación')
    codigoVerif.appendChild(inputCode);

    $('.verifCode').on('click', function(){
        validarCodigo(usuario, inputCode, campoVali);

    })

}



function validarCodigo(usuario, inputCode, campoVal){
    let codigoVerif = inputCode.value;
    
    if (codigoVerif == usuario.codVerif){
        window.location.replace('http://127.0.0.1:5500/principalAdmin.html');

    } else {
        campoVal.innerHTML = '';
        let respuesta = document.createElement("p");
        respuesta.textContent = "Código de Verificación Incorrecto.";
        campoVal.appendChild(respuesta);
        
    }

}