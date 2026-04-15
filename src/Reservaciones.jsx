import React, { useState, useEffect } from 'react';
import './Reservaciones.css';

function Reservaciones({ setPagina }) {
  // Estados para los valores del formulario
  const [valores, setValores] = useState({
    usuario: '',
    nombre: '',
    password: '',
    correo: '',
    telefono: '',
    habitacion: sessionStorage.getItem('habitacionPreseleccionada') || '',
    terminos: false
  });

  // Estados para la validación (null = sin tocar, true = correcto, false = error)
  const [valido, setValido] = useState({
    usuario: null,
    nombre: null,
    password: null,
    correo: null,
    telefono: null,
    habitacion: sessionStorage.getItem('habitacionPreseleccionada') ? true : null
  });

  const [formularioValido, setFormularioValido] = useState(null);
  
  //Para borrar la memoria de sesión de la habitación seleccionada al entrar al formulario
  useEffect(() => {
    sessionStorage.removeItem('habitacionPreseleccionada');
  }, []);

  // Expresiones regulares
  const expresiones={
    usuario: /^[a-zA-Z0-9_-]{4,16}$/, //Para letras, números, guión y guión bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{4,40}$/, //Para letras y espacios, se pueden poner acentos
    password: /^.{4,12}$/, //Letras y números (el punto permite añadir cualquier caracter)
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{10}$/ //Sólo marcación a 10 números, de acuerdo a la reglamentación en México
  };

  //Función para validar cada campo de forma dinámica
  const validarCampo=(e) => {
    const {name, value} = e.target;
    //Actualizar el valor
    setValores({...valores, [name]: value});
    //Validar con Regex
    if (expresiones[name]) {
      if (expresiones[name].test(value)) {
        setValido({...valido, [name]: true});
      } else {
        setValido({...valido, [name]: false});
      }
    }
  };

  const handleCheckbox=(e) => {
    setValores({...valores, terminos: e.target.checked});
  };

  //Función al enviar el formulario
  const handleSubmit=(e) => {
    e.preventDefault();
    if (
      valido.usuario &&
      valido.nombre &&
      valido.password &&
      valido.correo &&
      valido.telefono &&
      valores.terminos
    ) {
      setFormularioValido(true);
      //Aquí se enviarán los datos a la base de datos cuando esté implementada

      //Limpiar formulario después de envío exitoso
      setTimeout(() => {
        setValores({usuario: '', nombre: '', password: '', correo: '', telefono: '', terminos: false});
        setValido({usuario: null, nombre: null, password: null, correo: null, telefono: null});
        setFormularioValido(null);
      }, 4000);
    } else {//Formulario no válido
      setFormularioValido(false);
    }
  };

  //Función auxiliar para las clases CSS
  const obtenerClaseGrupo = (campo) => {
    if (valido[campo] === true) return "formulario__grupo formulario__grupo-correcto";
    if (valido[campo] === false) return "formulario__grupo formulario__grupo-incorrecto";
    return "formulario__grupo";
  };

  return (
    <div className="reservaciones-container">
      <section className="seccion-centrada">
        <h2>Gestión de Reservaciones</h2>
        <p>Por favor, llena los datos para registrar tu reservación.</p>
      </section>
      
      {/* Se añade onSubmit={handleSubmit} a la etiqueta form */}
      <form onSubmit={handleSubmit} className="formulario">
        <fieldset>
          <legend>Datos del Cliente</legend>
          
          {/* Validaciones añadidas */}
          <div className={obtenerClaseGrupo('usuario')}>
            <label>Usuario:</label>
            <input type="text" name="usuario" placeholder="Ej. juan_perez" value={valores.usuario} onChange={validarCampo} onKeyUp={validarCampo} onBlur={validarCampo} required />
            <p className="formulario__input-error">De 4 a 16 caracteres (letras, números, guion bajo).</p>
          </div>

          <div className={obtenerClaseGrupo('nombre')}>
            <label>Nombre Completo:</label>
            <input type="text" name="nombre" placeholder="Ej. Juan Pérez" value={valores.nombre} onChange={validarCampo} onKeyUp={validarCampo} onBlur={validarCampo} required />
            <p className="formulario__input-error">El nombre solo puede contener letras y espacios.</p>
          </div>

          {/* Añadidos para las validaciones, se señalan requisitos, consejos y avisos en caso de errores */}
          <div className={obtenerClaseGrupo('password')}>
            <label>Contraseña:</label>
            <input type="password" name="password" placeholder="Incluye símbolos si deseas" value={valores.password} onChange={validarCampo} onKeyUp={validarCampo} onBlur={validarCampo} required />
            <p className="formulario__input-error">La contraseña debe tener entre 4 y 12 caracteres.</p>
          </div>

          <div className={obtenerClaseGrupo('correo')}>
            <label>Correo Electrónico:</label>
            <input type="email" name="correo" placeholder="ejemplo@correo.com" value={valores.correo} onChange={validarCampo} onKeyUp={validarCampo} onBlur={validarCampo} required />
            <p className="formulario__input-error">Ingresa un correo válido con @ y dominio.</p>
          </div>

          <div className={obtenerClaseGrupo('telefono')}>
            <label>Teléfono:</label>
            <input type="tel" name="telefono" placeholder="4431234567" value={valores.telefono} onChange={validarCampo} onKeyUp={validarCampo} onBlur={validarCampo} required />
            <p className="formulario__input-error">El teléfono debe tener exactamente 10 números (marcación a 10 dígitos).</p>
          </div>
        </fieldset>

        <fieldset>
          <legend>Detalles de la Estancia</legend>
          <label>Fecha de Entrada:</label>
          <input type="date" required />
          <label>Fecha de Salida:</label>
          <input type="date" required />
          <div className={obtenerClaseGrupo('habitacion')}>
          <label>Habitación seleccionada:</label>
          <select 
            name="habitacion" 
            value={valores.habitacion} 
            onChange={validarCampo} 
            onBlur={validarCampo} 
            required
          >
            <option value="" disabled>- Elige una habitación -</option>
            <option value="101 - Tzintzuntzan">101 - Tzintzuntzan</option>
            <option value="102 - Paracho">102 - Paracho</option>
            <option value="103 - Yunuen">103 - Yunuen</option>
            <option value="104 - Pátzcuaro">104 - Pátzcuaro</option>
            <option value="105 - Coeneo">105 - Coeneo</option>
            <option value="106 - Janitzio">106 - Janitzio</option>
            <option value="201 - Suite Quencio">201 - Suite Quencio</option>
            <option value="202 - Morelia">202 - Morelia</option>
            <option value="203 - Tacámbaro">203 - Tacámbaro</option>
            <option value="204 - Uruapan">204 - Uruapan</option>
            <option value="205 - Tlalpujahua">205 - Tlalpujahua</option>
            <option value="206 - Cuitzeo">206 - Cuitzeo</option>
            <option value="207 - Cuanajo">207 - Cuanajo</option>
            <option value="301 - Angangueo">301 - Angangueo</option>
            <option value="302 - Santa Clara del Cobre">302 - Santa Clara del Cobre</option>
          </select>
          <p className="formulario__input-error">Por favor, selecciona una habitación válida.</p>
          </div>
          <label>Número de Huéspedes:</label>
          <input type="number" min="1" max="4" placeholder="1" required />
        </fieldset>
        
        {/* Checkbox necesario para la validación final */}
        <div className="formulario__grupo" id="grupo__terminos" style={{ marginBottom: '20px' }}>
          <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <input type="checkbox" name="terminos" checked={valores.terminos} onChange={handleCheckbox} />
            Acepto los Términos y Condiciones
          </label>
        </div>

        {/* Mensaje de error general si se presiona el botón sin llenar bien */}
        {formularioValido === false && (
          <div className="formulario__mensaje">
            <p><b>Error:</b> Por favor rellena los datos del cliente correctamente.</p>
          </div>
        )}

        {/* Contenedor Flex para alinear los botones */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '20px' }}>
          
          <button type="submit" className={`btn-formulario ${valores.terminos ? 'btn-iluminado' : 'btn-apagado'}`} disabled={!valores.terminos}>
            Confirmar Reservación
          </button>

          {/* Botón de cancelar */}
          <button 
            type="button" 
            className="btn-formulario btn-cancelar" 
            onClick={() => setPagina('inicio')}
          >
            Cancelar
          </button>

        </div>

        {/* Mensaje de éxito */}
        {formularioValido === true && (
          <p className="formulario__mensaje-exito">
            ¡Reservación confirmada exitosamente!
          </p>
        )}
      </form>
    </div>
  );
}

export default Reservaciones;