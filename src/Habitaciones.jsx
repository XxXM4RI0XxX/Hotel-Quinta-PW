import React, { useState } from 'react';
import './Habitaciones.css';

const listaHabitaciones = [
  { id: 101, nombre: "101 - Tlalpujahua", precio: "$1,800", imagen: "/resources-tmp/IMG/h_tlalpujahua1.jpg", desc: "Inspirada en el pueblo de la eterna Navidad. Cuenta con detalles en cantera y una atmósfera acogedora." },
  { id: 102, nombre: "102 - Paracho", precio: "$1,500", imagen: "/resources-tmp/IMG/h_paracho1.jpg", desc: "Habitación dedicada a la capital de la guitarra. Incluye decoraciones de madera fina y excelente iluminación." },
  { id: 103, nombre: "103 - Angangueo", precio: "$1,700", imagen: "/resources-tmp/IMG/h_angangueo1.jpg", desc: "Rinde homenaje a la mariposa monarca. Un espacio tranquilo con vistas al jardín interior." },
  { id: 104, nombre: "104 - Pátzcuaro", precio: "$2,200", imagen: "/resources-tmp/IMG/h_patzcuaro1.jpg", desc: "Nuestra suite principal con temática del lago. Espaciosa y con acabados artesanales de alta calidad." },
  { id: 105, nombre: "105 - Santa Clara del Cobre", precio: "$1,900", imagen: "/resources-tmp/IMG/h_cobre1.jpg", desc: "Decorada con auténticas piezas de cobre martillado. Refleja la calidez y el brillo de este pueblo mágico." },
  { id: 106, nombre: "106 - Cuitzeo", precio: "$1,600", imagen: "/resources-tmp/IMG/h_cuitzeo1.jpg", desc: "Un rincón de paz inspirado en la laguna. Tonos frescos y diseño minimalista rústico." },
  { id: 107, nombre: "107 - Jiquilpan", precio: "$1,550", imagen: "/resources-tmp/IMG/h_jiquilpan1.jpg", desc: "La habitación de los jacarandás. Un espacio lleno de luz y colores suaves para un descanso total." },
  { id: 108, nombre: "108 - Tzintzuntzan", precio: "$2,000", imagen: "/resources-tmp/IMG/h_tzintzuntzan1.jpg", desc: "Inspirada en el lugar de colibríes. Posee una decoración ancestral y una cama king size." },
  { id: 109, nombre: "109 - Tacámbaro", precio: "$1,750", imagen: "/resources-tmp/IMG/h_tacambaro1.jpg", desc: "El balcón de tierra caliente. Frescura y confort se unen en esta habitación temática." }
];

function Habitaciones() {
  const [seleccionada, setSeleccionada] = useState(null);

  return (
    <div className="catalogo-container">
      <h1 className="headline">Habitaciones mágicas para crear recuerdos mágicos</h1>
      <div className="room-grid">
        {listaHabitaciones.map(hab => (
          <div key={hab.id} className="room-card">
            <img src={hab.imagen} alt={hab.nombre} className="img-habitacion" />
            <div className="room-info">
              <h3>{hab.nombre}</h3>
              <p className="price">{hab.precio}</p>
              <button className="btn-details" onClick={() => setSeleccionada(hab)}>Ver detalles</button>
            </div>
          </div>
        ))}
      </div>

      {seleccionada && (
        <div className="modal-overlay" onClick={() => setSeleccionada(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSeleccionada(null)}>&times;</button>
            <h2>{seleccionada.nombre}</h2>
            <p className="modal-sub">{seleccionada.precio} por noche</p>
            <p className="modal-desc">{seleccionada.desc}</p>
            <div className="modal-actions">
              <button className="btn-ok" onClick={() => setSeleccionada(null)}>Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Habitaciones;