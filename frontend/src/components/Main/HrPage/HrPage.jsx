import { useEffect, useState } from "react";
import { getAllEmployees,deleteEmployeeById} from "../../../services/hrservice.js";
import AddEmployee from "./AddEmployee/AddEmloyee.jsx";
import "./HrPage.css";
import Swal from "sweetalert2";
import { Circles } from 'react-loader-spinner';
import ChatBox2 from "../../Chat/Chatbox/Chatbox2";

const HrPage = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState("list"); // list | add

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const data = await getAllEmployees();
      setEmployees(data.data || []);
    } catch (err) {
      setError(err.msg || "Error loading employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (employee_id) => {
    // if (!window.confirm("¿Eliminar empleado?")) return;
     // Confirmación con SweetAlert
    const result = await Swal.fire({
    title: "¿Estás seguro?",
    text: "Esta acción no se puede deshacer",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
    background: "#1f2937",          // fondo dark
    color: "#f9fafb",               // texto claro
    customClass: {
      title: "swal2-title-custom",
      popup: "swal2-popup-custom"
    },
    // Responsive automatico
    width: "90%",
    maxWidth: "500px"
  });

  if (!result.isConfirmed) return;

    try {
      await deleteEmployeeById(employee_id);
      // Éxito
      Swal.fire({
      title: "Eliminado",
      text: "El empleado fue eliminado correctamente",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
      position: "center", 

    });
      fetchEmployees();
    } catch(err) {
      // Error
      Swal.fire({
      title: "Error",
      text: err.msg || "Error al eliminar el empleado",
      icon: "error",
    });
    }
  };

  // if (loading) return <p>Cargando empleados...</p>;
  if (loading) {
  return (
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
  );
}
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Recursos Humanos</h1>
        <p>Gestión de empleados</p>

        <div style={{ marginTop: "1rem" }} className="buttonsTable">
          <button onClick={() => setView("list")}>
            📋 Ver empleados
          </button>
          <button
            onClick={() => setView("add")}
            
          >
            ➕ Añadir empleado
          </button>
        </div>
      </div>

      {view === "list" && (
        <table className="hr-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Departamento</th>
              <th>Puesto</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td colSpan="5">No hay empleados</td>
              </tr>
            ) : (
              employees.map((emp) => (
                <tr key={emp.employee_id}>
                  <td data-label="Nombre">{emp.first_name} {emp.last_name}</td>
                  <td data-label="Email">{emp.email}</td>
                  <td data-label="Departamento">{emp.department}</td>
                  <td data-label="Puesto">{emp.position}</td>
                  <td data-label="Acciones">
                    <button onClick={() => handleDelete(emp.employee_id)} className="deletebutton">
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      {view === "add" && (
        <AddEmployee
          onSuccess={() => {
            fetchEmployees();
            setView("list");
          }}
          onCancel={() => setView("list")}
        />
      )}
         <ChatBox2 />
    </div>
  );
};

export default HrPage;
