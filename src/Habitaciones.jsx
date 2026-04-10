import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './Habitaciones.css';

function Habitaciones() {
  const [habitaciones, setHabitaciones] = useState([]);
  const [seleccionada, setSeleccionada] = useState(null);

  useEffect(() => {
    fetch("/habitaciones.json") // Conexión al archivo habitaciones.json
      .then(response => response.json())
      .then(data => {
        const base = data.habitaciones || [];

        const guardadas = JSON.parse(localStorage.getItem("habitaciones")) || [];

        setHabitaciones([...base, ...guardadas]);
      })
      .catch(error => console.error("Error:", error));
  }, []);

  return (
    <div className="catalogo-container">
      <h1 className="headline">Habitaciones mágicas para crear recuerdos mágicos</h1>

      <div className="room-grid">
        {habitaciones.map(hab => (
          <div key={hab.id} className="room-card">
            <img src={hab.imagen} alt={hab.nombre} className="img-habitacion" />

            <div className="room-info">
              <h3>{hab.nombre}</h3>
              <p className="price">{hab.precio}</p>

              <button
                className="btn-details"
                onClick={() => setSeleccionada(hab)}
              >
                Ver detalles
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Se usa createPortal para que el modal se dibuje directamente sobre toda la pantalla */}
      {seleccionada && createPortal(
        <div className="modal-overlay" onClick={() => setSeleccionada(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSeleccionada(null)}>
              &times;
            </button>

            <img 
              src={seleccionada.imagen} 
              alt={seleccionada.nombre} 
              className="modal-image" 
            />

            <h2>{seleccionada.nombre}</h2>
            <p className="modal-sub">{seleccionada.precio} por noche</p>
            <p className="modal-desc">{seleccionada.desc}</p>

            <div className="modal-actions">
              <button className="btn-ok" onClick={() => setSeleccionada(null)}>
                Cerrar
              </button>
            </div>
          </div>
        </div>,
        document.body /* Para decirle a React que dibuje el modal en el body */
      )}
    </div>
  );
}

export default Habitaciones;