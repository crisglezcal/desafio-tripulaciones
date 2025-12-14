import React from "react";
import { Route, Routes, Navigate } from 'react-router-dom'

import AdminDashboard from "./AdminDashboard/AdminDashboad";
import CreateUserContainer from "./CreateUserContainer/CreateUserContainer"
import AllUsers from "./AllUsers/AllUsers"
import Splash from "../Main/Splash/Splash";
import Login from "../Main/Login/Login";

const Main = () => {
  return <main>
    <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/login" element={<Login />} />
        <Route path='/admin'element={<AdminDashboard/>}/>
        <Route path='/createuser'element={<CreateUserContainer/>}/>
        <Route path='/users'element={<AllUsers/>}/>
    </Routes>
  </main>;
};

export default Main;