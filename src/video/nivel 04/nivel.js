let mal1 = document.getElementById('mal1');
let mal2 = document.getElementById('mal2');
let mal3 = document.getElementById('mal3');
let mal4 = document.getElementById('mal4');
let intentos = 2;

const evaluar = () => {
    intentos = intentos - 1;
    alert('te quedan ' + intentos + ' intentos');
	repaso();
}

mal1.addEventListener('click', evaluar);
mal2.addEventListener('click', evaluar);
mal3.addEventListener('click', evaluar);
mal4.addEventListener('click', evaluar);

function repaso(){
    if(intentos < 1){
        alert('debes repasar!');
        window.history.back();
    }
}