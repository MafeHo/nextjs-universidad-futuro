"use client";

import Card from "app/components/home/Cards/Cards";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/calendario");
  };

  const eventicosMientrasq = [
    {
      title: "Evento de Bienvenida",
      organizer: "Facultad de Ingeniería",
      faculty: "Ingeniería",
      topic: "Introducción al Año Académico",
      eventType: "Académico",
      start: "2024-11-01T10:00",
      end: "2024-11-01T12:00",
      maxCapacity: "100",
    },
    {
      title: "Conferencia de Innovación",
      organizer: "Departamento de Ciencias",
      faculty: "Ciencias",
      topic: "Innovación en Tecnología",
      eventType: "Conferencia",
      start: "2024-11-03T15:00",
      end: "2024-11-03T17:00",
      maxCapacity: "200",
    },
    {
      title: "Taller de Emprendimiento",
      organizer: "Facultad de Negocios",
      faculty: "Negocios",
      topic: "Emprendimiento y Startups",
      eventType: "Taller",
      start: "2024-11-05T09:00",
      end: "2024-11-05T11:00",
      maxCapacity: "50",
    },
  ];

  return (
    <div className="relative w-full lg:min-h-screen">
      {/* Imagen de fondo con ancho completo y altura ajustada */}
      <div className="absolute inset-0 h-[80vh] -z-10">
        <Image
          className="w-full h-full object-cover"
          src="/images/campus-universitario.jpg"
          alt="Imagen del campus universitario"
          layout="fill" // Usamos layout fill para ocupar todo el contenedor
          priority
        />
      </div>

      <section>
        <div className="flex flex-col items-center justify-center w-full h-[80vh] bg-gray-900 bg-opacity-50">
          <h1 className="text-white text-3xl font-bold text-center">
            ¡Bienvenido a Eventos UNF!
          </h1>
          <p className="text-white text-lg text-center mt-4">
            Encuentra eventos académicos y culturales en un solo lugar.
          </p>
        </div>
      </section>

      {/* Botón centrado */}
      <div className="flex justify-center items-center w-full absolute top-[50vh]">
        <button
          onClick={handleButtonClick}
          className="px-6 py-3 bg-blue-600 dark:bg-gray-900 dark:hover:bg-gray-800 text-white font-semibold text-lg rounded-lg shadow-lg hover:bg-blue-700 transition"
        >
          ¡Explora eventos!
        </button>
      </div>
      
      
      {/* Tarjetas debajo de la sección de bienvenida */}
      <div className="md:flex -mt-20 justify-center items-center gap-6">
        <Card events={eventicosMientrasq} />
  
      </div>
    </div>
  );
}
