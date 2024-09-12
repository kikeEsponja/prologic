        async function cargarRecetas() {
            /*const loader = document.getElementById('loader');
            loader.style.display = 'block';*/

            const response = await fetch('https://leeresmipasion.com:1048/api/deswebs');
            //const response = await fetch('http://localhost:1048/api/deswebs');
            const deswebs = await response.json();
            const deswebsContainer = document.getElementById('deswebsContainer');

            //loader.style.display = 'none';

            deswebs.forEach(desweb => {
                if(desweb.title === undefined){
                    console.log("hay algún undefined");
                }else{
                    const deswebElement = document.createElement('div');
                    deswebElement.classList.add('desweb')
                    deswebElement.innerHTML = `
                        <img src="${desweb.cover}" alt="${desweb.title}" class="deswebImg" style="cursor: pointer;">
                        <div class="desweb-text">
                            <h4>${desweb.title}</h4>
                            <p><strong>Nivel:</strong> ${desweb.nivel}</p>
                        </div>
                    `;
    
                    deswebElement.addEventListener('click', () => {
                        localStorage.setItem('videoDetails', JSON.stringify(desweb));
                        window.location.href = `./itemDetail.html?id=${desweb.title}`;
                    });
                    deswebsContainer.appendChild(deswebElement);                    
                }
        });
    }

        // Función para cargar las recetas recién agregadas
        async function cargarRecetasRecientes() {
            // Lógica para obtener las recetas recién agregadas y mostrarlas en el contenedor correspondiente
        }

        // Cuando la página se carga, cargar las recetas
        window.onload = function() {
            cargarRecetas();
            cargarRecetasRecientes();
        };

        async function searchDeswebs() {
            // Obtener el valor del input de búsqueda
            const query = document.getElementById('searchInput').value;
            
            try {
                // Realizar una solicitud GET al endpoint de búsqueda del backend
                const response = await fetch(`https://leeresmipasion.com:1045/api/deswebs?query=${encodeURIComponent(query)}`);
                //const response = await fetch(`http://localhost:1048/api/deswebs?query=${encodeURIComponent(query)}`);
                // Verificar si la solicitud fue exitosa
                if (response.ok) {
                    // Convertir la respuesta a formato JSON
                    const deswebs = await response.json();

                    // Llamar a una función para mostrar las recetas en el frontend
                    displayDeswebs(deswebs);
                } else {
                    // Manejar el caso de error
                    console.error('Error al buscar recetas:', response.statusText);
                }
            } catch (error) {
                console.error('Error al buscar recetas:', error);
            }
        }

        // Funcin para mostrar las recetas en el frontend
        function displayDeswebs(deswebs) {
            const deswebsContainer = document.getElementById('deswebsContainer');
            deswebsContainer.innerHTML = ''; // Limpiar el contenedor de recetas antes de agregar nuevas

            // Iterar sobre todas las recetas y agregarlas al contenedor
            deswebs.forEach(desweb => {
                const deswebElement = document.createElement('div');
                deswebElement.classList.add('desweb');
                deswebElement.innerHTML = `
                    <h4>${desweb.title}</h4>
                    <p>Dificultad: ${desweb.nivel}</p>
                    <img src="${desweb.cover}" alt="${desweb.title}" class="deswebImg">`;

                deswebElement.addEventListener('click', () => {
                    localStorage.setItem('deswebDetails', JSON.stringify(desweb));
                    window.location.href = `./HTML.html?id=${desweb.id}`;
                });
                deswebsContainer.appendChild(deswebElement);
            });
        }

const goBack = () => {
	window.history.back();
}