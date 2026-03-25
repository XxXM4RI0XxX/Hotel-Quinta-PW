import React from 'react';

// 1. Arreglo dinámico (Listo para ser reemplazado por el JSON de Alex)
const habitacionesDestacadas = [
  { 
    id: 102, 
    nombre: "Habitación 102 - Paracho", 
    imagen: "/resources-tmp/IMG/h_paracho1.jpg" 
  },
  { 
    id: 104, 
    nombre: "Habitación 104 - Pátzcuaro", 
    imagen: "/resources-tmp/IMG/h_patzcuaro1.jpg" 
  }
];

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
        
        {/* Elemento dinámico (El bucle .map, dibujará un div con foto y título por cada objeto existente en el arreglo habitacionesDestacadas): */}
        {habitacionesDestacadas.map(hab => (
          <div key={hab.id} className="habitacion-vista-rapida">
            <h4>{hab.nombre}</h4>
            <img src={hab.imagen} alt={hab.nombre} className="img-habitacion" />
          </div>
        ))}
        
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