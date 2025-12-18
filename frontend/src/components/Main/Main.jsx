import { Routes, Route } from "react-router-dom";
import Layout from "../Layout/Layout";

import AdminDashboard from "./AdminDashboard/AdminDashboad";
import CreateUserContainer from "./CreateUserContainer/CreateUserContainer";
import AllUsers from "./AllUsers/AllUsers";
import Splash from "./Splash/Splash";
import Login from "./Login/Login";
import MktPage from "./MktPage/MktPage";
import HrPage from "./HrPage/HrPage";

const Main = () => {
  return (
    <Routes>
      {/* SIN layout */}
      <Route path="/" element={<Splash />} />
      <Route path="/login" element={<Login />} />

      {/* CON layout */}
      <Route element={<Layout />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/createuser" element={<CreateUserContainer />} />
        <Route path="/users" element={<AllUsers />} />
        <Route path="/mkt" element={<MktPage />} />
        <Route path="/hr" element={<HrPage />} />
      </Route>
    </Routes>
  );
};

export default Main;
