import React, { useState } from 'react';
import './Reservaciones.css'; 

function Consulta({ setPagina }) {
  const [modo, setModo] = useState('consulta'); 

  // 1. Cambiamos 'telefono' por 'fecha'
  const [valores, setValores] = useState({
    usuarioCorreo: '',
    password: '',
    nombre: '',
    correo: '',
    fecha: '' 
  });

  const [valido, setValido] = useState({
    usuarioCorreo: null,
    password: null,
    nombre: null,
    correo: null,
    fecha: null
  });

  const [estadoFormulario, setEstadoFormulario] = useState(null);

  const expresiones = {
    usuarioCorreo: /^([a-zA-Z0-9_-]{4,16}|[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)$/, 
    password: /^.{4,12}$/,
    nombre: /^[a-zA-ZÀ-ÿ\s]{4,40}$/,
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    // Validamos que la fecha tenga formato YYYY-MM-DD (que es el estándar del input date)
    fecha: /^\d{4}-\d{2}-\d{2}$/ 
  };

  const validarCampo = (e) => {
    const { name, value } = e.target;
    setValores({ ...valores, [name]: value });

    if (expresiones[name]) {
      if (expresiones[name].test(value)) {
        setValido({ ...valido, [name]: true });
      } else {
        setValido({ ...valido, [name]: false });
      }
    }
  };

  const handleSubmitConsulta = (e) => {
    e.preventDefault();
    if (valido.usuarioCorreo && valido.password) {
      setEstadoFormulario('exito-consulta');
    } else {
      setEstadoFormulario('error');
    }
  };

  const handleSubmitRecuperacion = (e) => {
    e.preventDefault();
    // 2. Evaluamos la fecha en lugar del teléfono
    if (valido.nombre && valido.correo && valido.fecha) {
      if (valores.correo.toLowerCase() === 'test@correo.com') {
         setEstadoFormulario('error-no-encontrado');
      } else {
         setEstadoFormulario('exito-recuperacion');
      }
    } else {
      setEstadoFormulario('error');
    }
  };

  const obtenerClaseGrupo = (campo) => {
    if (valido[campo] === true) return "formulario__grupo formulario__grupo-correcto";
    if (valido[campo] === false) return "formulario__grupo formulario__grupo-incorrecto";
    return "formulario__grupo";
  };

  return (
    <div className="reservaciones-container">
      <section className="seccion-centrada">
        <h2>{modo === 'consulta' ? 'Consulta tu Reservación' : 'Recuperar Reservación'}</h2>
        <p>
          {modo === 'consulta' 
            ? 'Ingresa tus credenciales para ver los detalles de tu estancia.' 
            : 'Ingresa los datos del huésped titular y la fecha de la estancia para buscar la reservación.'}
        </p>
      </section>

      {modo === 'consulta' ? (
        <form onSubmit={handleSubmitConsulta} className="formulario">
          <fieldset>
            <legend>Datos de Acceso</legend>
            <div className={obtenerClaseGrupo('usuarioCorreo')}>
              <label>Usuario o Correo Electrónico:</label>
              <input type="text" name="usuarioCorreo" placeholder="Ej. juan_perez o juan@correo.com" value={valores.usuarioCorreo} onChange={validarCampo} onKeyUp={validarCampo} onBlur={validarCampo} required />
              <p className="formulario__input-error">Ingresa un usuario (4-16 caracteres) o un correo válido.</p>
            </div>

            <div className={obtenerClaseGrupo('password')}>
              <label>Contraseña:</label>
              <input type="password" name="password" placeholder="Tu contraseña" value={valores.password} onChange={validarCampo} onKeyUp={validarCampo} onBlur={validarCampo} required />
              <p className="formulario__input-error">La contraseña debe tener entre 4 y 12 caracteres.</p>
            </div>
          </fieldset>

          {estadoFormulario === 'error' && (
            <div className="formulario__mensaje">
              <p><b>Error:</b> Por favor rellena los datos correctamente.</p>
            </div>
          )}

          {estadoFormulario === 'error' && (
            <div className="formulario__mensaje">
              <p><b>Error:</b> Por favor rellena los datos correctamente.</p>
            </div>
          )}

          {/* Contenedor de botones Consultar Reservación y Cancelar */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', marginTop: '20px' }}>
            <button type="submit" className="btn-formulario btn-iluminado">
              Consultar Reservación
            </button>

            <button 
              type="button" 
              className="btn-formulario btn-cancelar" 
              onClick={() => setPagina('inicio')}
            >
              Cancelar
            </button>
          </div>

          {/* 3. Mensaje movido hacia abajo y con más margen */}
          {estadoFormulario === 'exito-consulta' && (
            <div style={{ textAlign: 'center', marginTop: '25px' }}>
              <p className="formulario__mensaje-exito" style={{ display: 'inline-block', padding: '10px 20px', backgroundColor: '#e8f5e9', borderRadius: '8px' }}>
                🔍 Buscando reservación en el sistema...
              </p>
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <a href="#" onClick={(e) => { e.preventDefault(); setModo('recuperacion'); setEstadoFormulario(null); }} style={{ color: 'var(--reserve-bg)', fontWeight: 'bold', fontSize: '1.05rem', textDecoration: 'underline' }}>
              ¿Olvidaste la contraseña? Haz clic aquí
            </a>
          </div>
        </form>
      ) : (
        <form onSubmit={handleSubmitRecuperacion} className="formulario">
          <fieldset>
            <legend>Búsqueda de Huésped</legend>
            <div className={obtenerClaseGrupo('nombre')}>
              <label>Nombre Completo:</label>
              <input type="text" name="nombre" placeholder="Ej. Juan Pérez" value={valores.nombre} onChange={validarCampo} onKeyUp={validarCampo} onBlur={validarCampo} required />
              <p className="formulario__input-error">El nombre solo puede contener letras y espacios.</p>
            </div>

            <div className={obtenerClaseGrupo('correo')}>
              <label>Correo Electrónico:</label>
              <input type="email" name="correo" placeholder="ejemplo@correo.com" value={valores.correo} onChange={validarCampo} onKeyUp={validarCampo} onBlur={validarCampo} required />
              <p className="formulario__input-error">Ingresa un correo válido con @ y dominio.</p>
            </div>

            {/* 4. Cambiamos el input de Teléfono por Fecha */}
            <div className={obtenerClaseGrupo('fecha')}>
              <label>Fecha de Llegada (Check-in):</label>
              <input type="date" name="fecha" value={valores.fecha} onChange={validarCampo} onBlur={validarCampo} required />
              <p className="formulario__input-error">Por favor, selecciona una fecha válida.</p>
            </div>
          </fieldset>

          {estadoFormulario === 'error' && (
            <div className="formulario__mensaje">
              <p><b>Error:</b> Por favor rellena los datos correctamente.</p>
            </div>
          )}

          {estadoFormulario === 'error-no-encontrado' && (
            <div className="formulario__mensaje" style={{ backgroundColor: '#ff9800' }}>
              <p>No encontramos coincidencias, por favor, <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'}); }} style={{ color: '#fff', textDecoration: 'underline', fontWeight: 'bold' }}>comunícate con nosotros</a>.</p>
            </div>
          )}

          {estadoFormulario === 'exito-recuperacion' && (
            <div className="formulario__mensaje-exito" style={{ padding: '15px', backgroundColor: 'rgba(30, 209, 45, 0.1)', border: '2px solid #1ed12d', borderRadius: '6px', marginBottom: '20px' }}>
              <p style={{ margin: '0 0 10px 0', fontSize: '1.1rem' }}>✅ La información de reservación fue enviada al correo electrónico registrado.</p>
              <p style={{ fontSize: '0.9rem', color: '#555', margin: 0, fontWeight: 'normal' }}>
                * En caso de no tener acceso al correo, por favor <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'}); }} style={{ color: 'var(--reserve-bg)', fontWeight: 'bold', textDecoration: 'underline' }}>comunícate al hotel</a> directamente.
              </p>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '10px' }}>
            <button type="submit" className="btn-formulario btn-iluminado">
              Buscar Reservación
            </button>
            {/* 5. Usamos btn-cancelar (Rojo) para que esté activo y resalte */}
            <button type="button" className="btn-formulario btn-cancelar" onClick={() => { setModo('consulta'); setEstadoFormulario(null); }}>
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Consulta;