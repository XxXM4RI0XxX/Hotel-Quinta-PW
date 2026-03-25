import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Pagination } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css';

function Inicio({ setPagina }) {

  const [habitaciones, setHabitaciones] = useState([]);

  useEffect(() => {
    fetch("/hab-img/hab_imgs.json")
      .then(res => res.json())
      .then(data => {
        setHabitaciones(data.habs || []);
      });
  }, []);

  return (
    <>
      <section className="seccion-centrada">
        <h2>Tus próximas vacaciones mágicas te esperan con nosotros...</h2>
      </section>

      <section className="fila-informativa">
        <div className="texto-info">
          <h3>¿Quieres salir de lo cotidiano?</h3>
          <p>Descubre la esencia de los Pueblos Mágicos de Michoacán.</p>
        </div>
        {/* Ruta: /resources-tmp/IMG/viejitos.png */}
        <img src="/resources-tmp/IMG/viejitos.png" alt="Danza de los viejitos" className="img-info" />
      </section>

      <section className="fila-informativa reversa">
        <div className="texto-info">
          <h3>Espacio tranquilo para toda la familia</h3>
          <p>Relájate en nuestras instalaciones diseñadas para tu máximo confort.</p>
        </div>
        <img src="/resources-tmp/IMG/hotel-fuera.jpg" alt="Vista exterior del hotel" className="img-info" />
      </section>

      <section className='seccion-centrada'>
        <h3>Habitaciones cómodas con temática de los pueblos mágicos de Michoacán</h3>

        <br/><br/>

        <Swiper modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}>
          {habitaciones.map((img, i) => (
            <SwiperSlide key={i}>
              <img src={img} className="img-habitacion" />
            </SwiperSlide>
          ))}
        </Swiper>

        <br /><br />
        <a
          onClick={() => setPagina('habitaciones')}
          className="btn-secundario"
          style={{ textDecoration: 'none', display: 'inline-block', cursor: 'pointer' }}
        >
          Ver Habitaciones
        </a>
      </section>

      <hr style={{ border: '1px solid rgba(0,0,0,0.1)', margin: '30px 0' }} />

      <section className="seccion-centrada">
        <h2>¿Listo para vivir la magia?</h2>
        <p>Asegura tu lugar en nuestro hotel hoy mismo.</p><br />
        <a
          onClick={() => setPagina('reservaciones')}
          className="btn-primario"
          style={{ textDecoration: 'none', display: 'inline-block', cursor: 'pointer' }}
        >
          Reservar Ahora
        </a>
      </section>
    </>
  );
}

export default Inicio;