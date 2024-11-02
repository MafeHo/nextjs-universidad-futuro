"use client";

export const Filtro = () => {
  return (
    <div className="relative top-12 left-1/2 transform -translate-x-1/2 h-auto p-4 bg-white rounded-md dark:bg-gray-800 border-2 0 shadow-lg">
      <h2 className="text-blue-900 dark:text-white text-lg font-semibold mb-4 text-center">
        Filtros
      </h2>
      <div className="flex flex-col gap-4">
        <select className="dark:bg-gray-700 p-2 rounded border-2">
          <option>Facultad</option>
          <option value="Artes y Humanidades">Artes y Humanidades</option>
              <option value="Ciencias Agropecuarias">Ciencias Agropecuarias</option>
              <option value="Ciencias Exactas y Naturales">Ciencias Exactas y Naturales</option>
              <option value="Ciencias Juridicas y Sociales">Ciencias Jurídicas y Sociales</option>
              <option value="Ciencias para la salud">Ciencias para la salud</option>
              <option value="Ingeniería">Ingeniería</option>
        </select>
        <select className="dark:bg-gray-700 p-2 rounded border-2">
          <option>Tipo Evento</option>
              <option value="Seminario">Seminario</option>
              <option value="Taller">Taller</option>
              <option value="Conferencia">Conferencia</option>
        </select>
        <select className="dark:bg-gray-700 p-2 rounded border-2">
          <option>Temática</option>
          <option value="Academico">Académico</option>
          <option value="Cultural">Cultural</option>
        </select>
        <div className="flex">
          <button className="dark:bg-blue-900 dark:hover:bg-blue-800 bg-blue-600 font-semibold text-white hover:bg-blue-500 p-2 rounded border-2 w-full mr-2">
            Filtrar
          </button>
          <button className="dark:bg-gray-700 dark:hover:bg-gray-600 p-2 rounded border-2 w-full ml-2 text-white font-semibold bg-gray-600 hover:bg-gray-500">
            Limpiar
          </button>
        </div>
      </div>
    </div>
  );
};


