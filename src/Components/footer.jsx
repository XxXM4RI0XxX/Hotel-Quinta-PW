import React from 'react';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        
        {/* Columna 1: Información de Contacto */}
        <div className="footer-section">
          <h4 className="footer-title">Contacto</h4>
          <p>📞 443 123 4567</p>
          <p>✉️ contacto@quintadalam.com</p>
          <p>📍 Calle Arboledas #123, Centro Histórico, Morelia, Mich.</p>
        </div>

        {/* Columna 2: Mapa de Ubicación */}
        <div className="footer-section">
          <h4 className="footer-title">Ubicación</h4>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15025.26330030501!2d-101.1963!3d19.7028!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842d0e70788c0ab9%3A0x6d90060d4c18f15!2sCentro%20Hist%C3%B3rico%20de%20Morelia%2C%20Mich.!5e0!3m2!1ses-419!2smx!4v1713150000000!5m2!1ses-419!2smx" 
            width="100%" 
            height="120" 
            style={{ border: 0, borderRadius: '8px' }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade">
          </iframe>
        </div>

        {/* Columna 3: Redes Sociales y Legal */}
        <div className="footer-section footer-social">
          <h4 className="footer-title">Síguenos</h4>
          <div className="social-links">
            <a className="social-link" href="https://www.facebook.com/profile.php?id=61584681841684" target="_blank" rel="noopener noreferrer">
              <img src="/images-src/facebook.png" alt="Facebook" className="social-icon" />
            </a>
            <a className="social-link" href="https://www.instagram.com/quintadalam" target="_blank" rel="noopener noreferrer">
              <img src="/images-src/instagram.png" alt="Instagram" className="social-icon" />
            </a>
            <a className="social-link" href="https://www.tiktok.com/@quintadalam" target="_blank" rel="noopener noreferrer">
              <img src="/images-src/tiktok.png" alt="TikTok" className="social-icon" />
            </a>
          </div>
          
          <div className="validators-container">
            <a href="https://validator.w3.org/" target="_blank" rel="noopener noreferrer">
              <img style={{ height: '31px' }} src="https://www.w3.org/assets/logos/w3c-2025/svg/margins/w3c-letters-bg-white.svg" alt="Validador HTML" />
            </a>
            <a href="https://jigsaw.w3.org/css-validator/" target="_blank" rel="noopener noreferrer">
              <img style={{ height: '31px' }} src="https://jigsaw.w3.org/css-validator/images/vcss" alt="Validador CSS" />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="copyright">&copy; Hotel Quinta Dalam, 2026</p>
      </div>
    </footer>
  );
}

export default Footer;