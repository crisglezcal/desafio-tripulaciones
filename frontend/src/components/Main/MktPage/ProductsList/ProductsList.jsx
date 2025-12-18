import { useEffect, useState } from "react";
import { getProductsPaginated } from "../../../../services/mktServices";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  LabelList
} from "recharts";
import Pagination from "../../../Pagination/Pagination";
import "./ProductsList.css";

const LIMIT = 10;

const CATEGORY_COLORS = {
  ropa: "#FF6B6B",
  deportes: "#4ECDC4",
  juguetes: "#FFD166",
  hogar: "#06D6A0",
  electrónica: "#118AB2",
  "Sin categoría": "#A0A0A0"
};

const CATEGORY_ALIASES = {
  "ropa deportiva": "ropa",
  "ropa casual": "ropa",
  "ropa formal": "ropa",
  deporte: "deportes",
  deportivos: "deportes",
  juguete: "juguetes",
  "hogar y jardín": "hogar",
  "electrónica y tecnología": "electrónica",
  "electrónica y electricidad": "electrónica",
  electrónicos: "electrónica",
  electronicos: "electrónica"
};

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const [chartData, setChartData] = useState([]);
  const [categoryStats, setCategoryStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    getProductsPaginated(page, LIMIT)
      .then(res => {
        setProducts(res.data);
        setPagination(res.pagination);

        const normalizedData = res.data.map(p => {
          let category = (p.category || "Sin categoría").toLowerCase().trim();
          if (CATEGORY_ALIASES[category]) category = CATEGORY_ALIASES[category];
          return { ...p, normalizedCategory: category };
        });

        setChartData(
          normalizedData.map(p => ({
            id: p.product_id,
            name:
              p.product_name.length > 15
                ? p.product_name.slice(0, 15) + "..."
                : p.product_name,
            precio: Number(p.unit_price) || 0,
            categoria: p.normalizedCategory,
            fullName: p.product_name,
            color:
              CATEGORY_COLORS[p.normalizedCategory] ||
              CATEGORY_COLORS["Sin categoría"]
          }))
        );

        setCategoryStats(
          normalizedData.reduce((acc, p) => {
            const price = Number(p.unit_price) || 0;
            const cat = p.normalizedCategory;

            if (!acc[cat]) {
              acc[cat] = {
                count: 0,
                totalPrice: 0,
                minPrice: Infinity,
                maxPrice: 0
              };
            }

            acc[cat].count++;
            acc[cat].totalPrice += price;
            acc[cat].minPrice = Math.min(acc[cat].minPrice, price);
            acc[cat].maxPrice = Math.max(acc[cat].maxPrice, price);

            return acc;
          }, {})
        );

        setError(null);
      })
      .catch(() => setError("Error cargando productos"))
      .finally(() => setLoading(false));
  }, [page]);

  if (loading) return <p className="mkt-loading">Cargando...</p>;
  if (error) return <p className="mkt-error">{error}</p>;
  if (!pagination) return null;

  const formatPrice = price =>
    price === Infinity
      ? "N/A"
      : new Intl.NumberFormat("es-ES", {
          style: "currency",
          currency: "EUR"
        }).format(price);

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    const d = payload[0].payload;

    return (
      <div className="custom-tooltip">
        <strong>{d.fullName}</strong>
        <p>{formatPrice(d.precio)}</p>
      </div>
    );
  };

  return (
    <section className="mkt-section">
      <h2>Productos</h2>

      {/* GRÁFICO */}
      <div className="mkt-chart-container">
        <ResponsiveContainer height={350}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="precio">
              {chartData.map((e, i) => (
                <Cell key={i} fill={e.color} />
              ))}
              <LabelList dataKey="precio" position="top" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* TABLA */}
      <div className="table-responsive">
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
                <td>#{p.product_id}</td>
                <td>{p.product_name}</td>
                <td>{p.category}</td>
                <td>{formatPrice(p.unit_price)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ PAGINACIÓN CORRECTA */}
      <Pagination
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        onPageChange={setPage}
      />
    </section>
  );
};

export default ProductsList;
