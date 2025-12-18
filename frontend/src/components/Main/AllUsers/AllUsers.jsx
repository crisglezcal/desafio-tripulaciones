import React, {useEffect, useState} from "react";
import SearchUser from "./SearchUser/SearchUser";
import AllUsersList from "./AllUsersList/AllUsersList";
import './AllUsers.css';
import { Circles } from 'react-loader-spinner';


import { getAllUsers, deleteUserById,} from "../../../services/adminServices";
//  updateUserById FALTA AÑADIR

const AllUsers = () => {
  //ESTADOS
  const [users, setUsers] = useState([]); //Users mostrados API
  const [loading, setLoading] = useState(true); // Estado de carga
  
//LLAMADA API ALL USERS
  useEffect(()=>{
    const fetchUsers = async () => {
      setLoading(true); // inicio carga
      try{
        const res = await getAllUsers ();
        setUsers(res.data); 
      }catch(error){
        console.error("Error fetching users data:", error);
      }finally {
        setLoading(false); // fin carga
      }
    };
    fetchUsers();
}, []);
//DELETE
 const handleDelete = async (user_id) => {
        try {
            await deleteUserById(user_id);
            setUsers(users => users.filter(u => u.user_id !== user_id));
        } catch (error) {
            console.error(error);
        }
  };
  //EDIT
  const handleUpdateUser = (updatedUser) => {
  setUsers(prev =>
    prev.map(u => (u.user_id === updatedUser.user_id ? updatedUser : u))
  );
};

  return <section className="allUsers">
    <h1>Usuarios</h1>
    <div className="search">
      <SearchUser setUsers={setUsers}/>
    </div>
    {/* <AllUsersList users={users} handleDelete={handleDelete} handleUpdateUser={handleUpdateUser}/> */}
    {loading ? (
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh"
        }}>
          <Circles
            height="80"
            width="80"
            color="#606062ff"
            ariaLabel="loading"
          />
        </div>
      ) : (
        <AllUsersList
          users={users}
          handleDelete={handleDelete}
          handleUpdateUser={handleUpdateUser}
          loading={loading}
        />
      )}

  </section>
};

export default AllUsers;