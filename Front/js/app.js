// Estos const son seleccionados desde el css/tailwind.min.css para ser motificados en este archivo
const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');
const btnGuardar = document.querySelector('#btnGuardar');
/*                                                                                                                                                                                                                                                                    */const palabrasProhibidas = ['tonto','tonta','tontillo','tontilla','idiota','baboso','babosa','bellaco','bellaca','carajo','caraja', 'estupido', 'estupida', 'estúpido', 'estúpida','cago','cagar','cagó','culo','puta','puto','mierda','mierdoso','mierdosa','malparido','malparida','hijueputa','jueputa','lameculos','teta','pene','prostituta','prostituto', 'prostiputigolfa','gilipollas','imbecil','imbécil','cabrón','cabron','cabrona','subnormal','capullo','chupa','huevon','huevón','huevos','huebos','webos','lame','traga','sexo','coito','culiar','culear','follar','coger','cojer','bastardo','bastarda','picha','mae','nalgas','vagina','vajina','perra','zorra','fuck','dick','suck'];

// Ejecuta un evento cada vez que se presiona el boton de buscar clima, el cual se encarga de buscar el clima
window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
    // Agrega un evento para validar la cédula cuando se modifica su valor
    const cedulaInput = document.querySelector('#cedula');
    cedulaInput.addEventListener('input', validarCedula);
})

// Es la función encargada de realizar la lógica para buscar el clima
function buscarClima (e) {
    e.preventDefault();
    quitarBoton();
    console.log(e);
    // Validar
    const ciudad = document.querySelector('#ciudad').value; // Captura el valor  insertado en el campo "Ciudad"
    const pais = document.querySelector('#pais').value; // Captura el valor insertado en el canpo "Pais"
    const nombre = document.querySelector('#nombre').value; // Captura el valor  insertado en el campo "Nombre"
    const cedula = document.querySelector('#cedula').value; // Captura el valor insertado en el canpo "Cedula"

    // Validación de si todos los campos están llenos 
    if(ciudad === '' || pais === '' || nombre === '' || cedula === ''){ 
        // there was a mistake
        mostrarError('Todos los campos son obligatorios'); // Llama a la función "mostrarError" y se envia como parámetro el mensaje de error
        return;
    }

    // Validación de malas palabras
    if (contieneMalaPalabra(ciudad) || contieneMalaPalabra(nombre)) {
        mostrarError('No se permite el vocabulario inadecuado.');
        return;
    }

    //consultariamos la API
    consultarAPI(ciudad, pais); // Llama a la función "consultarAPI" y le envía por parámetros la ciudad y país
}

// En caso de que los campos de ciudad y país esten vacíos, se ejecuta esta función
function mostrarError(mensaje) {
    const alerta = document.querySelector('.bg-red-100');

    //Create alert
    if(!alerta){
        const alerta = document.createElement('div');
        alerta.classList.add('bg-red-200', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');
        alerta.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block">${mensaje}</span>
        `;
        container.appendChild(alerta);
        
        setTimeout(() => {
            alerta.remove();
        }, 3500);
    }

    // Obtener el elemento al que deseas desplazarte
    const scrollTarget = document.getElementById('scrollTarget');

    // Calcular la posición de desplazamiento
    const scrollPosition = scrollTarget.offsetTop;

    // Realizar el desplazamiento
    window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'  // Hace que el desplazamiento sea suave
    });
    
}


function mostrarValid(mensaje) {
    const alerta = document.querySelector('.bg-green-100');

    //Create alert
    if(!alerta){
        const alerta = document.createElement('div');
        alerta.classList.add('bg-green-100', 'border-green-400', 'text-green-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');
        alerta.innerHTML = `
            <strong class="font-bold">Guardado!</strong>
            <span class="block">${mensaje}</span>
        `;
        container.appendChild(alerta);
        
        setTimeout(() => {
            alerta.remove();
        }, 3500);
    }

    // Obtener el elemento al que deseas desplazarte
    const scrollTarget = document.getElementById('scrollTarget');

    // Calcular la posición de desplazamiento
    const scrollPosition = scrollTarget.offsetTop;

    // Realizar el desplazamiento
    window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'  // Hace que el desplazamiento sea suave
    });
    
}


// Función que se encarga de convertir de Kelvin a Centigrados
function kelvinACentigrados(grados) {
    return parseInt(grados - 273.15);
}

// Esta es la función encarga de consumir la API donde se obtiene el clima
function consultarAPI (ciudad, pais) {
    const appId = 'aaf61516cc3dd72f5855752ba2e2c139'; // La API necesita que por medio de la URL se le envíe un id como parámetro
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`; // La URL a la cual se le hace la consulta con los parámetros requeridos

    Spinner(); // Show a charger spinner

    // Se realiza la consulta oficial por medio del 'fetch'
    fetch(url)
        .then(respuesta => respuesta.json()) // Recibe la respuesta en formato json
        .then(datos => { 
            limpiarHTML(); //Clean HTML
            if(datos.cod === "404"){ // Manejo de errores en caso de que la ciudad no exista
                mostrarError('Ciudad no encontrada'); // Llama a la función mostrar error y se le pasa como parámetro el mensaje 
                return;
            }
            //Print the HTML answer
            
mostrarClima(datos); // Se llama a la función mostrarClima con los datos substraidos de la consulta  como parámetro
        })
}

// Función que se encarga de pintar en pantalla los resultados que fueron consumidos de la API
function mostrarClima(datos){
    const { name, main: { temp, temp_max, temp_min } } = datos;
    const centigrados = kelvinACentigrados(temp);
    const max = kelvinACentigrados(temp_max);
    const min = kelvinACentigrados(temp_min);
    const actual = document.createElement('p');

     const nombreCiudad = document.createElement('p');
     nombreCiudad.textContent = `El clima en ${name}`;
     nombreCiudad.classList.add('font_bold', 'text-2XL');

    actual.innerHTML = `${centigrados} &#8451`;
    actual.classList.add('font-bold', 'text-6xl');

    const tempMaxima = document.createElement('p');
    tempMaxima.innerHTM = `Max: ${max} &#8451`;
    tempMaxima.classList.add('text-xl');

    const tempMinima = document.createElement('p');
    tempMinima.innerHTML = `Min: ${min} &#8451`;
    tempMinima.classList.add('text-xl');

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-black');
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMaxima);
    resultadoDiv.appendChild(tempMinima);


    resultado.appendChild(resultadoDiv);

    const ciudad = document.querySelector('#ciudad').value; // Captura el valor  insertado en el campo "Ciudad"
    const pais = document.querySelector('#pais').value;

    // Mostrar botón Guardar
    const botonGuardar = document.createElement('input');
    botonGuardar.classList.add('climax');
    botonGuardar.type = "button";
    botonGuardar.value = "Guardar Clima";
    botonGuardar.onclick = function() {

        enviarDatosAPI(kelvinACentigrados(temp));
        //consultarDatosAPI();
    }

    btnGuardar.appendChild(botonGuardar);

    // Obtener el elemento al que deseas desplazarte
    const scrollTarget = document.getElementById('scrollTarget');

    // Calcular la posición de desplazamiento
    const scrollPosition = scrollTarget.offsetTop;

    // Realizar el desplazamiento
    window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'  // Hace que el desplazamiento sea suave
    });
}

// Esta función se encarga de validar que solo se ingresen números en el campo "cedula"
function validarCedula() {
    const cedulaInput = document.querySelector('#cedula');
    const valorCedula = cedulaInput.value;

    // Utiliza una expresión regular para verificar si solo contiene números
    if (!/^\d*$/.test(valorCedula)) {
        // Si no son solo números, muestra un mensaje de error
        mostrarError('El campo de la cédula sólo debe contener números.');
        // Limpia el valor para dejar solo los números ingresados
        cedulaInput.value = valorCedula.replace(/\D/g, '');
    }
}

function contieneMalaPalabra(texto) {
    // Convierte el texto a minúsculas para hacer la comparación insensible a mayúsculas
    const textoMinusculas = texto.toLowerCase();

    // Verifica si el texto contiene alguna palabra prohibida
    return palabrasProhibidas.some(palabra => textoMinusculas.includes(palabra));
}
//
////
//////
////////
function enviarDatosAPI(temp){
    
    //
    //Acá deberás aplicar la lógica necesaria para desarrollar
    //el código que consuma la función POST
    //

    mostrarValid('Los datos se han guardado correctamente.');
    quitarBoton();

}
////////
//////
////
//

function quitarBoton() {
    while(btnGuardar.firstChild) {
        btnGuardar.removeChild(btnGuardar.firstChild);
    }
}


// Se encarga de limpiar el HTML, cada vez que se presiona el botón "Obtener Clima" esta función elimina los campos llenos y resultados de la consulta anterior, en caso de que hayan
function limpiarHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function Spinner() {
    limpiarHTML();
    
    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');

    divSpinner.innerHTML = `
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>    
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
  
    `;
    resultado.appendChild(divSpinner);
}