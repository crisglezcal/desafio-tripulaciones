import React from "react";
import { Route, Routes, Navigate } from 'react-router-dom'

import AdminDashboard from "./AdminDashboard/AdminDashboad";
import CreateUserContainer from "./CreateUserContainer/CreateUserContainer"
import AllUsers from "./AllUsers/AllUsers"

const Main = () => {
  return <main>
    <Routes>
        <Route path='/admin'element={<AdminDashboard/>}/>
        <Route path='/createuser'element={<CreateUserContainer/>}/>
        <Route path='/users'element={<AllUsers/>}/>
    </Routes>
  </main>;
};

export default Main;