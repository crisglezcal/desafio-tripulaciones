import { useEffect, useState } from "react";
import { getProductsPaginated } from "../../../../services/mktServices";
import Pagination from "../../../Pagination/Pagination";

const LIMIT = 10;

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    getProductsPaginated(page, LIMIT)
      .then(res => {
        setProducts(res.data);
        setPagination(res.pagination);
        setError(null);
      })
      .catch(() => setError("Error cargando productos"))
      .finally(() => setLoading(false));
  }, [page]);

  if (loading) return <p className="mkt-loading">⏳ Cargando productos...</p>;
  if (error) return <p className="mkt-error">{error}</p>;
  if (!pagination) return null;

  return (
    <section className="mkt-section">
      <h2>Productos</h2>

      <table className="mkt-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Producto</th>
            <th>Categoría</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.product_id}>
              <td>{p.product_id}</td>
              <td>{p.product_name}</td>
              <td>{p.category}</td>
              <td>{p.unit_price} €</td>
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

export default ProductsList;