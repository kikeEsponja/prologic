var nombre = prompt('ingresa nombre');
var calificacion = prompt('ingresa calificacion');

if(calificacion < 10 && calificacion >= 0){
    alert('has reprobado');
}else if(calificacion >= 10 && calificacion < 19){
    alert('has aprobado');
}else if(calificacion == 19 || calificacion == 20){
    alert('eres un genio');
}else{
    alert('calificación inválida');
}