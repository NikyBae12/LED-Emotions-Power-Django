let tablaComprobantes = document.querySelector('#tablaBody');
tablaComprobantes.innerHTML = '';
let filtroId = document.querySelector('#id');
let filtroNombre = document.querySelector('#nombre');
let filtroFecha = document.querySelector('#fecha');
filtroId.addEventListener('input', listarComprobantes);
filtroNombre.addEventListener('input', listarComprobantes);
filtroFecha.addEventListener('input', filtrarTabla);

$(document).ready(function(){
    let date = new Date().toISOString().slice(0, 10);
    filtroFecha.setAttribute('max', date);

    // METODO LISTAR    

    $.ajax({
        url : "http://localhost:8080/listarComprobantes",
        type : "GET",
        async: false,
        datatype : "JSON",
        success : function (respuesta){

            for (let i = 0; i < respuesta.length; i++) {
                tablaComprobantes.innerHTML += '<tr><td>' + respuesta[i].idComprobante +
                '</td><td>' + respuesta[i].idUsuario +
                '</td><td>' + respuesta[i].nombres + 
                '</td><td>' + respuesta[i].estadoCuenta + 
                '</td><td>' + respuesta[i].fechaActu + 
                '</td><td>' + respuesta[i].valor +
                '</td><td>' + respuesta[i].factura + 
                '</td><td>' + '<input type="button" class="btnEliminar" id="' + respuesta[i].idComprobante + '" value="Eliminar">' + 
                '</td></tr>';
                
            }

        }
    }); 

    $('.btnEliminar').on('click', function(){
        
        eliminarComprobante(this);
        
        
    });

})

function eliminarComprobante(boton){

    let id = boton.getAttribute('id');

    if (confirm("¿Estás seguro de eliminar este registro?")) {
        $.ajax({
            url: "http://127.0.0.1:8080/eliminarComprobante/" + id,
            type: "DELETE",
            datatype: "JSON",
            success: function (respuesta) {
                alert(respuesta);
                location.reload();
            }
        });
    } else {
        alert('No se elimino el Comprobante.')

    }

}

function listarComprobantes(){
    let valId = filtroId.value;
    let valNombre = filtroNombre.value;
    
    for (let i = 0; i < tablaComprobantes.rows.length; i++) {
        var fila = tablaComprobantes.rows[i];

        var id = fila.cells[1].textContent.toLowerCase();
        var correo = fila.cells[2].textContent.toLowerCase();

        if (id.includes(valId) && correo.includes(valNombre)){
            fila.style.display = '';

        } else {
            fila.style.display = 'none';

        }
        
        
    }

    

}


function filtrarTabla() {
    let fecha = document.querySelector('#fecha').value;
    console.log(fecha)

    const filas = tablaComprobantes.getElementsByTagName('tr');
  
    for (let i = 1; i < filas.length; i++) {
      const celdaFecha = filas[i].getElementsByTagName('td')[4];
  
      const fechaTabla = celdaFecha.textContent.trim();
      console.log(fechaTabla)
  
      if (fechaTabla >= fecha) {
        filas[i].style.display = ''; // Mostrar la fila
      } else {
        filas[i].style.display = 'none'; // Ocultar la fila
      }
    }
  }

function sortTable(columnIndex){
    const table = document.getElementById("tablaComprobantes");
    const tbody = table.getElementsByTagName("tbody")[0];
    const rows = Array.from(tbody.getElementsByTagName("tr"));

    rows.sort(function(a, b) {
        const cellA = a.getElementsByTagName("td")[columnIndex];
        const cellB = b.getElementsByTagName("td")[columnIndex];
        return cellA.textContent.localeCompare(cellB.textContent);
    });

    rows.forEach(function(row) {
        tbody.appendChild(row);
  });

}