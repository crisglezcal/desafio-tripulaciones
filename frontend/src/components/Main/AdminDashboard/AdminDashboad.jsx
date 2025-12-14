import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../../services/authServices";
import "./AdminDashboard.css";

const handleLogout = async () => {
  try {
    await logout();
  } catch (error) {
    console.error("Error en logout", error);
  }
};

const AdminDashboard = () => {
  return (
    <section className="adminDashboard">
      <header className="adminHeader">
        <h1>Panel de Administración</h1>
        <button className="logoutBtn" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </header>

      <p className="adminSubtitle">
        Gestión interna de MediaMarkt
      </p>

      <div className="adminGrid">
        <Link to="/users" className="adminCard">
          <h2>👥 Usuarios</h2>
          <p>Ver y gestionar empleados del sistema</p>
        </Link>

        <Link to="/createuser" className="adminCard">
          <h2>➕ Alta de usuario</h2>
          <p>Crear nuevos empleados y asignar roles</p>
        </Link>

        <div className="adminCard disabled">
          <h2>📣 Marketing</h2>
          <p>Campañas y comunicación interna</p>
        </div>

        <div className="adminCard disabled">
          <h2>🧑‍💼 Recursos Humanos</h2>
          <p>Gestión de personal y formación</p>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
