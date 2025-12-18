import React,{useState} from "react";
// import { useNavigate } from "react-router-dom";
import {getUserById} from "../../../../services/adminServices"
import './SearchUser.css';


const SearchUser = ({setUsers}) => {
  const [input, setInput] = useState("");

  const handleSearch = async () => {
  if (input.trim() === "") return;

  const res = await getUserById(input.trim());
  setUsers([res.data]); // ⚡ Lo envolvemos en un array
  setInput('');
  };
  
  return <div className="searchUser">
    <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Buscar usuario..."
      />
    <button onClick={handleSearch} className="botonBuscar">Buscar</button>
  </div>
};

export default SearchUser;