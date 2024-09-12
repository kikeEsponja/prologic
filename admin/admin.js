const form = document.getElementById('registroForm');

form.addEventListener('submit', async (event) =>{
    event.preventDefault();
    const formData = new FormData(form);
    const requestData = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('https://leeresmipasion.com:3305/registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });
        if(!response.ok){
            console.log("vamos por acá");
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }

        alert('Producto registrado correctamente');
        //form.restet();
        window.location.href = './todo.html';

    }catch (error){
        console.error('Error al registrar producto', error.message);
        alert('producto existente');
    }
});

/*const masCursosContainer = document.getElementById('mas-cursos');

masCursosContainer.innerHTML = "";

cursos.forEach(curso => {
    const cursoElement = document.createElement('div');
    cursoElement.textContent = `${curso.nombre}: ${curso.precio}`;
    masCursosContainer.appendChild(cursoElement);
});*/