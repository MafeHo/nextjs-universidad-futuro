import React, { useEffect, useState } from 'react'
import { EventApi } from '@fullcalendar/core'
import { formatDate } from '@fullcalendar/core'
import Swal from 'sweetalert2'
import useSecurityStore from 'app/stores/useSecurityStore'
import { SecurityConfig } from 'app/config/securityConfig'
import LogicService from 'app/services/logicService'

interface EventCardProps {
    event: EventApi
    onEdit: (event: EventApi) => void // Prop para manejar edición
    onDelete: (event: EventApi) => void // Prop para manejar eliminación
}

const EventCard: React.FC<EventCardProps> = ({ event, onEdit, onDelete }) => {
    const { user } = useSecurityStore()

    const [organizerId, setOrganizerId] = useState<number | null>(null)
    const [participantId, setParticipantId] = useState<number | null>(null)

    useEffect(() => {
        if (user?.correo) {
            LogicService.getOrganizerIdByEmail(user.correo).then((organizerArr) => {
                setOrganizerId(
                    Array.isArray(organizerArr) && organizerArr.length > 0
                        ? organizerArr[0].id
                        : null
                )
            })

            LogicService.getParticipantIdByEmail(user.correo).then(
                (participantArr) => {
                    setParticipantId(
                        Array.isArray(participantArr) && participantArr.length > 0
                            ? participantArr[0].id
                            : null
                    )
                }
            )
        }
    }, [])

    // Función para manejar la edición del evento
    const handleEdit = async () => {
        const { value: formValues } = await Swal.fire({
            title: 'Editar Evento',
            html: `
      <div class="flex items-center justify-between flex-col md:flex-row mb-4">
      <label for="swal-input1">Título</label>
      <input id="swal-input1" class="border border-gray-300 rounded px-7 py-2" value="${
          event.title || ''
      }" placeholder="Título" />
      </div>

      <div class="flex items-center justify-between flex-col md:flex-row mb-4">
      <label for="swal-input2">Descripción</label>
      <input id="swal-input2" class="border border-gray-300 rounded px-7 py-2" value="${
          event.extendedProps.description || ''
      }" placeholder="Descripción" />
      </div>

      <div class="flex items-center justify-between flex-col md:flex-row mb-4">
      <label for="swal-input3">Lugar</label>
      <input id="swal-input3" class="border border-gray-300 rounded px-7 py-2" value="${
          event.extendedProps.location || ''
      }" placeholder="Lugar" />
      </div>


      <div class="flex items-center justify-between flex-col md:flex-row mb-4">
        <label for="swal-input4">Facultad</label>
        <select id="swal-input4" class="border border-gray-300 rounded px-3 py-2">
          <option value="" ${
              !event.extendedProps.topic ? 'selected' : ''
          }>Seleccionar Facultad</option>
          <option value="Artes y Humanidades" ${
              event.extendedProps.faculty === 'Artes y Humanidades' ? 'selected' : ''
          }>
            Artes y Humanidades
          </option>
          <option value="Ciencias Agropecuarias" ${
              event.extendedProps.faculty === 'Ciencias Agropecuarias'
                  ? 'selected'
                  : ''
          }>
            Ciencias Agropecuarias
          </option>
          <option value="Ciencias Exactas y Naturales" ${
              event.extendedProps.faculty === 'Ciencias Exactas y Naturales'
                  ? 'selected'
                  : ''
          }>
            Ciencias Exactas y Naturales
          </option>
          <option value="Ciencias Jurídicas y Sociales" ${
              event.extendedProps.faculty === 'Ciencias Jurídicas y Sociales'
                  ? 'selected'
                  : ''
          }>
            Ciencias Jurídicas y Sociales
          </option>
          <option value="Ciencias para la salud" ${
              event.extendedProps.faculty === 'Ciencias para la salud'
                  ? 'selected'
                  : ''
          }>
            Ciencias para la salud
          </option>
          <option value="Ingeniería" ${
              event.extendedProps.faculty === 'Ingeniería' ? 'selected' : ''
          }>Ingeniería</option>
        </select>
      </div>

      <div class="flex items-center justify-between flex-col md:flex-row mb-4">
        <label for="swal-input5">Temática</label>
        <select id="swal-input5" class="border border-gray-300 rounded px-10 py-2">
          <option value="" ${
              !event.extendedProps.topic ? 'selected' : ''
          }>Seleccionar Temática</option>
          <option value="Academico" ${
              event.extendedProps.topic === 'Academico' ? 'selected' : ''
          }>Académico</option>
          <option value="Cultural" ${
              event.extendedProps.topic === 'Cultural' ? 'selected' : ''
          }>Cultural</option>
        </select>
      </div>

      <div class="flex items-center justify-between flex-col md:flex-row mb-4">
        <label for="swal-input6">Tipo de Evento</label>
        <select id="swal-input6" class="border border-gray-300 rounded px-4 py-2">
          <option value="" ${
              !event.extendedProps.eventType ? 'selected' : ''
          }>Seleccionar Tipo de Evento</option>
          <option value="Conferencia" ${
              event.extendedProps.eventType === 'Conferencia' ? 'selected' : ''
          }>Conferencia</option>
          <option value="Taller" ${
              event.extendedProps.eventType === 'Taller' ? 'selected' : ''
          }>Taller</option>
          <option value="Seminario" ${
              event.extendedProps.eventType === 'Seminario' ? 'selected' : ''
          }>Seminario</option>
        </select>
      </div>

      <div class="flex items-center justify-between flex-col md:flex-row mb-4">
        <label for="swal-input7">Hora Inicio</label>
        <input
          id="swal-input7"
          class="border border-gray-300 rounded px-[73px] py-2"
          type="time"
          value="${formatDate(event.start!, {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
          }).slice(0, 5)}"
        />
      </div>

      <div class="flex items-center justify-between flex-col md:flex-row mb-4">
      <label for="swal-input8">Hora Fin</label>
      <input
        id="swal-input8"
        class="border border-gray-300 rounded px-[73px] py-2 "
        type="time"
        value="${formatDate(event.end!, {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        }).slice(0, 5)}"
      />
      </div>

      <div class="flex items-center justify-between flex-col md:flex-row mb-4">
      <label for="swal-input9">Asistentes</label>
      <input id="swal-input9" class="border border-gray-300 rounded px-7 py-2 " value="${
          event.extendedProps.maxCapacity || ''
      }" placeholder="Cupos Máximos" />
      </div>
    `,

            focusConfirm: false,
            preConfirm: () => {
                const titulo = (
                    document.getElementById('swal-input1') as HTMLInputElement
                ).value
                const descripcion = (
                    document.getElementById('swal-input2') as HTMLInputElement
                ).value
                const lugar = (
                    document.getElementById('swal-input3') as HTMLInputElement
                ).value
                const facultad = (
                    document.getElementById('swal-input4') as HTMLInputElement
                ).value
                const tematica = (
                    document.getElementById('swal-input5') as HTMLInputElement
                ).value
                const tipoEvento = (
                    document.getElementById('swal-input6') as HTMLInputElement
                ).value
                const horaInicio = (
                    document.getElementById('swal-input7') as HTMLInputElement
                ).value
                const horaFin = (
                    document.getElementById('swal-input8') as HTMLInputElement
                ).value
                const maxCapacidad = (
                    document.getElementById('swal-input9') as HTMLInputElement
                ).value

                if (
                    !titulo ||
                    !descripcion ||
                    !lugar ||
                    // !facultad ||
                    // !tematica ||
                    // !tipoEvento ||
                    !horaInicio ||
                    !horaFin ||
                    !maxCapacidad
                ) {
                    Swal.showValidationMessage(
                        'Los campos del titulo, la descripcion, el lugar, la hora de inicio, la hora de fin y los cupos máximos son obligatorios.'
                    )
                    return false
                }

                console.log('horas', horaInicio, horaFin, event.start, event.end)

                return {
                    titulo,
                    descripcion,
                    lugar,
                    facultad,
                    tematica,
                    tipoEvento,
                    horaInicio,
                    horaFin,
                    maxCapacidad,
                }
            },
        })

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
                    maxCapacity: formValues.maxCapacidad,
                },
                start: new Date(`1970-01-01T${formValues.horaInicio}:00`), // Convertir horaInicio en objeto Date
                end: new Date(`1970-01-01T${formValues.horaFin}:00`), // Convertir horaFin en objeto Date
            }
            onEdit(updatedEvent) // Llama a la función de edición pasándole el evento actualizado
            Swal.fire(
                'Editado',
                'El evento ha sido editado correctamente.',
                'success'
            )
        }
    }

    // Función para manejar la eliminación del evento
    const handleDelete = async () => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text:
                'Estas seguro que deseas eliminar el evento ' +
                event.title +
                '. ' +
                'Esta acción no se puede deshacer.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'No, cancelar',
        })

        if (result.isConfirmed) {
            onDelete(event) // Llama a la función de eliminación
            Swal.fire('Eliminado', 'El evento ha sido eliminado.', 'success')
        }
    }

    const handleInscription = async () => {
        if (!user) {
            Swal.fire({
                title: 'Por favor inicia sesión',
                text: 'Debes iniciar sesión para inscribirte en un evento.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Iniciar sesión',
                cancelButtonText: 'Cancelar',
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = '/login'
                }
            })
            return
        }

        if (!user.correo) {
            Swal.fire({
                title: 'Información faltante',
                text: 'El correo del usuario no está disponible.',
                icon: 'error',
                timer: 3000,
                timerProgressBar: true,
                showConfirmButton: false,
                allowOutsideClick: false,
            })
            return
        }

        if (!participantId) {
            Swal.fire({
                title: 'Error',
                text: 'No se encontró el participante.',
                icon: 'error',
                timer: 3000,
                timerProgressBar: true,
                showConfirmButton: false,
                allowOutsideClick: false,
            })
            return
        }

        if (event.extendedProps.maxCapacity === event.extendedProps.attendees) {
            Swal.fire({
                title: 'Cupos llenos',
                text: 'No hay cupos disponibles para este evento.',
                icon: 'error',
                timer: 3000,
                timerProgressBar: true,
                showConfirmButton: false,
                allowOutsideClick: false,
            })
            return
        }

        const eventId = Number(event.id)

        if (await LogicService.isParticipantInEvent(participantId, eventId)) {
            Swal.fire({
                title: 'Ya inscrito',
                text: 'Ya estás inscrito en este evento.',
                icon: 'info',
                timer: 3000,
                timerProgressBar: true,
                showConfirmButton: false,
                allowOutsideClick: false,
            })
            return
        }

        // if (event.extendedProps.organizadorId === organizerId) {
        //     Swal.fire({
        //         title: 'Organizador',
        //         text: 'Eres el organizador de este evento.',
        //         icon: 'info',
        //         timer: 3000,
        //         timerProgressBar: true,
        //         showConfirmButton: false,
        //         allowOutsideClick: false,
        //     })
        //     return
        // }

        if (!eventId) {
            Swal.fire({
                title: 'Error',
                text: 'No se encontró el evento.',
                icon: 'error',
                timer: 3000,
                timerProgressBar: true,
                showConfirmButton: false,
                allowOutsideClick: false,
            })
            return
        }

        const inscription = {
            eventoId: eventId,
            participanteId: participantId,
        }
        await LogicService.inscriptionToEvent(inscription)
        Swal.fire({
            title: 'Inscripción confirmada',
            text: `Te has inscrito en el evento: ${event.title}`,
            icon: 'success',
            timer: 3000, // Tiempo de cierre automático (3 segundos)
            timerProgressBar: true, // Muestra la barra de progreso
            showConfirmButton: false, // Oculta el botón de confirmación
            allowOutsideClick: false, // Impide cerrar haciendo clic fuera
        })
    }

    // Función para manejar el envío de recordatorio
    const handleReminder = async (event: EventApi) => {
        // Aquí puedes añadir validaciones si es necesario
        try {
            await LogicService.sendReminder(Number(event.id))
            Swal.fire({
                title: 'Recordatorio enviado',
                text: 'El recordatorio se ha enviado a todos los inscritos.',
                icon: 'success',
                timer: 3000,
                timerProgressBar: true,
                showConfirmButton: false,
                allowOutsideClick: false,
            })
        } catch (error) {
            console.error('Error sending reminder:', error)
            Swal.fire({
                title: 'Error al enviar el recordatorio',
                text: 'Por favor intenta de nuevo.',
                icon: 'error',
                timer: 3000,
                timerProgressBar: true,
                showConfirmButton: false,
                allowOutsideClick: false,
            })
        }
    }

    return (
        <li className='border border-gray-200 shadow px-3 py-2 rounded-md text-blue-800 dark:text-white bg-white dark:bg-gray-900'>
            <div className='font-bold'>{event.title}</div>
            <div className='text-sm text-slate-600 dark:text-white'>
                <p>Descripcion: {event.extendedProps.description}</p>
                <p>Lugar: {event.extendedProps.location}</p>
                <p>Organizador: {event.extendedProps.organizer}</p>
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
                    {formatDate(event.start!, {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: false,
                    })}
                </p>
                <p>
                    Hora Fin:{' '}
                    {formatDate(event.end!, {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: false,
                    })}
                </p>
                <p>Cupos Máximos: {event.extendedProps.maxCapacity}</p>
                {/* {event.extendedProps.attendees &&
                event.extendedProps?.maxCapacity ? (
                    <p>
                        Cupos disponibles:
                        {event.extendedProps?.maxCapacity -
                            event.extendedProps?.attendees}
                    </p>
                ) : null} */}
            </div>

            {
                // Si el usuario es administrador
                user?.rolId === SecurityConfig.ID_ROLE_ADMIN ||
                // Si el usuario es participante, muestra el botón de inscripción
                user?.rolId === SecurityConfig.ID_ROLE_PARTICIPANT ||
                // si no ha iniciado sesion muestra el boton de inscripcion
                !user ||
                // o si es organizador y no es el creador del evento
                (user?.rolId === SecurityConfig.ID_ROLE_ORGANIZER &&
                    organizerId &&
                    organizerId !== event.extendedProps.organizadorId) ? (
                    <div className='mt-4'>
                        <button
                            className='w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-md text-center'
                            onClick={handleInscription}>
                            Inscribirse
                        </button>
                    </div>
                ) : null
            }
            {user?.rolId === SecurityConfig.ID_ROLE_ADMIN ||
            user?.rolId === SecurityConfig.ID_ROLE_ORGANIZER ? (
                <div className='mt-4 flex justify-center space-x-4'>
                    <button
                        className='p-2 bg-green-500 hover:bg-green-400 text-white rounded-md'
                        onClick={() => handleReminder(event)}>
                        Recordatorio
                    </button>
                    <button
                        className='p-2 bg-blue-500 hover:bg-blue-400 text-white rounded-md'
                        onClick={handleEdit} // Llama a la función de edición
                    >
                        Editar
                    </button>
                    <button
                        className='p-2 bg-red-600 hover:bg-red-500 text-white rounded-md'
                        onClick={handleDelete} // Llama a la función de eliminación
                    >
                        Eliminar
                    </button>
                </div>
            ) : null}
        </li>
    )
}

export default EventCard
