import React,{useState } from "react";
import SalesList from "../../Main/MktPage/SalesList/SalesList";
import SalesChart from "../../Main/MktPage/SalesChart/SalesChart";
import CustomersList from "../../Main/MktPage/CustomersList/CustomersList";
import ProductsList from "../../Main/MktPage/ProductsList/ProductsList";
import "./MktPage.css";
import ChatBox from "../../Chat/Chatbox/Chatbox";


const MktPage = () => {
  const [showSalesList, setShowSalesList] = useState(false); // controla qué mostrar SalesList/SalesChart
  
  return (
    <section className="mkt-page">
      <header className="mkt-header">
        <h1>📊 Marketing Dashboard</h1>
        
      </header>

      {/* Sección de ventas */}
     {showSalesList ? (
      <SalesList />
        ) : (
      <SalesChart
          onViewSalesList={() => setShowSalesList(true)}
         showViewTableButton={true}
      />
)}
      <CustomersList />
      <ProductsList />
      <ChatBox />

    </section>
  );
};

export default MktPage;
