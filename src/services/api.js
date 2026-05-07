const BASE_URL = 'https://localhost:8080/api'; //Definición de la URL base para las solicitudes a la API

// Función para evaluar la respuesta del servidor y manejar errores
const apiService = {
    handleResponse: (response) => {
        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.status} ${response.statusText1}`);
        }
        return await response.json();
    }
    //Aquí se agregarán las funciones y métodos para los siguientes tickets, KAN-16 y KAN-17

};
export default apiService;