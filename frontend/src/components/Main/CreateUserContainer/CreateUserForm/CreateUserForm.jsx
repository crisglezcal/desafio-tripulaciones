import React , {useState} from "react";
import { Link } from 'react-router-dom'
import {createUser} from "../../../../services/adminServices"
import './CreateUserForm.css';
import Swal from 'sweetalert2';

const CreateUserForm = () => {
  const [userData, setUserData] = useState({ email:'', role: '', password: '' });
  const [msg, setMsg] = useState('');


  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
   console.log("Submit fired", userData); 
  //Regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //no espacios/ unico @
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,16}$/; //al menos(1numeros + 1mayusc + 1minusc)(8-16 caract)

  if (!emailRegex.test(userData.email)) {
      return setMsg("Enter a valid email address");
    }

  if (!passwordRegex.test(userData.password)) {
      return setMsg("The password must be at least 8 characters long, with 1 number and 1 uppercase letter");
    }
  try {
      const res = await createUser (userData); 
     
      Swal.fire({
      icon: 'success',
      title: 'Usuario creado',
      text: res.msg || 'Usuario creado con éxtito!',
    });
      setUserData({ email: '', role: '', password: '' });
      setMsg(''); // opcional: limpiar mensaje de error
  } catch (error) {
      Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.msg || 'Error creating user',
    });
      }
  }
  return <form onSubmit={handleSubmit} className="userForm">
    <input
        type="email"
        name="email"
        placeholder="Email"
        value={userData.email}
        onChange={handleChange}
        required
      />
      <select name="role" value={userData.role} onChange={handleChange} required>
        <option value="">Seleccionar rol</option>
        <option value="mkt">Marketing</option>
        <option value="hr">Recursos Humanos</option>
        <option value="admin">Administración</option>
      </select>
      <input
        type="password"
        name="password"
        placeholder="password"
        value={userData.password}
        onChange={handleChange}
        required
      />
      <div className="userFormButtons">
  <button type="submit">Añadir Usuario</button>

  <button type="button">
    <Link to="/users">Ver Todos los Usuarios</Link>
  </button>
</div>
  </form>
};

export default CreateUserForm;