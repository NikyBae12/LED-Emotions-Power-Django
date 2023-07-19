var passVal = document.createElement('p');

$('.cambiar').on('click', function(){

    document.querySelector('#respuestaCambio').appendChild(passVal);
    const datosRecibidos = JSON.parse(window.localStorage.getItem('dato'));
    let contraseña = $('#contraseña').val();
    let confirmacion = $('#confirmacion').val();

    if (contraseña != '' && confirmacion != ''){
        verificarContraseñas(datosRecibidos.email, contraseña, confirmacion);
        
    } else {
        passVal.textContent = 'Campo Vacios. Por favor, llena todos los campos.';

    }

})

function verificarContraseñas(email, contraseña, confirmacion){

    if (contraseña.length >= 8){

        if(confirmacion == contraseña){
            passVal.textContent = '';
            buscarEmail(email, confirmacion);

        } else {
            passVal.textContent = 'Las Contraseñas no coinciden.';
        }

    } else {
        passVal.textContent = 'Contraseña Invalida. Min. 8 Caracteres.';
    }

}

function buscarEmail(email, contraseña){

    $.ajax({
        url: "http://localhost:8080/buscarxCorreo/" + email,
        type: "GET",
        datatype: "JSON",
        async: false,
        success: function(respuesta){

            if(respuesta != ''){
                actualizarContraseña(respuesta, contraseña);

            }

        }

    })
    
}


function actualizarContraseña(usuario, contraseña){
    usuario.contraseña = contraseña;
    let actuUsuario = JSON.stringify(usuario);
        
    $.ajax({
        url: "http://127.0.0.1:8080/actualizarUsuario",
        type: "PUT",
        data: actuUsuario,
        contentType: "application/JSON",
        datatype: "JSON",

        success: function(response){
            if (response == 'Usuario actualizado con exito.'){
                alert('Contraseña Recuperada con éxito.');
                localStorage.setItem('dato', '');
                window.location.href = 'http://127.0.0.1:5500/login.html';

            } else {
                alert(response);
            }
        }
    })

}