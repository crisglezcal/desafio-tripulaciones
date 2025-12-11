import React from "react";
import Footer from "../Footer/Footer";
import FooterAdmin from "../FooterAdmin";

const Main = ({ children }) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const role = storedUser?.role || "user";

  return (
    <div className="layout-container">
      <main style={{ paddingBottom: "80px" }}>
        {children}
      </main>
      {role === "admin" ? <FooterAdmin /> : <Footer />}
    </div>
  );
};

export default Main;
