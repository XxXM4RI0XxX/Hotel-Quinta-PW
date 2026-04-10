import React from 'react';
import './Contacto.css';

function Contacto() {
  return (
    <section className="contact-section">
      <h1 className="headline">Contáctanos</h1>
      <div className="contact-card">
        <div className="contact-intro">
          <p className="contact-lead">Estamos para servirte. Elige el medio de tu preferencia:</p>
          <img src="/images-src/contacto.png" alt="Icono Contacto" className="contact-icon" />
        </div>
        <div className="contact-list">
          <div className="contact-row">
            <span className="contact-label">Teléfono:</span>
            <span className="contact-value">443 123 4567</span>
          </div>
          <div className="contact-row">
            <span className="contact-label">Email:</span>
            <span className="contact-value">contacto@quintadalam.com</span>
          </div>
          <div className="contact-row">
            <span className="contact-label">Dirección:</span>
            <span className="contact-value">Calle Arboledas #123, Centro Histórico, Morelia.</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contacto;