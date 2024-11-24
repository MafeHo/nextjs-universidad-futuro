"use client";

import { EventApi } from "@fullcalendar/core";
import { formatDate } from "@fullcalendar/core";
import { SecurityConfig } from "app/config/securityConfig";
import LogicService from "app/services/logicService";
import useEventsStore from "app/stores/useEventsStore";
import useSecurityStore from "app/stores/useSecurityStore";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FormSatisfaccion } from "app/components/satisfaccion/FormSatisfaccion/FormSatisfaccion";

export const ListarEventos = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Para abrir/cerrar el modal
  const [selectedEvent, setSelectedEvent] = useState<EventApi | null>(null); // Para guardar el evento seleccionado

  const { parseToEventApi } = useEventsStore();
  const { user } = useSecurityStore();
  const [events, setEvents] = useState<EventApi[]>([]);

  const openModal = (event: EventApi) => {
    setSelectedEvent(event); // Guarda el evento seleccionado
    setIsModalOpen(true); // Abre el modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Cierra el modal
  };

  useEffect(() => {
    LogicService.getEvents().then((events) => {
      setEvents(parseToEventApi(events));
    });
  }, []);

  const handleAsistance = async (event: EventApi) => {
    if (
      (user?.rolId == SecurityConfig.ID_ROLE_PARTICIPANT ||
        user?.rolId == SecurityConfig.ID_ROLE_ADMIN) &&
      user.correo
    ) {
      const participantId = await LogicService.getParticipantIdByEmail(
        user.correo
      );
      const eventId = event.id;
    } else {
      alert("No eres participante");
    }
  };

  return (
    <section className="md:flex mt-5 justify-center items-center gap-6 flex-col">
      <h3>Mis eventos</h3>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.length <= 0 && (
          <p className="italic text-gray-400">No hay eventos próximos</p>
        )}
        {events.map((event) => (
          <li
            key={event.id}
            className="border border-gray-200 shadow px-4 py-2 rounded-md text-blue-800 dark:text-white bg-white dark:bg-gray-900"
          >
            <div className="font-bold">{event.title}</div>
            <div className="text-sm text-slate-600 dark:text-white">
              <p>Descripcion: {event.extendedProps?.description}</p>
              <p>Lugar: {event.extendedProps?.location}</p>
              <p>Organizador: {event.extendedProps?.organizer}</p>
              <p>Facultad: {event.extendedProps?.faculty}</p>
              <p>Temática: {event.extendedProps?.topic}</p>
              <p>Tipo de Evento: {event.extendedProps?.eventType}</p>
              <p>
                Hora Inicio:{" "}
                {event.start
                  ? new Date(event.start).toLocaleTimeString("es-ES", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "No especificado"}
              </p>
              <p>
                Hora Fin:{" "}
                {event.end
                  ? new Date(event.end).toLocaleTimeString("es-ES", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "No especificado"}
              </p>
              <p>Cupos Máximos: {event.extendedProps?.maxCapacity}</p>
            </div>
            <br />
            <label className="text-slate-950 dark:text-white">
              {formatDate(event.start!, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </label>
            <div className="mt-4">
              <button
                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-md text-center"
                onClick={() => {
                  handleAsistance(event);
                }}
              >
                Registrar Asistencia
              </button>
              <button
                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-md text-center"
                onClick={() => openModal(event)} // Llama a la función y pasa el evento seleccionado
              >
                Encuesta
              </button>
            </div>
          </li>
        ))}
      </ul>
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50"
          role="dialog"
        >
          <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-[85%] md:max-w-lg max-h-screen overflow-y-auto h-[600px] md:h-[700px]">
            {/* Botón de cierre */}
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:text-gray-500"
              onClick={closeModal}
            >
              ✕
            </button>

            {/* Título del modal */}
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center">
              Encuesta de Satisfacción
            </h2>

            {/* Instrucciones */}
            <h3 className="text-base md:text-lg font-medium text-gray-800 dark:text-white mb-4 text-center">
              Ten presente que 1= Muy malo y 5= Muy bueno
            </h3>

            {/* Nombre del evento */}
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Evento:
              </label>
              <p className="text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 p-2 rounded">
                {selectedEvent?.title || "Evento no especificado"}
              </p>
            </div>

            {/* Formulario */}
            <FormSatisfaccion closeModal={closeModal} />
          </div>
        </div>
      )}
    </section>
  );
};
