import React from "react";
// import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'
import {logout} from '../../../services/authServices'


 //Hacer Log Out
    const handleLogout = async () => {
    try {
      await logout();
    //   navigate("/");
    } catch (error) {
      console.error("Error en logout", error);
      }
    };

const AdminDashboard = () => {
  
  return <section className="adminDashboard">
      <h1>Hello Admin!</h1>
      <div className="adminButtons">
        <button onClick={handleLogout} >Log Out</button>
        <button ><Link to="/users" >View all Users</Link> </button>
        <button><Link to="/createuser">Add User</Link></button>
        {/* Añadir rutas a los componentes cuand estén hechos */}
        <button>Marketing</button> 
        <button>Human Resources</button> 
      </div>

  </section>
};

export default AdminDashboard;