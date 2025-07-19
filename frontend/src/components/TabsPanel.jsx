import { useState } from "react";
import BookAppointment from "./BookAppointment";
import ShowAppointments from "./ShowAppointments";
import ShowAuthorizedSites from "./ShowAuthorizedSites";
import Dashboard from "./Dashboard";
import "./tabsPanel.css";

const TabsPanel = ({ user_id }) => {
  const [tabSeleccionada, setTabSeleccionada] = useState("book-app");

  const renderizarContenido = () => {
    if (tabSeleccionada === "book-app")
      return <BookAppointment user_id={user_id} />;
    if (tabSeleccionada === "show-apps")
      return <ShowAppointments user_id={user_id} />;
    if (tabSeleccionada === "show-auth") return <ShowAuthorizedSites />;
    if (tabSeleccionada === "dashboard") return <Dashboard />;
  };

  return (
    <div className="tabs-panel">
      <div className="tabs-header">
        <button onClick={() => setTabSeleccionada("book-app")}>
          Agendar cita
        </button>
        <button onClick={() => setTabSeleccionada("show-apps")}>
          Ver citas
        </button>
        <button onClick={() => setTabSeleccionada("dashboard")}>
          Dashboard
        </button>
        <button onClick={() => setTabSeleccionada("show-auth")}>
          Ver sitios de recolección
        </button>
      </div>

      <div className="tabs-contenido">{renderizarContenido()}</div>
    </div>
  );
};

export default TabsPanel;
