import React from 'react';
import './Reservaciones.css';

function Reservaciones() {
  return (
    <div className="reservaciones-container">
      <section className="seccion-centrada">
        <h2>Gestión de Reservaciones</h2>
        <p>Por favor, llena los datos para registrar tu reservación.</p>
      </section>
      
      <form action="#" method="post">
        <fieldset>
          <legend>Datos del Cliente</legend>
          <label>Nombre Completo:</label>
          <input type="text" placeholder="Ej. Juan Pérez" required />
          <label>Correo Electrónico:</label>
          <input type="email" placeholder="ejemplo@correo.com" required />
          <label>Teléfono:</label>
          <input type="tel" placeholder="123-456-7890" required />
        </fieldset>

        <fieldset>
          <legend>Detalles de la Estancia</legend>
          <label>Fecha de Entrada:</label>
          <input type="date" required />
          <label>Fecha de Salida:</label>
          <input type="date" required />
          <label>Tipo de Habitación:</label>
          <select>
            <option value="estandar">Estandar (Simple)</option>
            <option value="doble">Doble (Familiar)</option>
            <option value="suite">Suite Imperial</option>
          </select>
          <label>Número de Huéspedes:</label>
          <input type="number" min="1" max="6" placeholder="1" required />
        </fieldset>
        
        <button type="submit" className="btn-formulario">Confirmar Reservación</button>
      </form>
    </div>
  );
}

export default Reservaciones;