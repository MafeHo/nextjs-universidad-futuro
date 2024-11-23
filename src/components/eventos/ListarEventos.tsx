//ListarEventos.tsx
'use client'

import { EventApi } from '@fullcalendar/core'
import { formatDate } from '@fullcalendar/core'
import { SecurityConfig } from 'app/config/securityConfig'
import LogicService from 'app/services/logicService'
import useEventsStore from 'app/stores/useEventsStore'
import useSecurityStore from 'app/stores/useSecurityStore'
import { useEffect, useState } from 'react'
import Swal from "sweetalert2";

export const ListarEventos = () => {
    const { parseToEventApi } = useEventsStore()
    const { user } = useSecurityStore()
    const [events, setEvents] = useState<EventApi[]>([])

    useEffect(() => {
        LogicService.getEvents().then((events) => {
            setEvents(parseToEventApi(events))
        })
    }, [])

    const handleAsistance = async (event: EventApi) => {
        if((user?.roleId == SecurityConfig.ID_ROLE_PARTICIPANT || user?.roleId == SecurityConfig.ID_ROLE_ADMIN) && (user.correo)){
            
            const participantId = await LogicService.getParticipantIdByEmail(user.correo)
            const eventId = event.id
        }
        else{
            alert("No eres participante")
        }
    }

    return (
        <section className='md:flex mt-5 justify-center items-center gap-6 flex-col'>
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
                            <p>Facultad: {event.extendedProps?.faculty}</p>
                            <p>Temática: {event.extendedProps?.topic}</p>
                            <p>Tipo de Evento: {event.extendedProps?.eventType}</p>
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
                                    ? new Date(event.end).toLocaleTimeString(
                                          'es-ES',
                                          {
                                              hour: '2-digit',
                                              minute: '2-digit',
                                          }
                                      )
                                    : 'No especificado'}
                            </p>
                            <p>Cupos Máximos: {event.extendedProps?.maxCapacity}</p>
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
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    )
}
