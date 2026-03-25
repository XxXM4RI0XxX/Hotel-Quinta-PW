function Navbar({ setPagina }) {
  return (
    <nav className="navbar">
      <h2 className="logo">PonyTec</h2>

      <div className="links">
        <a onClick={() => setPagina("inicio")}>Inicio</a>
        <a onClick={() => setPagina("habitaciones")}>Habitaciones</a>
      </div>
    </nav>
  );
}