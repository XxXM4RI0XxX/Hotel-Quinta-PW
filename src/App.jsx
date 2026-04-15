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

  const bgRef = useRef(null);

  const [pagina, setPagina] = useState('inicio');

  //Seleccion de fechas

  const entradaRef = useRef(null);
  const salidaRef = useRef(null);
  const [activeField, setActiveField] = useState(null);

  const [calendarPos, setCalendarPos] = useState({ left: 0, top: 0 });

  const handleOpenCalendar = (type, ref) => {
    const rect = ref.current.getBoundingClientRect();

    setCalendarPos({
      left: rect.left,
      top: rect.bottom
    });

    setActiveField(type);
  };

  //Range picker
  const [range, setRange] = useState({
    from: undefined,
    to: undefined
  });

  const formatDate = (date) => {
    if (!date) return "";
    return date.toLocaleDateString("es-MX", {
      day: "numeric",
      month: "short"
    });
  };

  useEffect(() => {
    if (range?.from && range?.to) {
      setActiveField(null);
    }
  }, [range]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".booking-bar")) {
        setActiveField(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  //Dropdown

  const [personas, setPersonas] = useState(1);
  const [showPersonas, setShowPersonas] = useState(false);



  //Detectar scroll
  const [scrolled, setScrolled] = useState(false);

  //Para subir el scroll suavemente al cambiar de sección
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pagina]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
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
          <div className="item" ref={entradaRef} onClick={() => handleOpenCalendar("entrada", entradaRef)}>
            <span className="label">Registro de entrada</span>
            <span className="value">
              {range?.from ? formatDate(range.from) : "Entrada"}
            </span>
          </div>

          <div className="divider"></div>

          <div className="item" ref={salidaRef} onClick={() => handleOpenCalendar("salida", salidaRef)}>
            <span className="label">Registrar la salida</span>
            <span className="value">
              {range?.to ? formatDate(range.to) : "Salida"}
            </span>
          </div>

          <div className="divider"></div>

          <div className="item" onClick={() => setShowPersonas(!showPersonas)}>
            <span className="label">Personas</span>
            <span className="value">{personas} persona{personas > 1 && "s"}</span>

            {showPersonas && (
              <div className="dropdown-personas">
                {[1, 2, 3, 4].map((num) => (
                  <div
                    key={num}
                    className="option"
                    onClick={() => {
                      setPersonas(num);
                      setShowPersonas(false);
                    }}
                  >
                    {num} persona{num > 1 && "s"}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="divider"></div>

          <button className="btn-buscar">Buscar</button>

        </div>

        <div className="panel-header">
          <nav className={`nav ${scrolled ? "shrink" : ""}`}>
            <button onClick={() => setPagina('inicio')} className={pagina === 'inicio' ? 'active' : ''}>Inicio</button>
            <span className="nav-sep"></span>
            <button onClick={() => setPagina('habitaciones')} className={pagina === 'habitaciones' ? 'active' : ''}>Habitaciones</button>
            <span className="nav-sep"></span>
            <button onClick={() => setPagina('nosotros')} className={pagina === 'nosotros' ? 'active' : ''}>Nosotros</button>
            <span className="nav-sep"></span>
            <button onClick={() => setPagina('contacto')} className={pagina === 'contacto' ? 'active' : ''}>Contacto</button>
          </nav>
        </div>

        {
          activeField && (
            <div
              className="calendar-popup"
              style={{
                position: "fixed",
                top: calendarPos.top,
                left: calendarPos.left
              }}
            >
              <DayPicker
                mode="range"
                selected={range}
                onSelect={setRange}
                disabled={{ before: new Date() }}
              />
            </div>
          )
        }

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