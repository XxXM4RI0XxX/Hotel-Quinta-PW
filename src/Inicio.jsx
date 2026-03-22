import React from 'react';

function Inicio({ setPagina }) {
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

      <section className="seccion-centrada">
        <h3>Habitaciones cómodas con temática de los pueblos mágicos de Michoacán</h3>
        
        <div className="habitacion-vista-rapida">
          <h4>Habitación 102 - Paracho</h4>
          <img src="/resources-tmp/IMG/h_paracho1.jpg" alt="Habitación Paracho" className="img-habitacion" />
        </div>
        
        <div className="habitacion-vista-rapida">
          <h4>Habitación 104 - Pátzcuaro</h4>
          <img src="/resources-tmp/IMG/h_patzcuaro1.jpg" alt="Habitación Patzcuaro" className="img-habitacion" />
        </div>
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