import React , {useState} from "react";
import { Link } from 'react-router-dom'
import {createUser} from "../../../../services/adminServices"
import './CreateUserForm.css';

const CreateUserForm = () => {
  const [userData, setUserData] = useState({ email:'', role: '', password: '' });
  const [msg, setMsg] = useState('');


  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
   console.log("Submit fired", userData); // <- aquí
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
     
      alert(res.msg || "User created successfully!");
      setUserData({ email: '', role: '', password: '' });
      setMsg(''); // opcional: limpiar mensaje de error
  } catch (error) {
        setMsg(error.msg || 'Error creating user');
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
        <option value="">Select a role</option>
        <option value="mkt">mkt</option>
        <option value="hr">hr</option>
        <option value="admin">admin</option>
      </select>
      <input
        type="password"
        name="password"
        placeholder="password"
        value={userData.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Add User</button>
      {msg && <p className="error">{msg}</p>}
      <button type="button"><Link to="/users">See All Users</Link></button>
  </form>
};

export default CreateUserForm;