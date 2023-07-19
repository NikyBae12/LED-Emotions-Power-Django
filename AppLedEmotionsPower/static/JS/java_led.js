var overlay = document.getElementById('overlay'),
	popup = document.getElementById('popup'),
	btnCerrarPopup = document.getElementById('btn-cerrar-popup');


//Primer POPUP

window.addEventListener('load', function() {
// El codigo de la alerta.

	overlay.classList.add('active');
	popup.classList.add('active');
});

btnCerrarPopup.addEventListener('click', function() {
// El codigo de la alerta.

	overlay.classList.remove('active');
	popup.classList.remove('active');
});

