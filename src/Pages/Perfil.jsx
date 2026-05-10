import { useEffect, useState } from 'react';
import '../Desing/Perfil.css';
import apiService from '../services/api';

function Perfil({ usuarioLogueado, setUsuarioLogueado }) {
    const [seccionActiva, setSeccionActiva] = useState('perfil');
    const [userData, setUserData] = useState(null);
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        last_name: '',
        mail: '',
        phone: '',
        promotions: false,
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const loadUser = async () => {
            if (!usuarioLogueado?.user_id) return;

            setLoading(true);
            setMessage('');

            try {
                const usuario = await apiService.getUsuarioPorId(usuarioLogueado.user_id);
                setUserData(usuario);
                setFormData({
                    username: usuario.username || '',
                    name: usuario.name || '',
                    last_name: usuario.last_name || '',
                    mail: usuario.mail || '',
                    phone: usuario.phone || '',
                    promotions: usuario.promotions || false,
                    password: '',
                });
            } catch (error) {
                setMessage(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, [usuarioLogueado]);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSave = async (event) => {
        event.preventDefault();
        setMessage('');

        const updates = { ...formData };
        if (!updates.password) {
            delete updates.password;
        }

        try {
            const updatedUser = await apiService.actualizarUsuario(usuarioLogueado.user_id, updates);
            setUserData(updatedUser);
            setUsuarioLogueado(updatedUser);
            setMessage('Perfil actualizado correctamente.');
            setFormData((prev) => ({ ...prev, password: '' }));
        } catch (error) {
            setMessage(error.message);
        }
    };

    if (!usuarioLogueado) {
        return (
            <div className="Form" style={{ marginTop: '50px', marginBottom: '60px' }}>
                <h2>Acceso necesario</h2>
                <p>Debes iniciar sesión para acceder a tu perfil.</p>
            </div>
        );
    }

    if (loading || !userData) {
        return (
            <div className="Form" style={{ marginTop: '50px', marginBottom: '60px' }}>
                <h2>Cargando perfil...</h2>
            </div>
        );
    }

    const secciones = [
        { id: 'perfil', label: 'Perfil' },
        { id: 'editar', label: 'Editar Perfil' },
        { id: 'pago', label: 'Métodos de Pago' },
        { id: 'config', label: 'Configuración' },
    ];

    const iniciales = `${userData.name?.[0] || ''}${userData.last_name?.[0] || ''}`.toUpperCase();

    return (
        <div className="perfil-container">
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

            {seccionActiva === 'perfil' && (
                <div className="perfil-content">
                    <div className="perfil-header">
                        <h1>Información del Usuario</h1>
                        <p>Detalles de tu perfil en el hotel</p>
                    </div>

                    <div className="perfil-card">
                        <div className="perfil-top">
                            <div className="perfil-avatar">{iniciales}</div>
                            <div className="perfil-nombre">
                                <h2>{userData.name} {userData.last_name}</h2>
                                <p className="perfil-username">@{userData.username}</p>
                            </div>
                        </div>

                        <div className="perfil-divider"></div>

                        <div className="perfil-datos">
                            <div className="dato-box">
                                <div className="dato-icon email-icon"></div>
                                <div className="dato-content">
                                    <p className="dato-label">Email</p>
                                    <p className="dato-value">{userData.mail}</p>
                                </div>
                            </div>

                            <div className="dato-box">
                                <div className="dato-icon phone-icon"></div>
                                <div className="dato-content">
                                    <p className="dato-label">Teléfono</p>
                                    <p className="dato-value">{userData.phone}</p>
                                </div>
                            </div>

                            <div className="dato-box">
                                <div className="dato-icon location-icon"></div>
                                <div className="dato-content">
                                    <p className="dato-label">Rol</p>
                                    <p className="dato-value">{userData.rol || 'Usuario'}</p>
                                </div>
                            </div>

                            <div className="dato-box">
                                <div className="dato-icon calendar-icon"></div>
                                <div className="dato-content">
                                    <p className="dato-label">Recibe promociones</p>
                                    <p className="dato-value">
                                        {userData.promotions ? 'Sí' : 'No'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {seccionActiva === 'editar' && (
                <div className="perfil-content">
                    <div className="perfil-header">
                        <h1>Editar Perfil</h1>
                        <p>Actualiza tu información personal</p>
                    </div>

                    <div className="perfil-card editar-card">
                        <form className="editar-form" onSubmit={handleSave}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="name">Nombre</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="last_name">Apellidos</label>
                                    <input
                                        type="text"
                                        id="last_name"
                                        name="last_name"
                                        value={formData.last_name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="username">Nombre de usuario</label>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="mail">Correo</label>
                                    <input
                                        type="email"
                                        id="mail"
                                        name="mail"
                                        value={formData.mail}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="phone">Teléfono</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Nueva contraseña</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Dejar vacío para no cambiar"
                                    />
                                </div>
                            </div>

                            <div className="form-row full-width">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        name="promotions"
                                        checked={formData.promotions}
                                        onChange={handleChange}
                                    />
                                    Quiero recibir promociones por correo
                                </label>
                            </div>

                            {message && <p className="success-message">{message}</p>}

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
                    <div className="perfil-header-pago">
                        <div>
                            <h1>Métodos de Pago</h1>
                            <p>Gestiona tus tarjetas y métodos de pago</p>
                        </div>
                        <button className="btn-anadir-tarjeta">
                            Añadir Tarjeta
                        </button>
                    </div>

                    <div className="tarjetas-list">
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
                    <div className="perfil-header">
                        <h1>Configuración de Cuenta</h1>
                        <p>Gestiona preferencias y configuración de seguridad</p>
                    </div>

                    <div className="config-card">
                        <div className="config-section">
                            <div className="section-header">
                                <h2>Notificaciones</h2>
                            </div>

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

                        <div className="config-divider"></div>

                        <div className="config-section">
                            <div className="section-header">
                                <h2>Seguridad</h2>
                            </div>

                            <div className="security-buttons">
                                <button className="btn-security">Cambiar Contraseña</button>
                            </div>
                        </div>

                        <div className="config-divider"></div>

                        <div className="config-section">
                            <div className="section-header">
                                <h2>Preferencias</h2>
                            </div>

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
