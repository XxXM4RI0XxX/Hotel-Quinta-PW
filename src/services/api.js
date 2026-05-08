// src/services/api.js

const BASE_URL = 'http://localhost:8080/api'; // URL para las habitaciones (próximamente)
const USERS_URL = 'http://localhost:8080/users'; // URL para el backend de Alejandro

const apiService = {
    // Función mejorada para evitar crashes con respuestas de texto plano
    handleResponse: async (response) => {
        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.status} ${response.statusText}`);
        }
        const text = await response.text();
        return text ? JSON.parse(text) : {}; // Si hay texto, lo hace JSON. Si no, devuelve objeto vacío.
    },

    // ==========================================
    // KAN-16 y 17: MÉTODOS DE HABITACIONES
    // ==========================================
    getHabitaciones: async () => {
        const response = await fetch(`${BASE_URL}/habitaciones`);
        return await apiService.handleResponse(response);
    },
    getHabitacionById: async(id) => {
        const response = await fetch(`${BASE_URL}/habitaciones/${id}`);
        return await apiService.handleResponse(response);
    },
    updateHabitacion: async (id, datosActualizados) => {
        const response = await fetch(`${BASE_URL}/habitaciones/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datosActualizados)
        });
        return await apiService.handleResponse(response);
    },
    deleteHabitacion: async (id) => {
        const response = await fetch(`${BASE_URL}/habitaciones/${id}`, {
            method: 'DELETE' 
        });
        return await apiService.handleResponse(response);
    },

    // ==========================================
    // MÓDULO DE USUARIOS (La parte de Alejandro)
    // ==========================================
    
    // Método para crear un nuevo usuario (POST)
    registrarUsuario: async (datosUsuario) => {
        const response = await fetch(USERS_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datosUsuario) // Se convierte el formulario de React a JSON
        });
        return await apiService.handleResponse(response);
    },

    // Método para iniciar sesión
    loginUsuario: async (credenciales) => {
        const response = await fetch(`${USERS_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credenciales)
        });
        return await apiService.handleResponse(response);
    },

    // Método para pedir la lista de todos los usuarios (GET)
    getUsuarios: async () => {
        const response = await fetch(USERS_URL);
        return await apiService.handleResponse(response);
    }
};

export default apiService;