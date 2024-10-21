"use client";
import { useState } from "react";

export const SignInForm = () => {
  const [rol, setRol] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRol(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 flex items-center justify-center pt-20 pb-20">
      <div className="w-11/12 max-w-sm mx-auto">
        <form
          action="https://httpbin.org/post"
          method="POST"
          className="grid gap-4 bg-blue-600 dark:bg-gray-900 p-8 rounded-lg shadow-md"
        >
          {/* Header */}
          <h2 className="text-center text-2xl font-bold text-white dark:text-gray-300 mb-6">
            Registrarse
          </h2>

          {/* Nombre Field */}
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            required
            className="w-full p-3 bg-white dark:bg-gray-700 rounded-md text-gray-800 dark:text-gray-200 placeholder-gray-400"
          />

          {/* Apellido Field */}
          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            required
            className="w-full p-3 bg-white dark:bg-gray-700 rounded-md text-gray-800 dark:text-gray-200 placeholder-gray-400"
          />

          {/* Teléfono Field */}
          <input
            type="tel"
            name="telefono"
            placeholder="Teléfono"
            required
            className="w-full p-3 bg-white dark:bg-gray-700 rounded-md text-gray-800 dark:text-gray-200 placeholder-gray-400"
          />

          {/* Correo Electrónico Field */}
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            required
            className="w-full p-3 bg-white dark:bg-gray-700 rounded-md text-gray-800 dark:text-gray-200 placeholder-gray-400"
          />

          {/* Rol Field */}
          <select
            name="rol"
            required
            className="w-full p-3 bg-white dark:bg-gray-700 rounded-md text-gray-800 dark:text-gray-200"
            value={rol}
            onChange={handleChange}
          >
            <option value="" disabled>
              Selecciona tu rol
            </option>
            <option value="admin">Administrador</option>
            <option value="estudiante">Participante</option>
            <option value="profe">Organizador</option>
          </select>

          {/* Contraseña Field */}
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            required
            className="w-full p-3 bg-white dark:bg-gray-700 rounded-md text-gray-800 dark:text-gray-200 placeholder-gray-400"
          />

          {/* Confirmar Contraseña Field */}
          <input
            type="password"
            name="confirm_password"
            placeholder="Confirmar contraseña"
            required
            className="w-full p-3 bg-white dark:bg-gray-700 rounded-md text-gray-800 dark:text-gray-200 placeholder-gray-400"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-3 bg-gray-800 dark:bg-blue-600 hover:bg-gray-700 dark:hover:bg-blue-500 text-white font-bold uppercase rounded-md transition"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};
