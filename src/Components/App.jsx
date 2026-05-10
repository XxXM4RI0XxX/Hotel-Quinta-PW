import { useState, useEffect, useRef } from 'react'
import { DayPicker } from "react-day-picker";
import Inicio from '../Pages/Inicio'
import Habitaciones from '../Pages/Habitaciones';
import Nosotros from '../Pages/Nosotros';
import Reservaciones from '../Pages/Reservaciones';
import Consulta from '../Pages/Consulta';
import Login from '../Pages/Login'
import Registro from '../Pages/Registro';
import Perfil from '../Pages/Perfil';
import Admin from '../Pages/Admin';
import Footer from '../Components/footer'
import useAuthPersistence from '../hooks/useAuthPersistence';
import "react-day-picker/dist/style.css";

function App() {

  const bgRef = useRef(null);

  const [pagina, setPagina] = useState('inicio');
  const { usuarioLogueado, setUsuarioLogueado, clearSession, isLoading } = useAuthPersistence();

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
      {isLoading ? (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 10000,
          color: 'white',
          fontSize: '18px'
        }}>
          Verificando sesión...
        </div>
      ) : (
        <>
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

                {/* Si NO hay nadie logueado, mostramos acceso y registro */}
                {!usuarioLogueado && (
                  <>
                    <span className="nav-sep"></span>
                    <button onClick={() => setPagina('login')} className={pagina === 'login' ? 'active' : ''}>Iniciar sesión</button>
                    <span className="nav-sep"></span>
                    <button onClick={() => setPagina('registro')} className={pagina === 'registro' ? 'active' : ''}>Registro</button>
                  </>
                )}

                {/* Si HAY alguien logueado, mostramos Perfil y el botón de Salir */}
                {usuarioLogueado && (
                  <>
                    <span className="nav-sep"></span>
                    <button onClick={() => setPagina('perfil')} className={pagina === 'perfil' ? 'active' : ''}>Perfil</button>

                    {/* Solo mostramos el botón de Admin si el rol es exactamente ROLE_ADMIN */}
                    {usuarioLogueado.rol === 'ROLE_ADMIN' && (
                      <>
                        <span className="nav-sep"></span>
                        <button onClick={() => setPagina('admin')} className={pagina === 'admin' ? 'active' : ''}>Admin</button>
                      </>
                    )}

                    <span className="nav-sep"></span>
                    <button
                      onClick={() => { clearSession(); setPagina('inicio'); }}
                      style={{ color: '#c00', fontWeight: 'bold' }}
                    >
                      Salir
                    </button>
                  </>
                )}
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
              {pagina === 'habitaciones' && <Habitaciones setPagina={setPagina} />}
              {pagina === 'nosotros' && <Nosotros />}
              {pagina === 'reservaciones' && <Reservaciones setPagina={setPagina} />}
              {pagina === 'consulta' && <Consulta setPagina={setPagina} />}
              {pagina === 'login' && <Login setPagina={setPagina} setUsuarioLogueado={setUsuarioLogueado} />}
              {pagina === 'registro' && <Registro setPagina={setPagina} />}
              {pagina === 'perfil' && <Perfil usuarioLogueado={usuarioLogueado} setUsuarioLogueado={setUsuarioLogueado} />}
              {pagina === 'admin' && <Admin usuarioLogueado={usuarioLogueado} />}
            </main>

            <Footer />
          </div>
        </>
      )}
    </div>
  )
}

export default App