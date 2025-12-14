import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TbArrowBackUp } from "react-icons/tb";
import { login } from "../../../services/authServices";
import "../Login/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      const user = data.user;

      if (!user || !user.role) {
        alert("Error inesperado en el servidor");
        return;
      }

      if (user.role === "admin") {
        navigate("/admin/bookings");
      } else {
        navigate("/home");
      }
    } catch (err) {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <section className="login-section">
      <div className="login-card">
        <div className="login-header">
          <Link to="/" className="back-btn">
            <TbArrowBackUp size={22} />
          </Link>
          <img
            src="/mediamarkt_logo.png"
            alt="MediaMarkt Logo"
            className="login-logo"
          />
          <h1>Acceso Intranet</h1>
          <p>Empleados MediaMarkt</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email corporativo"
            required
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            required
          />

          <button className="login-btn" type="submit">
            Iniciar sesión
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
