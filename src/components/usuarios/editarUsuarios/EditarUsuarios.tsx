"use client";

import { Usuario } from "app/models/usuario.model";
import React, { useState } from "react";

interface EditarUsuarioProps {
  usuario: Usuario;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (usuario: Usuario) => void;
}

const EditarUsuario: React.FC<EditarUsuarioProps> = ({
  usuario,
  isOpen,
  onClose,
  onUpdate,
}) => {
  const [formValues, setFormValues] = useState<Usuario>(usuario);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simular actualización en servidor
    onUpdate(formValues);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 ">
      <div className="bg-white p-6 rounded shadow-lg w-96 dark:bg-gray-800 ">
        <h2 className="text-xl font-semibold mb-4 text-black dark:text-blue-600">Editar Usuario</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="primerNombre"
            placeholder="Primer Nombre"
            value={formValues.primerNombre}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4 text-black dark:text-gray-600"
          />
          <input
            type="text"
            name="primerApellido"
            placeholder="Primer Apellido"
            value={formValues.primerApellido}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4 text-black dark:text-gray-600"
          />
          <input
            type="text"
            name="celular"
            placeholder="Teléfono"
            value={formValues.celular || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4 text-black dark:text-gray-600"
          />
          <input
            type="email"
            name="correo"
            placeholder="Correo"
            value={formValues.correo}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4 text-black dark:text-gray-600"
          />
          <select
            name="rolId"
            value={formValues.rolId}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4 text-black dark:text-gray-600"
          >
            <option value="Organizador">Organizador</option>
            <option value="Participante">Participante</option>
          </select>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-3 py-1 rounded mr-2"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarUsuario;
