import React, { useState, useEffect } from 'react';
import apiService from '../services/api';
import { useDebounce } from '../hooks/useDebounce';

function Login({ setPagina, setUsuarioLogueado }) {
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [usernameCheck, setUsernameCheck] = useState({ loading: false, exists: null, message: '' });

    // Debounce para username (500ms)
    const debouncedUsername = useDebounce(usuario, 500);

    // Verificación AJAX para username
    useEffect(() => {
        const checkUsername = async () => {
            if (!debouncedUsername || debouncedUsername.length < 3) {
                setUsernameCheck({ loading: false, exists: null, message: '' });
                return;
            }

            setUsernameCheck({ loading: true, exists: null, message: '' });

            try {
                const result = await apiService.verificarUsername(debouncedUsername);
                setUsernameCheck({
                    loading: false,
                    exists: !result.available, // Si no está disponible, significa que existe
                    message: result.available ? 'Usuario no encontrado' : 'Usuario encontrado'
                });
            } catch (error) {
                setUsernameCheck({ loading: false, exists: null, message: 'Error al verificar' });
            }
        };

        checkUsername();
    }, [debouncedUsername]);

    const handleData = async (e) => {
        e.preventDefault();
        setError("");

        try {
            // Enviamos las credenciales al backend
            const credenciales = { username: usuario, password: password };
            const userEncontrado = await apiService.loginUsuario(credenciales);

            console.log("¡Login exitoso!", userEncontrado);

            // 1. Guardamos el usuario en el estado global de App.jsx
            setUsuarioLogueado(userEncontrado);

            // 2. Redirigimos al inicio o al perfil
            setPagina('inicio');
            alert(`¡Bienvenido de nuevo, ${userEncontrado.name}!`);

        } catch (err) {
            console.error("Error al iniciar sesión:", err);
            setError("Usuario o contraseña incorrectos");
        }
    }

    return (
        <div className='Form' style={{ marginTop: '50px', marginBottom: '60px' }}>
            <form onSubmit={handleData}>
                <h2>Iniciar Sesión</h2>

                {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}

                <label htmlFor="user">Nombre de usuario:</label>
                <input
                    type="text"
                    id="user"
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    required
                />
                {usernameCheck.loading && <p className="checking">Verificando...</p>}
                {usernameCheck.message && !usernameCheck.loading && (
                    <p className={usernameCheck.exists ? "success" : "warning"}>
                        {usernameCheck.message}
                    </p>
                )}

                <label htmlFor="password">Contraseña:</label>
                <input
                    type="password"
                    id="user_password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit" className="btn-primario">Enviar</button>
            </form>
        </div>
    );
}

export default Login;