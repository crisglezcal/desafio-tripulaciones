import React from "react";
// import { useNavigate } from "react-router-dom";
import CreateUserForm from "./CreateUserForm/CreateUserForm"
import './CreateUserContainer.css';

const CreateUserContainer = () => {
  
  return <section className="createUser">
    <h1>Create a New User</h1>
      <CreateUserForm/>
  </section>
};

export default CreateUserContainer;