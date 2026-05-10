import { useState, useEffect } from 'react';

const SESSION_KEY = 'hotel_quinta_session';
const SESSION_EXPIRY_DAYS = 7;

const useAuthPersistence = () => {
    const [usuarioLogueado, setUsuarioLogueado] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Función para limpiar sesiones corruptas
    const clearCorruptedSessions = () => {
        try {
            const sessionData = localStorage.getItem(SESSION_KEY);
            if (sessionData) {
                JSON.parse(sessionData); // Intentar parsear para verificar si es válido
            }
        } catch (error) {
            // Si no se puede parsear, está corrupto
            console.warn('Sesión corrupta detectada, limpiando...');
            localStorage.removeItem(SESSION_KEY);
        }
    };

    // Función para guardar la sesión en localStorage
    const saveSession = (userData) => {
        try {
            const sessionData = {
                user: userData,
                loginTime: Date.now(),
                lastActivity: Date.now()
            };
            localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
            setUsuarioLogueado(userData);
        } catch (error) {
            console.error('Error saving session:', error);
            // Si hay error guardando, al menos setea el estado
            setUsuarioLogueado(userData);
        }
    };

    // Función para limpiar la sesión
    const clearSession = () => {
        localStorage.removeItem(SESSION_KEY);
        setUsuarioLogueado(null);
    };

    // Función para actualizar la última actividad
    const updateLastActivity = () => {
        try {
            const sessionData = localStorage.getItem(SESSION_KEY);
            if (!sessionData) return;

            const parsed = JSON.parse(sessionData);
            parsed.lastActivity = Date.now();
            localStorage.setItem(SESSION_KEY, JSON.stringify(parsed));
        } catch (error) {
            console.error('Error updating last activity:', error);
        }
    };

    // Función para verificar si la sesión ha expirado
    const isSessionExpired = (loginTime) => {
        const now = Date.now();
        const expiryTime = loginTime + (SESSION_EXPIRY_DAYS * 24 * 60 * 60 * 1000);
        return now > expiryTime;
    };

    // Función para obtener información de la sesión
    const getSessionInfo = () => {
        const sessionData = localStorage.getItem(SESSION_KEY);
        if (!sessionData || !usuarioLogueado) return null;

        try {
            const parsed = JSON.parse(sessionData);
            const now = Date.now();
            const loginTime = parsed.loginTime;
            const lastActivity = parsed.lastActivity || loginTime;

            // Calcular tiempo restante hasta expiración (7 días desde login)
            const expiryTime = loginTime + (SESSION_EXPIRY_DAYS * 24 * 60 * 60 * 1000);
            const timeRemaining = Math.max(0, expiryTime - now);

            // Calcular días restantes
            const daysRemaining = Math.ceil(timeRemaining / (24 * 60 * 60 * 1000));

            // Calcular tiempo desde último acceso
            const timeSinceActivity = now - lastActivity;
            const hoursSinceActivity = Math.floor(timeSinceActivity / (60 * 60 * 1000));

            return {
                loginTime: new Date(loginTime),
                lastActivity: new Date(lastActivity),
                daysRemaining,
                hoursSinceActivity,
                willExpireSoon: daysRemaining <= 1
            };
        } catch (error) {
            console.error('Error getting session info:', error);
            return null;
        }
    };

    // Función para verificar y restaurar sesión al cargar
    const checkAndRestoreSession = () => {
        try {
            const sessionData = localStorage.getItem(SESSION_KEY);
            if (!sessionData) {
                return;
            }

            const parsed = JSON.parse(sessionData);

            // Validar que los datos necesarios estén presentes
            if (!parsed.user || !parsed.loginTime) {
                clearSession();
                return;
            }

            // Verificar si la sesión ha expirado (7 días desde login)
            if (isSessionExpired(parsed.loginTime)) {
                clearSession();
                return;
            }

            // Verificar si han pasado más de 7 días desde la última actividad
            const now = Date.now();
            const lastActivityTime = parsed.lastActivity || parsed.loginTime;
            const inactivityPeriod = now - lastActivityTime;
            const maxInactivity = SESSION_EXPIRY_DAYS * 24 * 60 * 60 * 1000;

            if (inactivityPeriod > maxInactivity) {
                clearSession();
                return;
            }

            // Si la sesión es válida, restaurarla
            setUsuarioLogueado(parsed.user);
            updateLastActivity();

        } catch (error) {
            // Si hay cualquier error (JSON malformado, etc.), limpiar la sesión
            console.warn('Error checking session, clearing:', error.message);
            clearSession();
        } finally {
            setIsLoading(false);
        }
    };

    // Efecto para verificar sesión al montar el componente
    useEffect(() => {
        clearCorruptedSessions();
        checkAndRestoreSession();
    }, []);

    // Efecto para actualizar la actividad cuando cambia el usuario
    useEffect(() => {
        if (usuarioLogueado) {
            updateLastActivity();
        }
    }, [usuarioLogueado]);

    return {
        usuarioLogueado,
        setUsuarioLogueado: saveSession,
        clearSession,
        isLoading,
        getSessionInfo
    };
};

export default useAuthPersistence;