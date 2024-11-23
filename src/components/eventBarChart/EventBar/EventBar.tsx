"use client";

import { useEffect, useState } from "react";
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
import LogicService from "app/services/logicService"; // Asegúrate de que sea el servicio correcto
import { EventoModel } from "app/models/evento.model";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const EventBar = () => {
  const [eventCounts, setEventCounts] = useState<number[]>(Array(12).fill(0));

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const events = await LogicService.getEvents(); // Asegúrate de que este método sea correcto
        console.log("Eventos obtenidos:", events);
        const counts = Array(12).fill(0);

        // Calcula la cantidad de eventos por mes
        events.forEach((event: EventoModel) => {
          if (event.fechaInicio) {
            const eventDate = new Date(event.fechaInicio); // Ajusta si el campo tiene otro nombre
            const month = eventDate.getMonth();
            counts[month]++;
          }
        });

        setEventCounts(counts);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEventData();
  }, []);

  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const data = {
    labels: meses,
    datasets: [
      {
        label: "Eventos por mes",
        data: eventCounts,
        backgroundColor: "rgba(0, 123, 255, 0.5)",
        borderColor: "rgba(0, 123, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-bold text-center mb-4">Cantidad de eventos por mes</h2>
      <Bar data={data} options={options} />
    </div>
  );
};
