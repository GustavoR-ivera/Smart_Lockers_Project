import { useState } from "react";
import CheckID from "../components/CheckID";
import TabsPanel from "../components/TabsPanel";

const Principal = () => {
  const [usuarioEncontrado, setUsuarioEncontrado] = useState(false);
  const [userID, setUserID] = useState("");

  const manejarValidacionExitosa = (user_id) => {
    //solo se actualiza si el documentro ingresado por el usuario se encuentra
    //registrado en bd
    setUserID(user_id);
    setUsuarioEncontrado(true);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Panel izquierdo */}
      <div
        style={{ width: "30%", padding: "20px", borderRight: "1px solid #ccc" }}
      >
        <CheckID check={manejarValidacionExitosa} />
      </div>

      {/* Panel derecho */}
      <div style={{ flexGrow: 1, padding: "20px" }}>
        {usuarioEncontrado ? (
          <TabsPanel user_id={userID} />
        ) : (
          <p>Por favor ingresa tu documento para continuar.</p>
        )}
      </div>
    </div>
  );
};

export default Principal;
