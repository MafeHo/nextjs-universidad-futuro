'use client'

import { EventApi } from '@fullcalendar/core'
import { formatDate } from '@fullcalendar/core'
import LogicService from 'app/services/logicService'
import useEventsStore from 'app/stores/useEventsStore'
import useSecurityStore from 'app/stores/useSecurityStore'
import { useEffect, useState } from 'react'

export default function Cards() {
    const { parseToEventApi } = useEventsStore()
    const { user } = useSecurityStore()
    const [events, setEvents] = useState<EventApi[]>([])

    useEffect(() => {
        LogicService.getEvents().then((events) => {
            setEvents(parseToEventApi(events))
        })
    }, [])

    const handleInscription = async (event: EventApi) => {
        console.log('Inscribirse al evento:', event.title)
        if (!user) {
            alert('Debes iniciar sesión para inscribirte a un evento')
            return
        }

        if (!user.correo) {
            alert('El correo del usuario no está disponible')
            return
        }
        LogicService.getParticipantIdByEmail(user.correo).then((participante) => {
            console.log('====================================')
            console.log('Participante:', participante)
            console.log('====================================')
        })

        const participantArr = await LogicService.getParticipantIdByEmail(
            user.correo
        )
        let participantId = null
        if (participantArr) {
            participantId =
                Array.isArray(participantArr) && participantArr.length > 0
                    ? participantArr[0].id
                    : null
        }
        if (!participantArr || !participantId) {
            alert('No se encontró el participante')
            return
        }

        let inscription = {
            fecha: new Date(),
            eventoId: Number(event.id),
            participanteId: participantId,
        }

        await LogicService.inscriptionToEvent(inscription).then(() => {
            alert('Inscripción exitosa')
        })
    }

    return (
        <section className='md:flex -mt-20 justify-center items-center gap-6'>
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
                                    handleInscription(event)
                                }}>
                                Inscribirse
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    )
}
