// Obtener la lista de cursos actualizada del servidor
fetch('https://leeresmipasion.com:3305/cursos')
    .then(response => response.json())
    .then(data => {
        const cursos = data.cursos;
        const masCursosContainer = document.getElementById('mas-cursos');
        masCursosContainer.innerHTML = "";

        cursos.forEach(curso => {
            const cursoElement = document.createElement('div');
            cursoElement.textContent = `${curso.nombre}: $${curso.precio}`;
            masCursosContainer.appendChild(cursoElement);
        });
    })
    .catch(error => console.error('Error:', error));