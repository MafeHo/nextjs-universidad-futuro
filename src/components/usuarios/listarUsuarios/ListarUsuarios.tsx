"use client";

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import usersService from "app/services/usersService";
import EditarUsuario from "../editarUsuarios/EditarUsuarios";

interface Usuario {
  _id: string;
  primerNombre: string;
  segundoNombre?: string;
  primerApellido: string;
  segundoApellido?: string;
  celular?: string;
  correo: string;
  roleId: string;
}

const ListarUsuarios: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [selectedUsuario, setSelectedUsuario] = useState<Usuario | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        usersService.getUsers().then((data: Usuario[]) => {
          if (data.length === 0) {
            alert("No trae la información de los usuarios");
          } else {
            setUsuarios(data);
          }
        });
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };

    fetchUsuarios();
  }, []);

  const handleEdit = (usuario: Usuario) => {
    setSelectedUsuario(usuario);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Eliminar",
      text: "¿Está seguro que quiere eliminar el usuario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, cancelar",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`/usuario/${id}`, { method: "DELETE" });
        if (response.ok) {
          Swal.fire("Eliminado!", "El usuario ha sido eliminado.", "success");
          setUsuarios(usuarios.filter((user) => user._id !== id));
        } else {
          Swal.fire("Error", "No se pudo eliminar el usuario.", "error");
        }
      } catch (error) {
        Swal.fire("Error", "Ocurrió un problema al eliminar el usuario.", "error");
      }
    }
  };

  return (
    <div className="container mx-auto py-20">
      <h2 className="text-2xl font-semibold mb-6">Usuarios</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Id</th>
              <th className="border border-gray-300 px-4 py-2">Nombre</th>
              <th className="border border-gray-300 px-4 py-2">Apellido</th>
              <th className="border border-gray-300 px-4 py-2">Teléfono</th>
              <th className="border border-gray-300 px-4 py-2">Correo</th>
              <th className="border border-gray-300 px-4 py-2">Rol</th>
              <th className="border border-gray-300 px-4 py-2">Opciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario._id}>
                <td className="border border-gray-300 px-4 py-2">{usuario._id}</td>
                <td className="border border-gray-300 px-4 py-2">{usuario.primerNombre}</td>
                <td className="border border-gray-300 px-4 py-2">{usuario.primerApellido}</td>
                <td className="border border-gray-300 px-4 py-2">{usuario.celular || "N/A"}</td>
                <td className="border border-gray-300 px-4 py-2">{usuario.correo}</td>
                <td className="border border-gray-300 px-4 py-2">{usuario.roleId}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleEdit(usuario)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(usuario._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isDialogOpen && selectedUsuario && (
        <EditarUsuario
          usuario={selectedUsuario}
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onUpdate={(updatedUsuario) => {
            setUsuarios((prevUsuarios) =>
              prevUsuarios.map((user) =>
                user._id === updatedUsuario._id ? updatedUsuario : user
              )
            );
            setIsDialogOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default ListarUsuarios;
