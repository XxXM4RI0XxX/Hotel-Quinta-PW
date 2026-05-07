import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../Desing/Habitaciones.css';

function Habitaciones({setPagina}) {
  const [habitaciones, setHabitaciones] = useState([]);
  const [seleccionada, setSeleccionada] = useState(null);

  useEffect(() => {
    fetch("/habitaciones.json")
      .then(res => res.json())
      .then(data => setHabitaciones(data.habitaciones || []))
      .catch(err => console.error("Error al cargar habitaciones:", err));
  }, []);

  return (
    <div className="catalogo-container">
      <h1 className="headline">Elige tu rincón mágico en Quinta Dalam</h1>
      
      <div className="room-grid">
        {habitaciones.map(hab => (
          <div key={hab.id} className="room-card">
            <img src={hab.imagen} alt={hab.nombre} className="img-habitacion" />
            <div className="room-info">
              <h3>{hab.nombre}</h3>
              <p className="price">{hab.precio} / noche</p>
              <button className="btn-details" onClick={() => setSeleccionada(hab)}>
                Ver detalles
              </button>
            </div>
          </div>
        ))}
      </div>

      {seleccionada && createPortal(
        <div className="modal-overlay" onClick={() => setSeleccionada(null)}>
          <div className="modal-expandido" onClick={e => e.stopPropagation()}>
            
            <div className="modal-layout">
              {/* Lado Izquierdo: Galería */}
              <div className="modal-gallery">
                <Swiper 
                  modules={[Navigation, Pagination]} 
                  navigation 
                  pagination={{ clickable: true }}
                  loop={true}
                  className="swiper-modal"
                >
                  <SwiperSlide><img src={seleccionada.imagen} alt="Principal" /></SwiperSlide>
                  {seleccionada.imagenes.map((img, idx) => (
                    <SwiperSlide key={idx}><img src={img} alt={`Detalle ${idx + 1}`} /></SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Lado Derecho: Info */}
              <div className="modal-details-panel">
                <button className="modal-close-btn" onClick={() => setSeleccionada(null)}>&times;</button>
                
                <h2>{seleccionada.nombre}</h2>
                
                <div className="room-badges">
                  <span className="badge-cap">👤 Capacidad: {seleccionada.capacidad} {seleccionada.capacidad === 1 ? 'persona' : 'personas'}</span>
                  <span className="badge-price">{seleccionada.precio}</span>
                </div>

                <div className="detail-section">
                  <h4>Descripción</h4>
                  <p>{seleccionada.desc}</p>
                </div>

                <div className="detail-section">
                  <h4>Amenidades incluídas</h4>
                  <ul className="amenidades-grid">
                    {seleccionada.amenidades.map((am, i) => (
                      <li key={i}>✨ {am}</li>
                    ))}
                  </ul>
                </div>

                <div className="modal-action-footer">
                  <button 
                    className="btn-close-modal" 
                    onClick={() => {
                      // 1. Se guarda el nombre de la habitación en la memoria del navegador
                      sessionStorage.setItem('habitacionPreseleccionada', seleccionada.nombre);
                      // 2. Se cierra el modal
                      setSeleccionada(null);
                      // 3. Redirección al formulario Reservaciones
                      setPagina('reservaciones');
                    }}>
                    Reservar Ahora
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

export default Habitaciones;