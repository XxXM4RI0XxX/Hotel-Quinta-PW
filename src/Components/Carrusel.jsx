import Carrusel from "./Carrusel";

function Modal({ habitacion, cerrar }) {
  if (!habitacion) return null;

  return (
    <div className="modal-overlay" onClick={cerrar}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>

        <button className="modal-close" onClick={cerrar}>
          &times;
        </button>

        <h2>{habitacion.nombre}</h2>
        <p>{habitacion.precio} por noche</p>

        {/* 🔥 Aquí vive el carrusel */}
        <Carrusel imagenes={habitacion.imagenes} />

        <p>{habitacion.desc}</p>

      </div>
    </div>
  );
}

export default Modal;