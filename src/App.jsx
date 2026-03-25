import { useState, useEffect } from 'react'
import './App.css'
import Inicio from './Inicio'
import Habitaciones from './Habitaciones';
import Nosotros from './Nosotros';
import Contacto from './Contacto';
import Reservaciones from './Reservaciones';
import Consulta from './Consulta';
import Footer from './footer'

function App() {
  const [pagina, setPagina] = useState('inicio');
  //Para subir el scroll suavemente al cambiar de sección
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' /* Efecto deslizante */
    });
  }, [pagina]);

  return (
    <div className="App">
      <div className="bg" aria-hidden="true"></div>

      <header className="hero-top">
        <img className="hero-logo" src="/images-src/logo.png" alt="Hotel Quinta Dalam" />
      </header>

      <div className="panel">
        <header className="panel-header">
          <nav className="nav">
            <a onClick={() => setPagina('inicio')} className={pagina === 'inicio' ? 'active' : ''}>Inicio</a>
            <span className="nav-sep"></span>
            <a onClick={() => setPagina('habitaciones')} className={pagina === 'habitaciones' ? 'active' : ''}>Habitaciones</a>
            <span className="nav-sep"></span>
            <a onClick={() => setPagina('nosotros')} className={pagina === 'nosotros' ? 'active' : ''}>Nosotros</a>
            <span className="nav-sep"></span>
            <a onClick={() => setPagina('contacto')} className={pagina === 'contacto' ? 'active' : ''}>Contacto</a>
          </nav>
        </header>

        <main className="content">
          {pagina === 'inicio' && <Inicio setPagina={setPagina}/>}
          {pagina === 'habitaciones' && <Habitaciones/>}
          {pagina === 'nosotros' && <Nosotros/>}
          {pagina === 'contacto' && <Contacto/>}
          {pagina === 'reservaciones' && <Reservaciones setPagina={setPagina}/>}
          {pagina === 'consulta' && <Consulta setPagina={setPagina}/>}
        </main>

        <Footer />
      </div>
    </div>
  )
}

export default App