import { useEffect, useState } from "react";
import { getCustomersPaginated } from "../../../../services/mktServices";
import Pagination from "../../../Pagination/Pagination";


const LIMIT = 10;

const CustomersList = () => {
  const [customers, setCustomers] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    getCustomersPaginated(page, LIMIT)
      .then(res => {
        setCustomers(res.data);
        setPagination(res.pagination);
        setError(null);
      })
      .catch(() => setError("Error cargando clientes"))
      .finally(() => setLoading(false));
  }, [page]);

  if (loading) return <p className="mkt-loading">⏳ Cargando clientes...</p>;
  if (error) return <p className="mkt-error">{error}</p>;
  if (!pagination) return null;

  return (
    <section className="mkt-section">
      <h2>Clientes</h2>
      <div className="table-wrapper">
        <table className="mkt-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Región</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(c => (
              <tr key={c.customer_id}>
                <td>{c.customer_id}</td>
                <td>
                  {c.first_name_customer} {c.last_name_customer}
                </td>
                <td>{c.email}</td>
                <td>{c.region}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        onPageChange={setPage}
      />
    </section>
  );
};

export default CustomersList;