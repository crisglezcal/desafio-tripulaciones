import React from "react";
import { Link } from "react-router-dom";
import "./Splash.css";

export default function Splash() {
  return (
    <section className="splash">
      <div className="content">
        <img
          src="/media-markt-logo-white.png"
          alt="MediaMarkt Logo"
          className="logo-nto"
        />
        <h1>Bienvenido a la Intranet</h1>
        <p>Acceso interno para empleados de MediaMarkt</p>
      </div>

      <div className="actions">
        <Link to="/login">
          <button className="loginbtn">Log In</button>
        </Link>
      </div>
    </section>
  );
}
