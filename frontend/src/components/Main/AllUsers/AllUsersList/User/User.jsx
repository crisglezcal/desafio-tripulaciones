import React, { useState } from "react";
import { updateUserById } from "../../../../../services/adminServices";
import './User.css';

const User = ({user, handleDelete, handleUpdateUser }) => {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: user.email,
    employee_id: user.employee_id,
    role: user.role,
    password: ''
  });
  const [msg, setMsg] = useState('');

  //Actualiza formData
   const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };
 
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateUserById(user.user_id, formData);
      handleUpdateUser(res.data); // actualizar en el estado del padre
      setEditing(false);
      setMsg('');
    } catch (error) {
      setMsg(error.msg || 'Error editing user');
    }
  };
  // const email = user.email;
  // const id = user.user_id;
  // const role =user.role;
  // const password =user.password;

  return  (
    <article className="userItem">
      {editing ? (
        <form onSubmit={handleEditSubmit} className="editUserForm">
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          <select name="role" value={formData.role} onChange={handleChange} required>
            <option value="">Select role</option>
            <option value="Mkt">Mkt</option>
            <option value="Hr">Hr</option>
            <option value="Admin">Admin</option>
          </select>
          <input type="password" name="password" placeholder="New password" value={formData.password} onChange={handleChange} />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditing(false)}>Cancel</button>
          {msg && <p className="error">{msg}</p>}
        </form>
      ) : (
        <div>
          <h3>Email: {user.email}</h3>
          <p><b>Id:</b>  {user.user_id}</p>
          <p><b>Role:</b> {user.role}</p>
          
          <div className="userBotonsContain">
            <button onClick={() => handleDelete(user.user_id)} className="deleteButton">Borrar</button>
            <button onClick={() => setEditing(true)} className="editButton">Editar</button>
          </div>
        </div>
      )}
    </article>
  )
};

export default User;