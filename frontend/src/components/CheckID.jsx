import { useState } from "react";
import { getUserByID } from "../services/api";

const CheckID = ({ check }) => {
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
        check(resultado.usuario_id); // notifica a Principal.jsx
      } else if (resultado.valid == false) {
        setWarning("Usuario no encontrado");
      } else {
        setError("error consultando usuario con documento", documento);
        console.error(error);
      }
    } catch (error) {
      setError("error consultando usuario con documento");
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Ingresa tu documento para validación</h2>
      <input
        type="text"
        placeholder="Número de documento"
        value={documento}
        onChange={(e) => setDocumento(e.target.value)}
      />
      <button onClick={handleClick}>Validar</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {warning && <p style={{ color: "orange" }}>{warning}</p>}
    </div>
  );
};

export default CheckID;
