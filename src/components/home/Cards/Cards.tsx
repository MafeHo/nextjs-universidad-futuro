/* eslint-disable @next/next/no-img-element */
'use client'

import { EventApi } from '@fullcalendar/core'
import { formatDate } from '@fullcalendar/core'
import LogicService from 'app/services/logicService'
import useEventsStore from 'app/stores/useEventsStore'
import useSecurityStore from 'app/stores/useSecurityStore'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

interface CardsProps {
    limit?: number
    defaultImages?: string[]
}

export default function Cards({ limit, defaultImages }: CardsProps) {
    const { parseToEventApi } = useEventsStore()
    const { user } = useSecurityStore()
    const [events, setEvents] = useState<EventApi[]>([])

    // useEffect(() => {
    //     LogicService.getEvents().then((events) => {
    //         setEvents(parseToEventApi(events))
    //     })
    // }, [])

    useEffect(() => {
        LogicService.getEvents().then((events) => {
            const parsedEvents = parseToEventApi(events)

            // ordena los eventos y usa el limit para mostrar la cantidad de eventos indicado
            const filteredEvents = limit
                ? parsedEvents
                      .sort(
                          (a, b) =>
                              new Date(a.start!).getTime() - new Date(b.start!).getTime()
                      )
                      .slice(0, limit)
                : parsedEvents

            setEvents(filteredEvents)
        })
    }, [limit, parseToEventApi])

    // const getAttendees = (event: EventApi) => {
    //     let count = 0
    //     LogicService.getInscriptionsToEvent(Number(event.id)).then(
    //         (inscriptions) => {
    //             count = inscriptions.count
    //         }
    //     )
    //     return count
    // }

    const handleInscription = async (event: EventApi) => {
        try {
            if (!user) {
                Swal.fire({
                    title: 'Acción requerida',
                    text: 'Debes iniciar sesión para inscribirte a un evento.',
                    icon: 'warning',
                    timer: 3000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    allowOutsideClick: false,
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

            // Obtener ID del participante
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

            // Crear inscripción
            const inscription = {
                fecha: new Date(),
                eventoId: Number(event.id),
                participanteId: participantId,
            }

            await LogicService.inscriptionToEvent(inscription)

            // Generar el código QR
            const qrCode = await LogicService.generateQRCode(
                participantId,
                Number(event.id)
            )

            // Crear un enlace de descarga
            const link = document.createElement('a')
            link.href = qrCode
            link.download = `QR_Evento_${event.title.replace(/\s/g, '_')}.png`

            // Mostrar modal con QR y opción de descarga
            Swal.fire({
                title: 'Inscripción exitosa',
                text: `Te has inscrito al evento: ${event.title}`,
                imageUrl: qrCode, // Código QR en formato base64
                imageWidth: 200,
                icon: 'success',
                imageHeight: 200,
                imageAlt: 'Código QR',
                confirmButtonText: 'Cerrar',
                footer: `<a href="${link.href}" download="${link.download}" style="color: #007BFF;">Descargar QR</a>`,
            })
        } catch (error) {
            console.error('Error en el proceso de inscripción:', error)
            Swal.fire({
                title: 'Error',
                text: 'Ocurrió un error al inscribirte al evento.',
                icon: 'error',
                timer: 3000,
                timerProgressBar: true,
                showConfirmButton: false,
                allowOutsideClick: false,
            })
        }
    }

    return (
        <section className='md:flex -mt-20 justify-center items-center gap-6'>
            <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {events.length <= 0 && (
                    <p className='italic text-gray-400'>No hay eventos próximos</p>
                )}
                {events.map((event, index) => (
                    
                    <div
                        key={event.id}
                        className='border border-gray-200 shadow px-4 py-2 rounded-md text-blue-800 dark:text-white bg-white dark:bg-gray-900'>
                        <img
                        src={
                            defaultImages && defaultImages[index % defaultImages.length]
                                ? defaultImages[index % defaultImages.length]
                                : event.extendedProps?.image || '/images/placeholder.jpg'
                        }
                        alt={event.title}
                        className="w-full h-60 object-cover rounded-t-md"
                    />
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
                                <p>
                                    Tipo de Evento: {event.extendedProps.eventType}
                                </p>
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
                            {/* {event.extendedProps?.maxCapacity ? (
                                <p>
                                    Cupos disponibles:
                                    {event.extendedProps?.maxCapacity -
                                        getAttendees(event)}
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
                                    handleInscription(event)
                                }}>
                                Inscribirse
                            </button>
                        </div>
                    </div>
                ))}
            </ul>
        </section>
    )
}
