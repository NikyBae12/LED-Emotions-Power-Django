var codeVal = document.createElement('p');

$('.enviarCode').on('click', function(){

    document.querySelector('#respuestaCode').appendChild(codeVal);
    const datosRecibidos = JSON.parse(window.localStorage.getItem('dato'));
    let codigo = $('#codigo').val();

    if (codigo != ''){
        buscarEmail(datosRecibidos.email, codigo);
        
    } else {
        codeVal.textContent = 'Campo Vacio. Por favor, escribe el Código enviado a tu correo.';

    }

})


function buscarEmail(email, codigo){

    $.ajax({
        url: "http://localhost:8080/buscarxCorreo/" + email,
        type: "GET",
        datatype: "JSON",
        async: false,
        success: function(respuesta){

            if(respuesta != ''){
                verificarCodigo(respuesta, codigo);

            }

        }

    })
    
}

function verificarCodigo(usuario, codigo){

    if (usuario.codVerif == codigo){

        let dato = {
            email: usuario.email
        };
    
        localStorage.setItem('dato', JSON.stringify(dato));
        window.location.replace('http://127.0.0.1:5500/cambiarContrase%C3%B1a.html');

    } else {
        codeVal.textContent = 'Código Incorrecto.';
        
    }
    
}