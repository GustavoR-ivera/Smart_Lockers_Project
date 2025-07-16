import { useState } from "react";
import CheckID from "../components/CheckID";
import TabsPanel from "../components/TabsPanel";
import "./principal.css";

const Principal = () => {
  const [usuarioEncontrado, setUsuarioEncontrado] = useState(false);
  const [userID, setUserID] = useState("");

  const manejarValidacionExitosa = (user_id) => {
    //solo se actualiza si el documentro ingresado por el usuario se encuentra
    //registrado en bd
    setUserID(user_id);
    setUsuarioEncontrado(true);
  };

  const manejarValidacionFallida = () => {
    setUsuarioEncontrado(false);
    setUserID("");
  };

  return (
    <div className="principal">
      {/* Panel izquierdo */}
      <div className="izq">
        <CheckID
          success={manejarValidacionExitosa}
          failure={manejarValidacionFallida}
        />
      </div>
      <div className="separador"></div>
      {/* Panel derecho */}
      <div className="der">
        {usuarioEncontrado ? (
          <TabsPanel user_id={userID} />
        ) : (
          <p>Por favor, ingresa tu documento para continuar.</p>
        )}
      </div>
    </div>
  );
};

export default Principal;
