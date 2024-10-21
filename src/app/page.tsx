import Image from "next/image";
import Calendar from "../components/home/Calendar/Calendar"; // Asegúrate de que la ruta sea correcta

export default function Home() {
  return (
    <div className="relative w-full min-h-screen">
      {/* Imagen de fondo */}
      <div className="absolute inset-0 -z-10">
        <Image
          className="w-full h-auto object-cover"
          src="/images/campus-universitario.jpg"
          alt="Imagen del campus universitario"
          width={1920}
          height={300}
          priority
        />
      </div>

      {/* Asegura espacio para el Header */}
      <div className="pt-20"> {/* Ajusta 20 según la altura del header */}
        {/* Contenedor del calendario */}
        <div className="relative top-10 left-1/2 transform -translate-x-1/2 w-80 z-10 p-1 sm:p-0 md:p-">
          <Calendar />
        </div>

        {/* Contenedor de los filtros */}
        <div className="relative top-12 left-1/2 transform -translate-x-1/2 w-64 h-auto p-4 bg-gray-800 bg-opacity-90 rounded-md z-20 ">
          <h2 className="text-white text-lg font-semibold mb-4 text-center">
            Filtros
          </h2>
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
    </div>
  );
}
