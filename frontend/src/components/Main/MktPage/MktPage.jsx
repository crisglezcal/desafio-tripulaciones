import SalesList from "../../Main/MktPage/SalesList/SalesList";
import CustomersList from "../../Main/MktPage/CustomersList/CustomersList";
import ProductsList from "../../Main/MktPage/ProductsList/ProductsList";
import "./MktPage.css";

const MktPage = () => {
  return (
     <section className="mkt-page">
      <h1>📊 Marketing Dashboard</h1>

      <SalesList />
      <CustomersList />
      <ProductsList />
    </section>
  );
};

export default MktPage;
