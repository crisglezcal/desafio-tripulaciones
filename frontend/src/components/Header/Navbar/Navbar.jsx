import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img
          src="/logo_globomarket_white.png"
          alt="Globomarket Logo"
          className="navbar-logo"
        />
      </div>

      <ul className="navbar-links">
        {role === "admin" && <li><Link to="/admin">Admin</Link></li>}
        {role === "mkt" && <li><Link to="/mkt">Marketing</Link></li>}
        {role === "hr" && <li><Link to="/hr">RRHH</Link></li>}
      </ul>

      <button className="logoutBtn" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </nav>
  );
};

export default Navbar;
