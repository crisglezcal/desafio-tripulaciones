import React from "react";
import { Link } from "react-router-dom";
import "../FooterAdmin/FooterAdmin.css";
import { AiOutlineDashboard, AiOutlineUser, AiOutlineBook } from "react-icons/ai";

const FooterAdmin = () => {
  return (
    <nav className="footer-nav">
      <Link to="/admin/bookings"><AiOutlineDashboard color="black" size={24} /></Link>
      <Link to="/admin/users"><AiOutlineBook color="black" size={24} /></Link>
      <Link to="/profile"><AiOutlineUser color="black" size={24} /></Link>
    </nav>
  );
}

export default FooterAdmin;
