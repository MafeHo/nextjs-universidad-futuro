"use client";

export const Filtro = () => {
  return (
    <div className="relative top-12 left-1/2 transform -translate-x-1/2 w-64 h-auto p-4 bg-blue-600 rounded-md dark:bg-gray-800">
      <h2 className="text-white text-lg font-semibold mb-4 text-center">
        Filtros
      </h2>
      <div className="flex flex-col gap-4">
        <select className="dark:bg-gray-700 p-2 rounded">
          <option>Facultad</option>
        </select>
        <select className="dark:bg-gray-700 p-2 rounded">
          <option>Tipo Evento</option>
        </select>
        <select className="dark:bg-gray-700 p-2 rounded">
          <option>Temática</option>
        </select>
      </div>
    </div>
  );
};


