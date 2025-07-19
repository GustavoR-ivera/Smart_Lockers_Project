import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import "./dashboard.css";
import { getDashboardData } from "../services/api";

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const result = await getDashboardData();
        setData(result);
      } catch (error) {
        console.error("Error obteniendo datos del dashboard:", error);
      }
    };
    //primer llamado al renderizar el componente
    fetchDashboardData();
    //llamado cada 5 segundos para actualizar los datos
    const interval = setInterval(fetchDashboardData, 10000); // cada 5 segundos

    return () => clearInterval(interval); // limpieza al desmontar
  }, []);

  return (
    <div className="dashboard-container">
      <p>Visualización de mediciones</p>
      <LineChart width={800} height={350} data={data}>
        <CartesianGrid strokeDasharray="10 10" />
        <XAxis dataKey="tiempo" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="temperatura" stroke="#d307c2ff" />
        <Line type="monotone" dataKey="humedad" stroke="#ee840cff" />
      </LineChart>
    </div>
  );
};

export default Dashboard;
