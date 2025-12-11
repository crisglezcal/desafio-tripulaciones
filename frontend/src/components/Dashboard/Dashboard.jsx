import React, { useEffect, useState } from "react";
import { getBookings } from "../../services/adminService";
import "../../pages/Admin/Admin.css";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [totalBookings, setTotalBookings] = useState(0);
  const [nextBooking, setNextBooking] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getBookings();
        console.log("Bookings recibidas:", data);

        setTotalBookings(data.length);

        // Calcular próxima cita correctamente
        const futureBookings = data
          .map(b => {
            // Construir dateTime a partir de date_booking y hour_booking
            const datePart = b.date_booking.split("T")[0]; // yyyy-mm-dd
            const dateTime = new Date(`${datePart}T${b.hour_booking}`);
            return { ...b, dateTime };
          })
          .filter(b => b.dateTime > new Date())
          .sort((a, b) => a.dateTime - b.dateTime);

        if (futureBookings.length > 0) {
          setNextBooking(futureBookings[0]);
        }

      } catch (err) {
        console.error(err);
        alert("Error al cargar bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <p>Cargando dashboard...</p>;

  return (
    <div className="dashboard-cards">
      <div className="card">
        <h3>Total de reservas</h3>
        <p>{totalBookings}</p>
      </div>

      <div className="card">
        <h3>Próxima cita</h3>
        {nextBooking ? (
          <p>
            {nextBooking.user_name} - {nextBooking.tattoo_name}<br/>
            {nextBooking.dateTime.toLocaleDateString()}{" "}
            {nextBooking.hour_booking}
          </p>
        ) : (
          <p>No hay citas futuras</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
