import { useEffect, useState } from 'react';
import '../Desing/Admin.css';
import apiService from '../services/api';

function Admin({ usuarioLogueado }) {
    const [seccionActiva, setSeccionActiva] = useState('usuarios');
    const [usuarios, setUsuarios] = useState([]);
    const [loadingUsuarios, setLoadingUsuarios] = useState(false);
    const [adminError, setAdminError] = useState('');
    const [reservaciones] = useState([
        { id: 1, usuario: 'María García', habitacion: 'Habitación Deluxe', entrada: '2024-05-15', salida: '2024-05-20', estado: 'confirmada' },
        { id: 2, usuario: 'Juan López', habitacion: 'Habitación Premium', entrada: '2024-05-18', salida: '2024-05-25', estado: 'confirmada' },
        { id: 3, usuario: 'Ana Martínez', habitacion: 'Habitación Estándar', entrada: '2024-06-01', salida: '2024-06-05', estado: 'pendiente' },
    ]);
    const [habitaciones, setHabitaciones] = useState([
        { id: 1, nombre: 'Habitación Estándar', tipo: 'Estándar', capacidad: 2, precio: 80 },
        { id: 2, nombre: 'Habitación Deluxe', tipo: 'Deluxe', capacidad: 2, precio: 120 },
        { id: 3, nombre: 'Habitación Premium', tipo: 'Premium', capacidad: 4, precio: 180 },
    ]);
    const [nuevaHabitacion, setNuevaHabitacion] = useState({ nombre: '', tipo: '', capacidad: 2, precio: 0 });
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    useEffect(() => {
        const fetchUsuarios = async () => {
            if (!usuarioLogueado?.rol || usuarioLogueado.rol !== 'ROLE_ADMIN') {
                return;
            }

            setLoadingUsuarios(true);
            setAdminError('');

            try {
                const data = await apiService.listarUsuarios();
                setUsuarios(data || []);
            } catch (error) {
                setAdminError(error.message);
            } finally {
                setLoadingUsuarios(false);
            }
        };

        fetchUsuarios();
    }, [usuarioLogueado]);

    const eliminarUsuario = async (user_id) => {
        const confirma = window.confirm('¿Deseas eliminar este usuario de forma permanente?');
        if (!confirma) return;

        try {
            await apiService.eliminarUsuario(user_id);
            setUsuarios((prev) => prev.filter((usuario) => usuario.user_id !== user_id));
        } catch (error) {
            setAdminError(error.message);
        }
    };

    const agregarHabitacion = (e) => {
        e.preventDefault();
        if (nuevaHabitacion.nombre && nuevaHabitacion.tipo) {
            setHabitaciones([...habitaciones, {
                id: Math.max(...habitaciones.map(h => h.id), 0) + 1,
                ...nuevaHabitacion,
                capacidad: parseInt(nuevaHabitacion.capacidad, 10),
                precio: parseFloat(nuevaHabitacion.precio)
            }]);
            setNuevaHabitacion({ nombre: '', tipo: '', capacidad: 2, precio: 0 });
            setMostrarFormulario(false);
        }
    };

    const eliminarHabitacion = (id) => {
        setHabitaciones(habitaciones.filter(hab => hab.id !== id));
    };

    if (!usuarioLogueado) {
        return (
            <div className="admin-container">
                <div className="admin-header">
                    <h1>Acceso denegado</h1>
                    <p>Debes iniciar sesión como administrador para acceder a este panel.</p>
                </div>
            </div>
        );
    }

    if (usuarioLogueado.rol !== 'ROLE_ADMIN') {
        return (
            <div className="admin-container">
                <div className="admin-header">
                    <h1>No autorizado</h1>
                    <p>Tu cuenta no tiene permisos para gestionar usuarios.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-container">
            <div className="admin-header">
                <h1>Panel de Administrador</h1>
                <p>Gestiona usuarios, reservaciones y habitaciones del hotel</p>
            </div>

            <nav className="admin-nav">
                <button
                    className={`nav-btn ${seccionActiva === 'usuarios' ? 'activo' : ''}`}
                    onClick={() => setSeccionActiva('usuarios')}
                >
                    Usuarios
                </button>
                <button
                    className={`nav-btn ${seccionActiva === 'reservaciones' ? 'activo' : ''}`}
                    onClick={() => setSeccionActiva('reservaciones')}
                >
                    Reservaciones
                </button>
                <button
                    className={`nav-btn ${seccionActiva === 'habitaciones' ? 'activo' : ''}`}
                    onClick={() => setSeccionActiva('habitaciones')}
                >
                    Habitaciones
                </button>
            </nav>

            <div className="admin-content">
                {seccionActiva === 'usuarios' && (
                    <div className="section">
                        <h2>Gestión de Usuarios</h2>
                        {adminError && <p className="error">{adminError}</p>}
                        {loadingUsuarios ? (
                            <p>Cargando usuarios...</p>
                        ) : (
                            <div className="usuarios-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Email</th>
                                            <th>Usuario</th>
                                            <th>Teléfono</th>
                                            <th>Rol</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {usuarios.map((usuario) => (
                                            <tr key={usuario.user_id}>
                                                <td>{usuario.name} {usuario.last_name}</td>
                                                <td>{usuario.mail}</td>
                                                <td>{usuario.username}</td>
                                                <td>{usuario.phone}</td>
                                                <td>
                                                    <span className={`badge badge-${usuario.rol?.replace('ROLE_', '').toLowerCase()}`}>
                                                        {usuario.rol || 'USER'}
                                                    </span>
                                                </td>
                                                <td className="acciones">
                                                    <button
                                                        className="btn-accion eliminar"
                                                        onClick={() => eliminarUsuario(usuario.user_id)}
                                                    >
                                                        Eliminar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {seccionActiva === 'reservaciones' && (
                    <div className="section">
                        <h2>Gestión de Reservaciones</h2>
                        <div className="reservaciones-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Usuario</th>
                                        <th>Habitación</th>
                                        <th>Entrada</th>
                                        <th>Salida</th>
                                        <th>Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reservaciones.map((reserva) => (
                                        <tr key={reserva.id}>
                                            <td>{reserva.usuario}</td>
                                            <td>{reserva.habitacion}</td>
                                            <td>{reserva.entrada}</td>
                                            <td>{reserva.salida}</td>
                                            <td>
                                                <span className={`badge badge-${reserva.estado}`}>
                                                    {reserva.estado === 'confirmada' ? 'Confirmada' : 'Pendiente'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {seccionActiva === 'habitaciones' && (
                    <div className="section">
                        <div className="habitaciones-header">
                            <h2>Gestión de Habitaciones</h2>
                            <button
                                className="btn-agregar"
                                onClick={() => setMostrarFormulario(!mostrarFormulario)}
                            >
                                Agregar Habitación
                            </button>
                        </div>

                        {mostrarFormulario && (
                            <div className="formulario-habitacion">
                                <form onSubmit={agregarHabitacion}>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="nombre">Nombre Habitación</label>
                                            <input
                                                type="text"
                                                id="nombre"
                                                value={nuevaHabitacion.nombre}
                                                onChange={(e) => setNuevaHabitacion({ ...nuevaHabitacion, nombre: e.target.value })}
                                                placeholder="Ej: Habitación Premium"
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="tipo">Tipo</label>
                                            <input
                                                type="text"
                                                id="tipo"
                                                value={nuevaHabitacion.tipo}
                                                onChange={(e) => setNuevaHabitacion({ ...nuevaHabitacion, tipo: e.target.value })}
                                                placeholder="Ej: Premium"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="capacidad">Capacidad</label>
                                            <input
                                                type="number"
                                                id="capacidad"
                                                min="1"
                                                max="8"
                                                value={nuevaHabitacion.capacidad}
                                                onChange={(e) => setNuevaHabitacion({ ...nuevaHabitacion, capacidad: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="precio">Precio por Noche</label>
                                            <input
                                                type="number"
                                                id="precio"
                                                step="0.01"
                                                value={nuevaHabitacion.precio}
                                                onChange={(e) => setNuevaHabitacion({ ...nuevaHabitacion, precio: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-actions">
                                        <button type="submit" className="btn-guardar">Guardar</button>
                                        <button type="button" className="btn-cancelar" onClick={() => setMostrarFormulario(false)}>Cancelar</button>
                                    </div>
                                </form>
                            </div>
                        )}

                        <div className="habitaciones-grid">
                            {habitaciones.map((habitacion) => (
                                <div key={habitacion.id} className="habitacion-card">
                                    <div className="card-header">
                                        <h3>{habitacion.nombre}</h3>
                                        <span className="tipo-badge">{habitacion.tipo}</span>
                                    </div>
                                    <div className="card-body">
                                        <p><strong>Capacidad:</strong> {habitacion.capacidad} personas</p>
                                        <p><strong>Precio:</strong> ${habitacion.precio}/noche</p>
                                    </div>
                                    <div className="card-footer">
                                        <button
                                            className="btn-accion eliminar"
                                            onClick={() => eliminarHabitacion(habitacion.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Admin;
