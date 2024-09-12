let mal = document.querySelectorAll('.mal');
let intentos = 4;

const evaluar = () => {
    intentos = intentos - 1;
    alert('te quedan ' + intentos + ' intentos');
	repaso();
}

for(let i = 0; i < 7; i++){
	mal[i].addEventListener('click', evaluar);
}

function repaso(){
    if(intentos < 1){
        alert('debes repasar!');
        window.history.back();
    }
}