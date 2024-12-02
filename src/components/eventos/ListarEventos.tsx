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
    if (!user) {
      Swal.fire({
          icon: 'error',
          title: 'Por favor inicia sesion. Acceso Denegado',
          text: 'No has iniciado sesión.',
          confirmButtonText: 'Aceptar',
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
          allowOutsideClick: false,
      })
      return;
    }

    if (user?.rolId == SecurityConfig.ID_ROLE_ADMIN) {
      // LogicService.getEvents().then((events) => {
      //   setEvents(parseToEventApi(events))
      // });
      if (user.correo) {
        LogicService.getEventsByOrganizerEmail(user.correo).then((events) => {
            setEvents(parseToEventApi(events))
        });
      }

    } else if (user?.rolId == SecurityConfig.ID_ROLE_ORGANIZER && user.correo) {
      // Obtener los eventos de ese organizador
      LogicService.getEventsByOrganizerEmail(user.correo).then((events) => {
        setEvents(parseToEventApi(events));
      });
    } else if (user?.rolId == SecurityConfig.ID_ROLE_PARTICIPANT && user.correo) {
      // Obtener los eventos que ese participante inscribio
      LogicService.getEventsByParticipantEmail(user.correo).then((events) => {
        setEvents(parseToEventApi(events));
      });
    }

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
      Swal.fire({
        icon: 'error',
        title: 'Acceso Denegado',
        text: 'No eres participante para registrar asistencia.',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  const handleEdit = async (event: EventApi) => {
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
      setEvents((prevEvents) =>
        prevEvents.map((e) => (e.id === event.id ? updatedEvent : e))
      );// Llama a la función de edición pasándole el evento actualizado
      Swal.fire("Editado", "El evento ha sido editado correctamente.", "success");
    }
  };

  const handleDelete = async (event: EventApi) => {
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
      setEvents((prevEvents) => prevEvents.filter((e) => e.id !== event.id));
      Swal.fire("Eliminado", "El evento ha sido eliminado.", "success");
    }
  };

  // Función para manejar el envío de recordatorio
  const handleReminder = () => {
    // Aquí puedes añadir validaciones si es necesario
    Swal.fire({
      title: "Recordatorio enviado",
      text: "El recordatorio se ha enviado a todos los inscritos.",
      icon: "success",
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
      allowOutsideClick: false,
    });
  };

  return (
      <section className='md:flex mt-5 mx-5 justify-center items-center gap-6 flex-col'>
          <h3>Mis eventos</h3>
          <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {events.length <= 0 && (
                  <p className='italic text-gray-400'>No hay eventos próximos</p>
              )}
              {events.map((event) => (
                  <li
                      key={event.id}
                      className='border border-gray-200 shadow px-4 py-2 rounded-md text-blue-800 dark:text-white bg-white dark:bg-gray-900'>
                      <div className='font-bold'>{event.title}</div>
                      <div className='text-sm text-slate-600 dark:text-white'>
                          <p>Descripcion: {event.extendedProps?.description}</p>
                          <p>Lugar: {event.extendedProps?.location}</p>
                          <p>Organizador: {event.extendedProps?.organizer}</p>
                          {event.extendedProps.faculty ? (
                              <p>Facultad: {event.extendedProps.faculty}</p>
                          ) : null}
                          {event.extendedProps.topic ? (
                              <p>Tematica: {event.extendedProps.topic}</p>
                          ) : null}
                          {event.extendedProps.eventType ? (
                              <p>Tipo de Evento: {event.extendedProps.eventType}</p>
                          ) : null}
                          <p>
                              Hora Inicio:{' '}
                              {event.start
                                  ? new Date(event.start).toLocaleTimeString(
                                        'es-ES',
                                        {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        }
                                    )
                                  : 'No especificado'}
                          </p>
                          <p>
                              Hora Fin:{' '}
                              {event.end
                                  ? new Date(event.end).toLocaleTimeString('es-ES', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })
                                  : 'No especificado'}
                          </p>
                          <p>Cupos Máximos: {event.extendedProps?.maxCapacity}</p>
                          {/* {event.extendedProps?.attendees &&
                          event.extendedProps?.maxCapacity ? (
                              <p>
                                  Cupos disponibles:
                                  {event.extendedProps?.maxCapacity -
                                      event.extendedProps?.attendees}
                              </p>
                          ) : null} */}
                      </div>
                      <br />
                      <label className='text-slate-950 dark:text-white'>
                          {formatDate(event.start!, {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                          })}
                      </label>
                      <div className='mt-4'>
                          <button
                              className='w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-md text-center'
                              onClick={() => {
                                  handleAsistance(event)
                              }}>
                              Registrar Asistencia
                          </button>
                          <button
                              className='w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-md text-center mt-2'
                              onClick={() => openModal(event)} // Llama a la función y pasa el evento seleccionado
                          >
                              Encuesta
                          </button>
                      </div>
                      <div className='mt-4 flex justify-center space-x-4'>
                          <button
                              className='p-2 bg-green-500 hover:bg-green-400 text-white rounded-md'
                              onClick={() => handleReminder()}>
                              Recordatorio
                          </button>
                          <button
                              className='p-2 bg-blue-500 hover:bg-blue-400 text-white rounded-md'
                              onClick={() => handleEdit(event)}>
                              Editar
                          </button>
                          <button
                              className='p-2 bg-red-600 hover:bg-red-500 text-white rounded-md'
                              onClick={() => handleDelete(event)}>
                              Eliminar
                          </button>
                      </div>
                  </li>
              ))}
          </ul>
          {isModalOpen && (
              <div
                  className='fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50'
                  role='dialog'>
                  <div className='relative bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-[85%] md:max-w-lg max-h-screen overflow-y-auto h-[600px] md:h-[700px]'>
                      {/* Botón de cierre */}
                      <button
                          className='absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:text-gray-500'
                          onClick={closeModal}>
                          ✕
                      </button>

                      {/* Título del modal */}
                      <h2 className='text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center'>
                          Encuesta de Satisfacción
                      </h2>

                      {/* Instrucciones */}
                      <h3 className='text-base md:text-lg font-medium text-gray-800 dark:text-white mb-4 text-center'>
                          Ten presente que 1= Muy malo y 5= Muy bueno
                      </h3>

                      {/* Nombre del evento */}
                      <div className='mb-4'>
                          <label className='block text-gray-700 dark:text-gray-300 font-medium mb-2'>
                              Evento:
                          </label>
                          <p className='text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 p-2 rounded'>
                              {selectedEvent?.title || 'Evento no especificado'}
                          </p>
                      </div>

                      {/* Formulario */}
                      <FormSatisfaccion closeModal={closeModal} />
                  </div>
              </div>
          )}
      </section>
  )
};
