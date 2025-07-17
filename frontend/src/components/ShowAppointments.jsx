import { useEffect, useState } from "react";
import { getAppointmentsByUser, getPrescriptionByID } from "../services/api";
import "./showAppointments.css";

const ShowAppointments = ({ user_id }) => {
  const [citas, setCitas] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCitas = async () => {
      setError("");
      try {
        const resultado = await getAppointmentsByUser(user_id);
        setCitas(resultado);
      } catch (e) {
        console.error(e);
        setError("Error obteniendo las citas.");
      }
    };

    if (user_id) fetchCitas();
  }, [user_id]);

  return (
    <div className="container">
      <p>Citas agendadas</p>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {citas.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha recolección</th>
              <th>Lugar</th>
              <th>Código</th>
              <th>Prescripcion</th>
              <th>Estado</th>
              <th>Temperatura</th>
              <th>Humedad</th>
            </tr>
          </thead>
          <tbody>
            {citas.map((cita) => (
              <tr key={cita.id}>
                <td>{cita.id}</td>
                <td>{new Date(cita.fecha_hora).toLocaleString()}</td>
                <td>{cita.lugar}</td>
                <td style={{ color: "green" }}>{cita.codigo}</td>
                <td>{cita.prescripcion}</td>
                <td style={{ color: "orange" }}>{cita.estado}</td>
                <td>{cita.temperatura}</td>
                <td>{cita.humedad}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay citas agendadas.</p>
      )}
    </div>
  );
};

export default ShowAppointments;
