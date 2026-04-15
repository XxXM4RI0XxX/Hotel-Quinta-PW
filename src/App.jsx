import { useState, useEffect, useRef } from 'react'
import { DayPicker } from "react-day-picker";
import Inicio from './Inicio'
import Habitaciones from './Habitaciones';
import Nosotros from './Nosotros';
import Contacto from './Contacto';
import Reservaciones from './Reservaciones';
import Consulta from './Consulta';
import Footer from './footer'
import "react-day-picker/dist/style.css";

function App() {

  //Day picker import
  function RangePicker() {
  const [range, setRange] = useState({
  from: undefined,
  to: undefined
  });
    return (
      <DayPicker
        mode="range"
        selected={range}
        onSelect={setRange}
      />
    );
  }

  const bgRef = useRef(null);

  const [pagina, setPagina] = useState('inicio');

  //Detectar scroll
  const [scrolled, setScrolled] = useState(false);

  //Para subir el scroll suavemente al cambiar de sección
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' /* Efecto deslizante */
    });
  }, [pagina]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // 🔥 umbral
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY;

      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${scroll * -0.01}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App">
      <div className="bg" ref={bgRef} aria-hidden="true"></div>

      <header className={`hero-top ${scrolled ? "shrink" : ""}`}>
        <img className="hero-logo" src={scrolled ? "/images-src/Logo min.png" : "/images-src/logo.png"} alt="Hotel Quinta Dalam" />

        <div className={`booking-bar ${scrolled ? "shrink" : ""}`}>
          <div className="item">
            <span className="label">Registro de entrada</span>
            <span className="value">sáb, 11 abr</span>
          </div>

          <div className="divider"></div>

          <div className="item">
            <span className="label">Registrar la salida</span>
            <span className="value">dom, 12 abr</span>
          </div>

          <div className="divider"></div>

          <div className="item">
            <span className="label">Personas</span>
            <span className="value">1 persona</span>
          </div>

          <div className="divider"></div>

          <button className="btn-buscar">Buscar</button>

        </div>

        <div className="panel-header">
          <nav className="nav">
            <button onClick={() => setPagina('inicio')} className={pagina === 'inicio' ? 'active' : ''}>Inicio</button>
            <span className="nav-sep"></span>
            <button onClick={() => setPagina('habitaciones')} className={pagina === 'habitaciones' ? 'active' : ''}>Habitaciones</button>
            <span className="nav-sep"></span>
            <button onClick={() => setPagina('nosotros')} className={pagina === 'nosotros' ? 'active' : ''}>Nosotros</button>
            <span className="nav-sep"></span>
            <button onClick={() => setPagina('contacto')} className={pagina === 'contacto' ? 'active' : ''}>Contacto</button>
          </nav>
        </div>
      </header>

      <div className="panel">
        <main className="content">
          {pagina === 'inicio' && <Inicio setPagina={setPagina} />}
          {pagina === 'habitaciones' && <Habitaciones />}
          {pagina === 'nosotros' && <Nosotros />}
          {pagina === 'contacto' && <Contacto />}
          {pagina === 'reservaciones' && <Reservaciones setPagina={setPagina} />}
          {pagina === 'consulta' && <Consulta setPagina={setPagina} />}
        </main>

        <Footer />
      </div>
    </div>
  )
}

export default App