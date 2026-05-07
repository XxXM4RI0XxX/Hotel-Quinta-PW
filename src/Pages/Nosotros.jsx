import React from 'react';
import '../Desing/Nosotros.css';

function Nosotros() {
  return (
    <div className="nosotros-main-container">
      <section className="nosotros-header-section">
        <h2 className="nosotros-title">¿Quiénes somos?</h2>
        <p className="nosotros-intro-text">
          Somos un hotel comprometido con brindar una experiencia auténtica y mágica en el corazón de Michoacán. 
          Nuestro objetivo es que cada huésped se lleve un recuerdo inolvidable de nuestras tradiciones.
        </p>
      </section>
      
      <div className="nosotros-grid-layout">
        <div className="nosotros-card-original">
          <h3>Nuestra Misión</h3>
          <p>Ofrecer hospitalidad de excelencia resaltando la cultura y calidez michoacana en cada detalle de nuestro servicio.</p>
        </div>
        <div className="nosotros-card-original">
          <h3>Nuestra Visión</h3>
          <p>Ser el referente de descanso y tradición en la región, preservando la esencia de los Pueblos Mágicos.</p>
        </div>
        <div className="nosotros-card-original">
          <h3>Nuestros Valores</h3>
          <p>Hospitalidad, Tradición, Calidad, Compromiso y Respeto por nuestra cultura.</p>
        </div>
      </div>
    </div>
  );
}

export default Nosotros;