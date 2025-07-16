import axios from "axios";

//acceso a la url base del api
const API_BASE_URL = import.meta.env.VITE_API_URL; // backend URL desde .env

//metodo para consultar info del usuario por cedula
export const getUserByID = async (documento) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/usuarios/validar/${documento}`
    );
    return response.data;
  } catch (error) {
    console.error("api.js, Error validando documento:", error);
    return error;
  }
};

//todo
