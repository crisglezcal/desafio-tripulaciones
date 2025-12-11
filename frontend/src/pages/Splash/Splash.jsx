import React from "react";
import { Link } from "react-router-dom";
import "../Splash/Splash.css";



export default function Splash() {
  return (
    <section className="splash">
      <div className="content">
      <img src="/assets/NTO.webp" className="logo-nto" ></img>
      </div>
      <div className="actions">
        <Link to="/login"><button className="loginbtn">Log In</button></Link>
        <Link to="/register"><button className="registerbtn">Sign Up</button></Link>
      </div>
    </section>
  );
}