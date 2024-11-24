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
import LogicService from "app/services/logicService";
import { EventoModel } from "app/models/evento.model";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const EventBar = () => {
  const [eventCounts, setEventCounts] = useState<number[]>(Array(12).fill(0));

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const events = await LogicService.getEvents();
        console.log("Eventos obtenidos:", events);
        const counts = Array(12).fill(0);

        // cantidad de eventos por mes
        events.forEach((event: EventoModel) => {
          if (event.fechaInicio) {
            const eventDate = new Date(event.fechaInicio); 
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
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
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
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-bold text-gray-600 mb-4">Cantidad de eventos por mes</h2>
      <Bar data={data} options={options} />
    </div>
  );
};
