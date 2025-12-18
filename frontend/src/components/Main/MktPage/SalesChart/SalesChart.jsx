import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { getSalesPaginated } from "../../../../services/mktServices";
import './SalesChart.css';
import { Circles } from 'react-loader-spinner';

const SalesChart = ({ onViewSalesList, showViewTableButton = false }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  setLoading(true);
  getSalesPaginated()
    .then(res => {
      const salesArray = res.data || res; // si res tiene data, usar res.data, sino res mismo
      const grouped = salesArray.reduce((acc, sale) => {
        const date = new Date(sale.sale_timestamp).toLocaleDateString();
        const total = Number(sale.total) || 0; 
         if (!acc[date]) acc[date] = 0;
        acc[date] += total; // ✅ sumamos el valor numérico
        return acc;
      }, {});

      const chartData = Object.entries(grouped).map(([fecha, total]) => ({
        fecha,
        total: Number(total), // <-- aseguramos que sea número
        }));
        setData(chartData);
    })
    .catch(err => console.error(err))
    .finally(() => setLoading(false));
}, []);

  if (loading) return (
        <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "50vh"
    }}>
      <Circles
        height="80"
        width="80"
        color="#606062ff"
        ariaLabel="loading"
      />
    </div>
  )

  // Tooltip personalizado
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { fecha, total } = payload[0].payload;
      return (
        <div style={{
          backgroundColor: "white",
          border: "1px solid #ccc",
          padding: "10px",
        }}>
          <p><strong>Fecha:</strong> {fecha}</p>
          <p>
            <strong>Total:</strong> {Number(total).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <section>
      <h2>Resumen General de Ventas</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 20, right: 20, bottom: 50, left: 50 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="fecha"
            label={{ value: "Fecha", position: "bottom", offset: 30 }}
          />
          <YAxis
            label={{ value: "Total(€)", angle: -90, position: "insideLeft", offset: -20 }}
          />
        <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="total" fill="#ac837dff" />
        </BarChart>
      </ResponsiveContainer>

        {showViewTableButton && (
        <button className="buttonMkt"
          onClick={onViewSalesList}
          style={{ marginTop: "20px", padding: "10px 15px", cursor: "pointer" }}
        >
          Ver tablas
        </button>
      )}
    </section>
  );
};

export default SalesChart;
