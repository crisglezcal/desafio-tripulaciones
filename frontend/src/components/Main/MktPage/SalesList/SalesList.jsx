import { useEffect, useState } from "react";
import { getSalesPaginated  } from "../../../../services/mktServices";
import Pagination from "../../../Pagination/Pagination";
const LIMIT = 10;

const SalesList = () => {
  const [sales, setSales] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    getSalesPaginated(page, LIMIT)
      .then(res => {
        setSales(res.data);
        setPagination(res.pagination);
        setError(null);
      })
      .catch(err => {
        console.error(err);
        setError("Error loading sales");
      })
      .finally(() => setLoading(false));
  }, [page]);

  if (loading) return <p className="mkt-loading">⏳ Cargando ventas...</p>;
  if (error) return <p className="mkt-error">{error}</p>;
  if (!pagination) return null;

  return (
    <section className="mkt-section">
  <h2>Ventas</h2>

  <table className="mkt-table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Cliente</th>
        <th>Producto</th>
        <th>Cantidad</th>
        <th>Total</th>
        <th>Fecha</th>
      </tr>
    </thead>
    <tbody>
      {sales.map(sale => (
        <tr key={sale.sale_id}>
          <td>{sale.sale_id}</td>
          <td>{sale.first_name_customer} {sale.last_name_customer}</td>
          <td>{sale.product_name}</td>
          <td>{sale.quantity}</td>
          <td>{sale.total} €</td>
          <td>{new Date(sale.sale_timestamp).toLocaleString()}</td>
        </tr>
      ))}
    </tbody>
  </table>

  <Pagination
    currentPage={pagination.page}
    totalPages={pagination.totalPages}
    onPageChange={setPage}
  />
</section>
  );
};

export default SalesList;