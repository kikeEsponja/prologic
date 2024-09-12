var spanFecha = document.getElementById('usuarioFecha');
var fechaActual = new Date();

var dia = fechaActual.getDate();
var mes = fechaActual.getMonth() + 1;
var year = fechaActual.getFullYear();

var fechaFormato = dia + '/' + mes + '/' + year;

spanFecha.textContent = fechaFormato;

function obtenerCookie(nombre){
	let nombreEQ = nombre + '=';
	let ca = document.cookie.split(';');
	for(let i = 0; i < ca.length; i++){
    	let c = ca[i];
    	while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    	if(c.indexOf(nombreEQ) == 0) return c.substring(nombreEQ.length, c.length);
    }
	return null;
}

document.addEventListener('DOMContentLoaded', () => {
	const nombre = document.getElementById('usuarioNombre');
	const nombreUsuario = obtenerCookie('nombreUsuario');
	if(nombreUsuario){
    	nombre.textContent = nombreUsuario;
    }else{
    	nombreUsuario.textContent = 'invitado'
    }
});

const cerrarSesion = () => {
	const main = document.getElementById('botones');
	const buttonSi = document.createElement('button');
	const buttonNo = document.createElement('button');
	buttonSi.textContent = 'si';
	buttonNo.textContent = 'no';
	buttonSi.classList.add('btn');
	buttonNo.classList.add('btn');
	buttonSi.classList.add('btn-danger');
	buttonNo.classList.add('btn-success');
	buttonSi.classList.add('cerrarsesion');
	buttonNo.classList.add('cerrarsesion');
	//buttonSi.style.width = '5%';
	//buttonNo.style.width = '5%';
	main.appendChild(buttonSi);
	main.appendChild(buttonNo);
	if(buttonSi.addEventListener('click', ()=>{
    	window.location.href = '../../index.html';
    })) {
    }else(buttonNo.addEventListener('click', () => {
    	buttonSi.style.display = 'none';
    	buttonNo.style.display = 'none';
    }));
}

const irCursos = document.querySelectorAll('.card-img-top');

irCursos.forEach(curso =>{
	curso.addEventListener('click', () => {
    	const id = curso.id;
    	const url = `./${id.split('-')[1]}.html`;
    	window.location.href = url;
    });
});

const goBack = () => {
	window.history.back();
}