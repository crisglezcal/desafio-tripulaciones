import React from "react";
import { Link } from "react-router-dom";
import "../Footer/Footer.css"
import { AiOutlineHome, AiOutlineSearch, AiOutlineUser, AiOutlineShop } from "react-icons/ai";


const Footer = () => {
   return (
   <nav className="footer-nav">
      <Link to="/home"><AiOutlineHome color="black" size={24} /></Link>
      <Link to="/search"><AiOutlineSearch color="black" size={24} /></Link>
      <Link to="/shop"><AiOutlineShop color="black" size={24} /></Link>
      <Link to="/profile"><AiOutlineUser color="black" size={24} /></Link>
    </nav>
  );
}
 
export default Footer;
