var emailVal = document.createElement('p');

$('.enviar').on('click', function(){
    document.querySelector('#respuestaCorreo').appendChild(emailVal);

    var email = $('#correo').val();

    validarEmailDB(email);

})



function sendEmail(usuario) {

    document.querySelector('#code').textContent = usuario.codVerif;

    if (usuario.estadoCuenta == 'Administrador'){
        document.querySelector('#adminPlus').textContent = 'Administrador, Este es tu nuevo código de Verificación para ingresar a tu cuenta. ¡No lo Olvides!';
    } else {
        document.querySelector('#adminPlus').textContent = '';
    }

    var elemento = document.querySelector('.correoTemplate');
    var contenido = elemento.innerHTML;

    Email.send({
      SecureToken : "3352f403-1acf-4f17-8624-a1adece5577a",
      To : usuario.email,
      From : "led.emotions.power.official@gmail.com",
      Subject : "Recuperar Contraseña - Cuenta LED: Emotions Power",
      Body : contenido
    }).then(
      message => {
        if (message == 'OK'){
            alert('Correo enviado con éxito.')
            redirigir(usuario.email);
        }else {
            alert(message);
            emailVal.textContent = 'No se pudo enviar el Correo, por favor, intentalo de nuevo.';
        }
      }
    );
}


function validarEmailDB(email){


    if (email != ''){
        emailVal.textContent = '';

        if (validarEmail(email)){
            emailVal.textContent = "";
            buscarEmail(email);

        } else {
            emailVal.textContent = "Correo no Valido.";
    
        }

    } else {
        emailVal.textContent = "Campo Vacio. Por favor, escribe tu correo.";
    }

}


function validarEmail(email){

    var emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    return emailRegex.test(email);

}


function buscarEmail(email){

    $.ajax({
        url: "http://localhost:8080/buscarxCorreo/" + email,
        type: "GET",
        datatype: "JSON",
        async: false,
        success: function(respuesta){

            if(respuesta != ''){
                actualizarCodigo(respuesta);

            } else {
                emailVal.textContent = "Usuario no existente.";
            }

        }

    })
    
}


function generarCodigo(){
    var codigo = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    return codigo;

}


function actualizarCodigo(usuario){
    usuario.codVerif = generarCodigo().toString();
    let actuUsuario = JSON.stringify(usuario);
        
    $.ajax({
        url: "http://127.0.0.1:8080/actualizarUsuario",
        type: "PUT",
        data: actuUsuario,
        contentType: "application/JSON",
        datatype: "JSON",

        success: function(response){
            if (response == 'Usuario actualizado con exito.'){
                sendEmail(usuario);

            } else {
                alert(response);
            }
        }
    })

}

function redirigir(email){

    let dato = {
        email: email
    };

    localStorage.setItem('dato', JSON.stringify(dato));
    window.location.href = 'http://127.0.0.1:5500/CodigoCuenta.html';

    
}