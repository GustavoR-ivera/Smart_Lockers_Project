import { useEffect, useState } from "react";
import {
  getPrescriptionsByUserID,
  makeAppointment,
  getAppointmentsByPrescription,
} from "../services/api";
import "./bookAppointment.css";

const BookAppointment = ({ user_id }) => {
  const [prescripciones, setPrescripciones] = useState([]);
  const [fechaHora, setFechaHora] = useState("");
  const [prescripcionSeleccionada, setPrescripcionSeleccionada] = useState("");
  const [lugar, setLugar] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [codigoAcceso, setCodigoAcceso] = useState("");

  const lugaresDisponibles = ["CC niza", "CC Portal 80", "CC Diverplaza"];

  // Cargar prescripciones al renderizar componente
  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const data = await getPrescriptionsByUserID(user_id);
        setPrescripciones(data);
      } catch (error) {
        console.error(
          "BookAppointment,jsx, Error cargando prescripciones:",
          error
        );
      }
    };
    fetchPrescriptions();
  }, [user_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setCodigoAcceso("");

    try {
      //validar agendamiento previo
      const citas = await getAppointmentsByPrescription(
        user_id,
        prescripcionSeleccionada
      );
      console.log("Citas agendadas:", citas);
      if (citas.length > 0) {
        setMensaje("Ya tienes una cita agendada para esta prescripción.");
        return;
      }

      //agendar cita
      const result = await makeAppointment({
        usuario_id: user_id,
        fecha_hora: fechaHora,
        lugar,
        prescripcion_id: prescripcionSeleccionada,
      });

      setMensaje(result.message);
      setCodigoAcceso(result.codigo_acceso);
    } catch (error) {
      setMensaje("Error al agendar cita");
      console.error(error);
    }
  };

  return (
    <div className="container">
      <p>Ingresa los datos</p>
      <form className="form" onSubmit={handleSubmit}>
        <div className="fecha">
          <label>Fecha y hora:</label>
          <input
            type="datetime-local"
            value={fechaHora}
            onChange={(e) => setFechaHora(e.target.value)}
            required
          />
        </div>

        <div className="prescripcion">
          <label>Prescripción:</label>
          <select
            value={prescripcionSeleccionada}
            onChange={(e) => setPrescripcionSeleccionada(e.target.value)}
            required
          >
            <option value="">Selecciona una prescripción</option>
            {prescripciones.map((p) => (
              <option key={p.id} value={p.id}>
                {p.descripcion || `Prescripción ${p.id}`}
              </option>
            ))}
          </select>
        </div>

        <div className="lugar">
          <label>Lugar:</label>
          <select value={lugar} onChange={(e) => setLugar(e.target.value)}>
            {lugaresDisponibles.map((l, idx) => (
              <option key={idx} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Agendar</button>
      </form>

      {mensaje && <p>{mensaje}</p>}
      {codigoAcceso && (
        <p style={{ color: "green" }}>
          Código de acceso: <strong>{codigoAcceso}</strong>
        </p>
      )}
    </div>
  );
};

export default BookAppointment;
