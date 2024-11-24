"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const AttendanceChart = () => {
  const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  const data = {
    labels: meses,
    datasets: [
      {
        label: "Asistencia",
        data: [50, 120, 190, 150, 230, 260],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" as const },
      tooltip: { enabled: true },
    },
    scales: { y: { beginAtZero: true } },
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-bold text-gray-600 mb-4">Tendencia de Asistencia</h3>
      <Bar data={data} options={options} />
    </div>
  );
};
