import React from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";
import ChatBox2 from "../../Chat/Chatbox/Chatbox2";


const AdminDashboard = () => {
  return (
    <section className="adminDashboard">
      <header className="adminHeader">
        <h1>Panel de Administración</h1>
      </header>

      <p className="adminSubtitle">
        Gestión interna de Globomarket
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

      </div>

    </section>
  );
};

export default AdminDashboard;
