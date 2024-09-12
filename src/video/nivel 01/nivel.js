let intentos = 1;

document.getElementById('miboton').addEventListener('contextmenu', (event) =>{
    event.preventDefault();
    alert('FELICIDADES!!');
});

document.getElementById('miboton').addEventListener('click', (event) =>{
	if(event.button === 0){
    	intentos = intentos - 1;
    	alert('te quedan ' + intentos + ' intentos');
    	repaso();
    }
});

function repaso(){
    if(intentos < 1){
    	alert('debes repasar!');
    	window.history.back();
    }
}