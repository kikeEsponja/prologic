let evaluacion = document.querySelectorAll('.evaluacion');
let intentos = 2;
let etiqueta = document.getElementById('etiqueta');
let boton = document.getElementById('boton');
const modal = document.getElementById('evaluar');
let confirmar = document.getElementById('confirmar');

modal.addEventListener('click', ()=>{
	if(etiqueta.value === '<img src="./perro.jpg">' && boton.value === '<img src="../imagen_principal.jpg">'){
        confirmar.style.display = 'flex';
    }else{
	    repaso();
	    intentos = intentos - 1;
        alert('te quedan ' + intentos + ' intentos');
    }
});

function repaso(){
    if(intentos < 1){
        alert('debes repasar!');
        window.history.back();
    }
}