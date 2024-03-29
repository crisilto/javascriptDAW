document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("bookForm");
    const newEditorialInput = document.getElementById("newEditorial");
    const editorialSelect = document.getElementById("editorial");
    const locationsList = document.getElementById("locationsList");
    const successMessage = document.getElementById("successMessage");

    //Creamos un array con las localizaciones
    const locationsArray = ["CALLEXXXXXX"];

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        //Obtenemos los valores del formulario
        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const price = document.getElementById("price").value;
        const selectedEditorial = editorialSelect.options[editorialSelect.selectedIndex].text;

        //Añadimos los datos del nuevo libro al mensaje de éxito una vez se haya añadido exitosamente
        successMessage.textContent = `Libro añadido con éxito. Título: ${title} - Autor: ${author} - Precio: ${price} - Editorial: ${selectedEditorial}`;

        //Mostramos el mensaje (pasa de display none a block)
        successMessage.style.display = "block";

        setTimeout(function(){
            successMessage.style.display = "none";
        }, 5000); //Ocultamos el mensaje después de pasados 5 segundos

        //Limpiamos los elementos del formulario después de agregar el libro
        form.reset();

        //Actualizamos la lista de ubicaciones en caso de que haya habido algún cambio
        updateLocationsList();
    });

    document.getElementById("addLocationBtn").addEventListener("click", function () {
        //Añadimos una nueva ubicación al array y actualizamos la lista
        const newLocation = `CALLEXXXXX ${locationsArray.length + 1}`;
        locationsArray.push(newLocation);
        updateLocationsList();
    });

    document.getElementById("removeLocationBtn").addEventListener("click", function () {
        //Eliminamos la última ubicación del array y actualizamos la lista
        if (locationsArray.length > 1) {
            locationsArray.pop();
            updateLocationsList();
        }
    });

    //Creamos una función para actualizar la lista de ubicaciones
    function updateLocationsList() {
        locationsList.innerHTML = "";
        locationsArray.forEach(function (location) {
            const locationItem = document.createElement("li");
            locationItem.textContent = location;
            locationsList.appendChild(locationItem);
        });
    }

    //Creamos una función para añadir una nueva editorial al desplegable
    window.addNewEditorial = function() {
        const newEditorialValue = newEditorialInput.value.trim();

        //Añadiremos la nueva editorial al desplegable 
        //siempre y cuando no esté vacía y no exista ya
        if (newEditorialValue !== "" && !editorialSelect.querySelector(`option[value="${newEditorialValue}"]`)) {
            const newOption = document.createElement("option");
            newOption.value = newEditorialValue;
            newOption.textContent = newEditorialValue;
            editorialSelect.add(newOption);

            //Seleccionamos la nueva opción añadida
            editorialSelect.value = newEditorialValue;
        }

        //Limpiamos el cuadro de texto de la nueva editorial
        newEditorialInput.value = "";
    };
});