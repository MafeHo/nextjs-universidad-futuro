import React, { useState } from 'react';
import { EventApi } from '@fullcalendar/core';
import { formatDate } from '@fullcalendar/core';
import Swal from 'sweetalert2';
import { EventoModel } from '../../../models/evento.model';

interface EventCardProps {
  event: EventApi;
  onEdit: (event: EventApi) => void; // Prop para manejar edición
  onDelete: (event: EventApi) => void; // Prop para manejar eliminación
}

const EventCard: React.FC<EventCardProps> = ({ event, onEdit, onDelete }) => {
  // Función para manejar la edición del evento
  const handleEdit = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Editar Evento',
      html: `
      <input id="swal-input1" class="border border-gray-300 rounded px-7 py-2 mb-4" value="${event.title || ''}" placeholder="Título" />
      <input id="swal-input2" class="border border-gray-300 rounded px-7 py-2 mb-4" value="${event.extendedProps.description || ''}" placeholder="Descripción" />
      <input id="swal-input3" class="border border-gray-300 rounded px-7 py-2 mb-4" value="${event.extendedProps.location || ''}" placeholder="Lugar" />

      <div>
        <select id="swal-input4" class="border border-gray-300 rounded px-2 py-2 mb-4">
          <option value="Artes y Humanidades" ${event.extendedProps.faculty === "Artes y Humanidades" ? "selected" : ""}>
            Artes y Humanidades
          </option>
          <option value="Ciencias Agropecuarias" ${event.extendedProps.faculty === "Ciencias Agropecuarias" ? "selected" : ""}>
            Ciencias Agropecuarias
          </option>
          <option value="Ciencias Exactas y Naturales" ${event.extendedProps.faculty === "Ciencias Exactas y Naturales" ? "selected" : ""}>
            Ciencias Exactas y Naturales
          </option>
          <option value="Ciencias Jurídicas y Sociales" ${event.extendedProps.faculty === "Ciencias Jurídicas y Sociales" ? "selected" : ""}>
            Ciencias Jurídicas y Sociales
          </option>
          <option value="Ciencias para la salud" ${event.extendedProps.faculty === "Ciencias para la salud" ? "selected" : ""}>
            Ciencias para la salud
          </option>
          <option value="Ingeniería" ${event.extendedProps.faculty === "Ingeniería" ? "selected" : ""}>Ingeniería</option>
        </select>
      </div>

      <div>
        <select id="swal-input5" class="border border-gray-300 rounded px-10 py-2 mb-4 ">
          <option value="" ${!event.extendedProps.topic ? "selected" : ""}>Seleccionar Temática</option>
          <option value="Academico" ${event.extendedProps.topic === "Academico" ? "selected" : ""}>Académico</option>
          <option value="Cultural" ${event.extendedProps.topic === "Cultural" ? "selected" : ""}>Cultural</option>
        </select>
      </div>

      <div>
        <select id="swal-input6" class="border border-gray-300 rounded px-4 py-2 mb-4">
          <option value="" ${!event.extendedProps.eventType ? "selected" : ""}>Seleccionar Tipo de Evento</option>
          <option value="Conferencia" ${event.extendedProps.eventType === "Conferencia" ? "selected" : ""}>Conferencia</option>
          <option value="Taller" ${event.extendedProps.eventType === "Taller" ? "selected" : ""}>Taller</option>
          <option value="Seminario" ${event.extendedProps.eventType === "Seminario" ? "selected" : ""}>Seminario</option>
        </select>
      </div>

      <input
        id="swal-input7"
        class="border border-gray-300 rounded px-[73px] py-2 mb-4"
        type="time"
        value="${formatDate(event.start!, { hour: '2-digit', minute: '2-digit' }).slice(0, 5)}"
      />
      <input
        id="swal-input8"
        class="border border-gray-300 rounded px-[73px] py-2 mb-4"
        type="time"
        value="${formatDate(event.end!, { hour: '2-digit', minute: '2-digit' }).slice(0, 5)}"
      />
      <input id="swal-input9" class="border border-gray-300 rounded px-7 py-2 mb-4" value="${event.extendedProps.maxCapacity || ''}" placeholder="Cupos Máximos" />
    `

    ,
        
      focusConfirm: false,
      preConfirm: () => {
        const titulo = (document.getElementById('swal-input1') as HTMLInputElement).value;
        const descripcion = (document.getElementById('swal-input2') as HTMLInputElement).value;
        const lugar = (document.getElementById('swal-input3') as HTMLInputElement).value;
        const facultad = (document.getElementById('swal-input4') as HTMLInputElement).value;
        const tematica = (document.getElementById('swal-input5') as HTMLInputElement).value;
        const tipoEvento = (document.getElementById('swal-input6') as HTMLInputElement).value;
        const horaInicio = (document.getElementById('swal-input7') as HTMLInputElement).value;
        const horaFin = (document.getElementById('swal-input8') as HTMLInputElement).value;
        const maxCapacidad = (document.getElementById('swal-input9') as HTMLInputElement).value;

        if (!titulo || !descripcion || !lugar || !facultad || !tematica || !tipoEvento || !horaInicio || !horaFin || !maxCapacidad) {
          Swal.showValidationMessage('Todos los campos son requeridos');
          return false;
        }

        return { titulo, descripcion, lugar, facultad, tematica, tipoEvento, horaInicio, horaFin, maxCapacidad };
      }
    });

    if (formValues) {
      const updatedEvent: EventApi = {
        ...event,
        title: formValues.titulo,
        extendedProps: {
          ...event.extendedProps,
          description: formValues.descripcion,
          location: formValues.lugar,
          faculty: formValues.facultad,
          topic: formValues.tematica,
          eventType: formValues.tipoEvento,
          maxCapacity: formValues.maxCapacidad
        },
        start: new Date(`1970-01-01T${formValues.horaInicio}:00`), // Convertir horaInicio en objeto Date
        end: new Date(`1970-01-01T${formValues.horaFin}:00`) // Convertir horaFin en objeto Date
      };
      onEdit(updatedEvent); // Llama a la función de edición pasándole el evento actualizado
      Swal.fire("Editado", "El evento ha sido editado correctamente.", "success");
    }
  };

  // Función para manejar la eliminación del evento
  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, cancelar"
    });

    if (result.isConfirmed) {
      onDelete(event); // Llama a la función de eliminación
      Swal.fire("Eliminado", "El evento ha sido eliminado.", "success");
    }
  };

  return (
    <li className="border border-gray-200 shadow px-3 py-2 rounded-md text-blue-800 dark:text-white bg-white dark:bg-gray-900">
      <div className="font-bold">{event.title}</div>
      <div className="text-sm text-slate-600 dark:text-white">
        <p>Descripcion: {event.extendedProps.description}</p>
        <p>Lugar: {event.extendedProps.location}</p>
        <p>Organizador: {event.extendedProps.organizer}</p>
        <p>Facultad: {event.extendedProps.faculty}</p>
        <p>Temática: {event.extendedProps.topic}</p>
        <p>Tipo de Evento: {event.extendedProps.eventType}</p>
        <p>Hora Inicio: {formatDate(event.start!, { hour: "numeric", minute: "numeric", hour12: false })}</p>
        <p>Hora Fin: {formatDate(event.end!, { hour: "numeric", minute: "numeric", hour12: false })}</p>
        <p>Cupos Máximos: {event.extendedProps.maxCapacity}</p>
      </div>

      <div className="mt-4">
        <button
          className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-md text-center"
          onClick={() =>
            Swal.fire({
              title: "Inscripción confirmada",
              text: `Te has inscrito en el evento: ${event.title}`,
              icon: "success",
              timer: 3000, // Tiempo de cierre automático (3 segundos)
              timerProgressBar: true, // Muestra la barra de progreso
              showConfirmButton: false, // Oculta el botón de confirmación
              allowOutsideClick: false, // Impide cerrar haciendo clic fuera
            })
          }
        >
          Inscribirse
        </button>
      </div>

      <div className="mt-4 flex justify-center space-x-4">
        <button
          className="p-2 bg-blue-500 hover:bg-blue-400 text-white rounded-md"
          onClick={handleEdit} // Llama a la función de edición
        >
          Editar
        </button>
        <button
          className="p-2 bg-red-600 hover:bg-red-500 text-white rounded-md"
          onClick={handleDelete} // Llama a la función de eliminación
        >
          Eliminar
        </button>
      </div>
    </li>
  );
};

export default EventCard;
