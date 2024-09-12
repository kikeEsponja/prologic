        // Función para cargar las recetas desde la API
        async function cargarRecetas() {
            /*const loader = document.getElementById('loader');
            loader.style.display = 'block';*/

            const response = await fetch('https://leeresmipasion.com:1048/api/deswebs');
            const deswebs = await response.json();
            const deswebsContainer = document.getElementById('deswebsContainer');

            //loader.style.display = 'none';

            deswebs.forEach(desweb => {
                if(desweb.titlecomputacion == undefined){
                    console.log("hay un undefined");
                }else{
                    const deswebElement = document.createElement('div');
                    deswebElement.classList.add('desweb')
                    deswebElement.innerHTML = `
                        <h4>${desweb.titlecomputacion}</h4>
                        <img src="${desweb.covercomputacion}" alt="${desweb.titlecomputacion}" class="deswebImg" style="cursor:pointer;">
                        <p><strong>Nivel:</strong> ${desweb.nivelcomputacion}</p>
                    `;
    
                    deswebElement.addEventListener('click', () => {
                        localStorage.setItem('videoDetails', JSON.stringify(desweb));
                        window.location.href = `./itemDetailComputacion.html?id=${desweb.titlecomputacion}`;
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

        // Función para mostrar las recetas en el frontend
        function displayDeswebs(deswebs) {
            const deswebsContainer = document.getElementById('deswebsContainer');
            deswebsContainer.innerHTML = ''; // Limpiar el contenedor de recetas antes de agregar nuevas

            // Iterar sobre todas las recetas y agregarlas al contenedor
            deswebs.forEach(desweb => {
                const deswebElement = document.createElement('div');
                deswebElement.classList.add('desweb');
                deswebElement.innerHTML = `
                    <h4>${desweb.titlecomputacion}</h4>
                    <p>Dificultad: ${desweb.nivelcomputacion}</p>
                    <img src="${desweb.covercomputacion}" alt="${desweb.titlecomputacion}" class="deswebImg" style="cursor:pointer;">
                `;

                deswebElement.addEventListener('click', () => {
                    localStorage.setItem('deswebDetails', JSON.stringify(desweb));
                    window.location.href = `./computacion.html?id=${desweb.id}`;
                });
                deswebsContainer.appendChild(deswebElement);
            });
        }

const goBack = () => {
	window.history.back();
}