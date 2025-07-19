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
//metodo para consultar prescripciones medicas del usuario a partir del user_id
export const getPrescriptionsByUserID = async (user_id) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/prescripciones/consultar/${user_id}`
    );
    return response.data;
  } catch (error) {
    console.error("api.js, Error validando prescripciones del usuario:", error);
    return error;
  }
};

//metodo para consultar citas agendadas de un usuario para una prescripción especifica
export const getAppointmentsByPrescription = async (
  user_id,
  prescripcion_id
) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/citas/consultar/${user_id}/${prescripcion_id}`
    );
    return response.data;
  } catch (error) {
    console.error("api.js, Error validando prescripciones del usuario:", error);
    return error;
  }
};

//metodo para traer los datos medidos por casillero
export const getDashboardData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/dashboard/data/`);
    return response.data;
  } catch (error) {
    console.error(
      "api.js, Error trayendo datos de mediciones del casillero:",
      error
    );
    return error;
  }
};

//metodo para consultar citas agendadas de un usuario
export const getAppointmentsByUser = async (user_id) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/citas/consultar/${user_id}`
    );
    return response.data;
  } catch (error) {
    console.error("api.js, Error consultando las citas del usuario:", error);
    return error;
  }
};

//metodo para consultar citas agendadas de un usuario
export const getPrescriptionByID = async (prescripcion_id) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/citas/consultar/prescripcion_id/${prescripcion_id}`
    );
    return response.data;
  } catch (error) {
    console.error("api.js, Error consultando la prescripcion", error);
    return error;
  }
};

// metodo para agendar cita de recolección
export const makeAppointment = async ({
  usuario_id,
  fecha_hora,
  lugar,
  prescripcion_id,
}) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/citas/agendar`,
      null, // no se envian en el cuerpo, se envian como query params
      {
        params: {
          usuario_id,
          fecha_hora,
          lugar,
          prescripcion_id,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("api.js, Error agendando cita:", error);
    throw error;
  }
};
