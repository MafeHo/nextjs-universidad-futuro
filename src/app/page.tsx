import Image from "next/image";
import Calendar from "../components/home/Calendar/Calendar"; // Asegúrate de que la ruta sea correcta

export default function Home() {
  return (
    <div className="relative w-full min-h-screen">
      {/* Imagen de fondo */}
      <Image
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/images/campus-universitario.jpg"
        alt="Imagen del campus universitario"
        layout="fill"
        priority
      />

      {/* Contenedor del calendario */}
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-auto z-10 p-4 sm:p-0">
        <Calendar />
      </div>

      {/* Contenedor de los filtros */}
      <div className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 sm:w-64 h-auto p-4 bg-gray-800 bg-opacity-90 rounded-md z-20 sm:top-1/4 sm:right-8 sm:translate-x-0 sm:translate-y-0">
        <h2 className="text-white text-lg font-semibold mb-4 text-center sm:text-left">Filtros</h2>
        <div className="flex flex-col gap-4">
          <select className="bg-gray-700 text-white p-2 rounded">
            <option>Facultad</option>
          </select>
          <select className="bg-gray-700 text-white p-2 rounded">
            <option>Tipo Evento</option>
          </select>
          <select className="bg-gray-700 text-white p-2 rounded">
            <option>Temática</option>
          </select>
        </div>
      </div>
    </div>
  );
}
