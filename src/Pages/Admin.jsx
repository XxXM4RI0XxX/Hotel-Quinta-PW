import { useState } from 'react';
import '../Desing/Admin.css';

function Admin() {
    const [seccionActiva, setSeccionActiva] = useState('usuarios');

    // Estado para usuarios
    const [usuarios, setUsuarios] = useState([
        { id: 1, nombre: 'María García', email: 'maria.garcia@email.com', estado: 'activo', fecha: '2024-01-15' },
        { id: 2, nombre: 'Juan López', email: 'juan.lopez@email.com', estado: 'activo', fecha: '2024-02-20' },
        { id: 3, nombre: 'Ana Martínez', email: 'ana.martinez@email.com', estado: 'suspendido', fecha: '2024-03-10' },
    ]);

    // Estado para reservaciones
    const [reservaciones] = useState([
        { id: 1, usuario: 'María García', habitacion: 'Habitación Deluxe', entrada: '2024-05-15', salida: '2024-05-20', estado: 'confirmada' },
        { id: 2, usuario: 'Juan López', habitacion: 'Habitación Premium', entrada: '2024-05-18', salida: '2024-05-25', estado: 'confirmada' },
        { id: 3, usuario: 'Ana Martínez', habitacion: 'Habitación Estándar', entrada: '2024-06-01', salida: '2024-06-05', estado: 'pendiente' },
    ]);

    // Estado para habitaciones
    const [habitaciones, setHabitaciones] = useState([
        { id: 1, nombre: 'Habitación Estándar', tipo: 'Estándar', capacidad: 2, precio: 80 },
        { id: 2, nombre: 'Habitación Deluxe', tipo: 'Deluxe', capacidad: 2, precio: 120 },
        { id: 3, nombre: 'Habitación Premium', tipo: 'Premium', capacidad: 4, precio: 180 },
    ]);

    // Estado para formulario de nueva habitación
    const [nuevaHabitacion, setNuevaHabitacion] = useState({ nombre: '', tipo: '', capacidad: 2, precio: 0 });
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    // Funciones para usuarios
    const suspenderUsuario = (id) => {
        setUsuarios(usuarios.map(user =>
            user.id === id ? { ...user, estado: user.estado === 'activo' ? 'suspendido' : 'activo' } : user
        ));
    };

    const eliminarUsuario = (id) => {
        setUsuarios(usuarios.filter(user => user.id !== id));
    };

    // Funciones para habitaciones
    const agregarHabitacion = (e) => {
        e.preventDefault();
        if (nuevaHabitacion.nombre && nuevaHabitacion.tipo) {
            setHabitaciones([...habitaciones, {
                id: Math.max(...habitaciones.map(h => h.id), 0) + 1,
                ...nuevaHabitacion,
                capacidad: parseInt(nuevaHabitacion.capacidad),
                precio: parseFloat(nuevaHabitacion.precio)
            }]);
            setNuevaHabitacion({ nombre: '', tipo: '', capacidad: 2, precio: 0 });
            setMostrarFormulario(false);
        }
    };

    const eliminarHabitacion = (id) => {
        setHabitaciones(habitaciones.filter(hab => hab.id !== id));
    };

    return (
        <div className="admin-container">
            {/* Barra superior */}
            <div className="admin-header">
                <h1>Panel de Administrador</h1>
                <p>Gestiona usuarios, reservaciones y habitaciones del hotel</p>
            </div>

            {/* Navegación */}
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

            {/* Contenido */}
            <div className="admin-content">
                {/* Sección Usuarios */}
                {seccionActiva === 'usuarios' && (
                    <div className="section">
                        <h2>Gestión de Usuarios</h2>
                        <div className="usuarios-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Email</th>
                                        <th>Estado</th>
                                        <th>Fecha Registro</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usuarios.map(usuario => (
                                        <tr key={usuario.id} className={`estado-${usuario.estado}`}>
                                            <td>{usuario.nombre}</td>
                                            <td>{usuario.email}</td>
                                            <td>
                                                <span className={`badge badge-${usuario.estado}`}>
                                                    {usuario.estado === 'activo' ? 'Activo' : 'Suspendido'}
                                                </span>
                                            </td>
                                            <td>{usuario.fecha}</td>
                                            <td className="acciones">
                                                <button
                                                    className={`btn-accion ${usuario.estado === 'activo' ? 'suspender' : 'activar'}`}
                                                    onClick={() => suspenderUsuario(usuario.id)}
                                                >
                                                    {usuario.estado === 'activo' ? 'Suspender' : 'Activar'}
                                                </button>
                                                <button
                                                    className="btn-accion eliminar"
                                                    onClick={() => eliminarUsuario(usuario.id)}
                                                >
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Sección Reservaciones */}
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
                                    {reservaciones.map(reserva => (
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

                {/* Sección Habitaciones */}
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
                            {habitaciones.map(habitacion => (
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
