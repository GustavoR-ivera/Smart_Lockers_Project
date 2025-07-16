import { useState } from "react";
import { getUserByID } from "../services/api";
import "./checkID.css";

const CheckID = ({ success, failure }) => {
  const [documento, setDocumento] = useState("");
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");

  const handleClick = async () => {
    setError("");
    setWarning(""); // limpia mensajes previos
    try {
      const resultado = await getUserByID(documento);
      console.log("checkID: getUserByID: return: ", resultado);

      //acceder al campo valid del obj retornado, si es true, entonces el usuario fue encontrado
      if (resultado.valid == true) {
        //comparte el id del usuario para proceder a consultar su info
        success(resultado.usuario_id); // notifica a Principal.jsx
      } else if (resultado.valid == false) {
        failure();
        setWarning("Usuario no encontrado");
      } else {
        setError("Error consultando usuario");
        console.error(error);
      }
    } catch (error) {
      setError("Error consultando usuario");
      console.error(error);
    }
  };

  return (
    <div className="check-id">
      <p>Ingresa tu documento para validación</p>
      <div className="form">
        <input
          type="text"
          placeholder="Número de documento"
          value={documento}
          onChange={(e) => setDocumento(e.target.value)}
        />
        <button onClick={handleClick}>Validar</button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {warning && <p style={{ color: "orange" }}>{warning}</p>}
    </div>
  );
};

export default CheckID;
