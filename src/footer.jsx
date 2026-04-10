import React from 'react';

function Footer() {
  return (
    <footer className="site-footer">
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

      <p className="copyright">
        &copy; Hotel Quinta Dalam, 2026
      </p>

      {/* Validadores HTML y CSS */}
      <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <a href="https://validator.w3.org/" target="_blank" rel="noopener noreferrer">
          <img style={{ height: '31px' }} src="https://www.w3.org/assets/logos/w3c-2025/svg/margins/w3c-letters-bg-white.svg" alt="Validador HTML" />
        </a>
        <a href="https://jigsaw.w3.org/css-validator/" target="_blank" rel="noopener noreferrer">
          <img style={{ height: '31px' }} src="https://jigsaw.w3.org/css-validator/images/vcss" alt="Validador CSS" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;