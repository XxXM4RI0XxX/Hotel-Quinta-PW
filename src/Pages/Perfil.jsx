import { useState } from 'react';
import '../Desing/Perfil.css';

function Perfil() {
    const [seccionActiva, setSeccionActiva] = useState('perfil');

    const datosUsuario = {
        nombre: 'María García',
        iniciales: 'MG',
        email: 'maria.garcia@email.com',
        telefono: '+34 612 345 678',
        direccion: 'Calle Mayor 123, Madrid, España',
        miembroDesde: 'Enero 2024',
    };

    const secciones = [
        { id: 'perfil', label: datosUsuario.nombre },
        { id: 'editar', label: 'Editar Perfil' },
        { id: 'pago', label: 'Métodos de Pago' },
        { id: 'config', label: 'Configuración' },
    ];

    return (
        <div className="perfil-container">
            {/* Barra de navegación */}
            <nav className="perfil-nav">
                {secciones.map((seccion) => (
                    <button
                        key={seccion.id}
                        className={`nav-item ${seccionActiva === seccion.id ? 'activa' : ''}`}
                        onClick={() => setSeccionActiva(seccion.id)}
                    >
                        {seccion.label}
                    </button>
                ))}
            </nav>

            {/* Contenido principal */}
            {seccionActiva === 'perfil' && (
                <div className="perfil-content">
                    {/* Encabezado */}
                    <div className="perfil-header">
                        <h1>Información del Usuario</h1>
                        <p>Detalles de tu perfil en el hotel</p>
                    </div>

                    {/* Tarjeta de perfil */}
                    <div className="perfil-card">
                        {/* Sección superior con avatar y nombre */}
                        <div className="perfil-top">
                            <div className="perfil-avatar">
                                {datosUsuario.iniciales}
                            </div>
                            <div className="perfil-nombre">
                                <h2>{datosUsuario.nombre}</h2>
                            </div>
                        </div>

                        <div className="perfil-divider"></div>

                        {/* Sección de datos en cuadrícula */}
                        <div className="perfil-datos">
                            {/* Email */}
                            <div className="dato-box">
                                <div className="dato-icon email-icon"></div>
                                <div className="dato-content">
                                    <p className="dato-label">Email</p>
                                    <p className="dato-value">{datosUsuario.email}</p>
                                </div>
                            </div>

                            {/* Teléfono */}
                            <div className="dato-box">
                                <div className="dato-icon phone-icon"></div>
                                <div className="dato-content">
                                    <p className="dato-label">Teléfono</p>
                                    <p className="dato-value">{datosUsuario.telefono}</p>
                                </div>
                            </div>

                            {/* Dirección */}
                            <div className="dato-box">
                                <div className="dato-icon location-icon"></div>
                                <div className="dato-content">
                                    <p className="dato-label">Dirección</p>
                                    <p className="dato-value">{datosUsuario.direccion}</p>
                                </div>
                            </div>

                            {/* Miembro desde */}
                            <div className="dato-box">
                                <div className="dato-icon calendar-icon"></div>
                                <div className="dato-content">
                                    <p className="dato-label">Miembro desde</p>
                                    <p className="dato-value">{datosUsuario.miembroDesde}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {seccionActiva === 'editar' && (
                <div className="perfil-content">
                    {/* Encabezado */}
                    <div className="perfil-header">
                        <h1>Editar Perfil</h1>
                        <p>Actualiza tu información personal</p>
                    </div>

                    {/* Tarjeta de formulario */}
                    <div className="perfil-card editar-card">
                        <form className="editar-form">
                            {/* Primera fila */}
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="nombre-completo">Nombre Completo</label>
                                    <input type="text" id="nombre-completo" defaultValue="María García" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" id="email" defaultValue="maria.garcia@email.com" />
                                </div>
                            </div>

                            {/* Segunda fila */}
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="telefono">Teléfono</label>
                                    <input type="tel" id="telefono" defaultValue="+34 612 345 678" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="codigo-postal">Código Postal</label>
                                    <input type="text" id="codigo-postal" defaultValue="28013" />
                                </div>
                            </div>

                            {/* Tercera fila - Dirección (ancho completo) */}
                            <div className="form-row full-width">
                                <div className="form-group">
                                    <label htmlFor="direccion">Dirección</label>
                                    <input type="text" id="direccion" defaultValue="Calle Mayor 123" />
                                </div>
                            </div>

                            {/* Cuarta fila */}
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="ciudad">Ciudad</label>
                                    <input type="text" id="ciudad" defaultValue="Madrid" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="pais">País</label>
                                    <input type="text" id="pais" defaultValue="España" />
                                </div>
                            </div>

                            {/* Botón de guardar */}
                            <div className="form-actions">
                                <button type="submit" className="btn-guardar">
                                    Guardar Cambios
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {seccionActiva === 'pago' && (
                <div className="perfil-content">
                    {/* Encabezado */}
                    <div className="perfil-header-pago">
                        <div>
                            <h1>Métodos de Pago</h1>
                            <p>Gestiona tus tarjetas y métodos de pago</p>
                        </div>
                        <button className="btn-anadir-tarjeta">
                            Añadir Tarjeta
                        </button>
                    </div>

                    {/* Lista de tarjetas */}
                    <div className="tarjetas-list">
                        {/* Primera tarjeta - Visa */}
                        <div className="tarjeta-item">
                            <div className="tarjeta-izquierda">
                                <div className="tarjeta-icon">💳</div>
                                <div className="tarjeta-info">
                                    <div className="tarjeta-nombre">
                                        Visa
                                        <span className="tarjeta-badge">Predeterminada</span>
                                    </div>
                                    <p className="tarjeta-numero">•••• •••• •••• 4242 | Expira 12/26</p>
                                </div>
                            </div>
                            <button className="btn-eliminar">🗑️</button>
                        </div>

                        {/* Segunda tarjeta - Mastercard */}
                        <div className="tarjeta-item">
                            <div className="tarjeta-izquierda">
                                <div className="tarjeta-icon">💳</div>
                                <div className="tarjeta-info">
                                    <div className="tarjeta-nombre">
                                        Mastercard
                                    </div>
                                    <p className="tarjeta-numero">•••• •••• •••• 8888 | Expira 08/25</p>
                                </div>
                            </div>
                            <button className="btn-eliminar">🗑️</button>
                        </div>
                    </div>

                    {/* Sección de seguridad */}
                    <div className="seguridad-card">
                        <h3>Pago Seguro</h3>
                        <p>
                            Todos tus datos de pago están encriptados y protegidos con los más altos estándares de seguridad. <span className="texto-resaltado">Nunca</span> compartimos tu información financiera con terceros.
                        </p>
                    </div>
                </div>
            )}

            {seccionActiva === 'config' && (
                <div className="perfil-content">
                    {/* Encabezado */}
                    <div className="perfil-header">
                        <h1>Configuración de Cuenta</h1>
                        <p>Gestiona preferencias y configuración de seguridad</p>
                    </div>

                    {/* Tarjeta de configuración */}
                    <div className="config-card">
                        {/* Sección 1 - Notificaciones */}
                        <div className="config-section">
                            <div className="section-header">
                                <h2>Notificaciones</h2>
                            </div>

                            {/* Notificaciones por Email */}
                            <div className="config-option">
                                <div className="option-content">
                                    <p className="option-title">Notificaciones por Email</p>
                                    <p className="option-description">Recibe actualizaciones de reservas por correo</p>
                                </div>
                                <label className="toggle-switch">
                                    <input type="checkbox" defaultChecked />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>

                            {/* Notificaciones por SMS */}
                            <div className="config-option">
                                <div className="option-content">
                                    <p className="option-title">Notificaciones por SMS</p>
                                    <p className="option-description">Recibe recordatorios por mensaje de texto</p>
                                </div>
                                <label className="toggle-switch">
                                    <input type="checkbox" />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>
                        </div>

                        {/* Divisor */}
                        <div className="config-divider"></div>

                        {/* Sección 2 - Seguridad */}
                        <div className="config-section">
                            <div className="section-header">
                                <h2>Seguridad</h2>
                            </div>

                            <div className="security-buttons">
                                <button className="btn-security">Cambiar Contraseña</button>
                            </div>
                        </div>

                        {/* Divisor */}
                        <div className="config-divider"></div>

                        {/* Sección 3 - Preferencias */}
                        <div className="config-section">
                            <div className="section-header">
                                <h2>Preferencias</h2>
                            </div>

                             {/* Selector de idioma */}
                            <div className="config-option">
                                <div className="option-content">
                                    <p className="option-title">Idioma</p>
                                </div>
                                <select className="language-select">
                                    <option>Español</option>
                                    <option>English</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Perfil;
