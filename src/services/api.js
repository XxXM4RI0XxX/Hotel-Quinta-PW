const BASE_URL = 'http://localhost:8080/api'; //Definición de la URL base para las solicitudes a la API

// Función para evaluar la respuesta del servidor y manejar errores
const apiService = {
    handleResponse: async (response) => {
        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.status} ${response.statusText}`);
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
    },
    //KAN-17: Métodos para modificar y quitar elementos
    updateHabitacion: async (id, datosActualizados) => {
        const response = await fetch(`${BASE_URL}/habitaciones/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datosActualizados)
        });
        return await apiService.handleResponse(response);
    },
    //Método para eliminar un registro de la base de datos
    deleteHabitacion: async (id) => {
        const response = await fetch(`${BASE_URL}/habitaciones/${id}`, {
            method: 'DELETE' // Se especifica el método HTTP DELETE para eliminar el recurso
        });
        return await apiService.handleResponse(response);
    }
};
export default apiService;