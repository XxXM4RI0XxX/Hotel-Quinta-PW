const BASE_URL = 'https://localhost:8080/api'; //Definición de la URL base para las solicitudes a la API

// Función para evaluar la respuesta del servidor y manejar errores
const apiService = {
    handleResponse: (response) => {
        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.status} ${response.statusText1}`);
        }
        return await response.json();
    },
    //KAN-16: Métodos para visualizar elementos
    getHabitaciones: async () => {//Para obtener todas las habitaciones del catálogo
        const response = await fetch(`${BASE_URL}/habitaciones`);
        return await apiService.handleResponse(response);
    },
    getHabitacionById: async(id) => {//Para obtener una habitación específica por su ID
        const response = await fetch(`${BASE_URL}/habitaciones/${id}`);
        return await apiService.handleResponse(response);
    }

};
export default apiService;