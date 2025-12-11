import React from "react";

import { Outlet } from "react-router-dom";
import "../../pages/Admin/Admin.css";

const Admin = () => {

  return (
    <section className="admin-section">
      <h1>Admin Dashboard</h1>
       <Outlet />
    </section>
  );
};

export default Admin;
