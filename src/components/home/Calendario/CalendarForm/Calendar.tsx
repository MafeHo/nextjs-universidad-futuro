'use client'

import React, { useState, useEffect, useRef } from 'react'
import { DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import CreateEvent from '../CreateEvent'
import { Filtro } from 'app/components/filtros'
import EventCard from '../EventCard'
import LogicService from 'app/services/logicService'
import useEventsStore from 'app/stores/useEventsStore'
import { EventoModel } from 'app/models/evento.model'

const Calendar: React.FC = () => {
    const [currentEvents, setCurrentEvents] = useState<EventApi[]>([])
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
    const [newEvent, setNewEvent] = useState({
        title: '',
        description: '',
        location: '',
        organizer: '',
        organizerId: '',
        faculty: '',
        topic: '',
        eventType: '',
        startTime: '',
        endTime: '',
        maxCapacity: '',
        attendees: '',
    })
    const [selectedDate, setSelectedDate] = useState<DateSelectArg | null>(null)
    const [calendarView, setCalendarView] = useState<string>('dayGridMonth')

    const [currentPage, setCurrentPage] = useState(0)
    const eventsPerPage = 3

    const calendarRef = useRef<FullCalendar | null>(null)
    const { setMyEvents, parseToEventApi, parsedEvents } = useEventsStore()
    const [events, setEvents] = useState<EventApi[]>([])

    const fetchEvents = async () => {
        try {
            const events = await LogicService.getEvents()
            const parsedEvents = parseToEventApi(events)
            setCurrentEvents(parsedEvents)
            setEvents(parsedEvents)
            setMyEvents(events)
            console.log('Events fetched:', events)
        } catch (error) {
            console.error('Error fetching events:', error)
        }
    }

    useEffect(() => {
        setCurrentEvents(parsedEvents)
        setEvents(parsedEvents)
    }, [parsedEvents])

    useEffect(() => {
        fetchEvents()
    }, [])

    const handleDateClick = (selected: DateSelectArg) => {
        setSelectedDate(selected)
        setIsDialogOpen(true)
    }

    const handleEventClick = (selected: EventClickArg) => {
        if (
            window.confirm(
                `Are you sure you want to delete the event "${selected.event.title}"?`
            )
        ) {
            selected.event.remove()
        }
    }

    const handleCloseDialog = () => {
        setIsDialogOpen(false)
        setNewEvent({
            title: '',
            description: '',
            location: '',
            organizer: '',
            organizerId: '',
            faculty: '',
            topic: '',
            eventType: '',
            startTime: '',
            endTime: '',
            maxCapacity: '',
            attendees: '',
        })
    }

    const handleViewChange = (view: string) => {
        setCalendarView(view)
        const calendarApi = calendarRef.current?.getApi()
        if (calendarApi) {
            calendarApi.changeView(view)
        }
    }

    const handleTodayClick = () => {
        const calendarApi = calendarRef.current?.getApi()
        if (calendarApi) {
            calendarApi.today()
        }
    }

    const handleEventsSet = (newEvents: EventApi[]) => {
        if (JSON.stringify(events) !== JSON.stringify(newEvents)) {
            setEvents(newEvents)
            setCurrentEvents(newEvents)
        }
    }

    const startIndex = currentPage * eventsPerPage
    const paginatedEvents = currentEvents.slice(
        startIndex,
        startIndex + eventsPerPage
    )

    const handleNextPage = () => {
        if (startIndex + eventsPerPage < currentEvents.length) {
            setCurrentPage(currentPage + 1)
        }
    }

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handleEditEvent = async (event: EventApi, eventEdited: EventApi) => {
        const id = event.id
        let startDate: Date | undefined
        if (event.start && eventEdited.start) {
            startDate = new Date(event.start)
            // Extraer las horas y minutos de eventEdited
            const editedStartDate = new Date(eventEdited.start)
            // Modificar las horas y minutos de startDate y endDate con las de editedStartDate y editedEndDate
            startDate.setHours(
                editedStartDate.getHours(),
                editedStartDate.getMinutes()
            )
        }

        let endDate: Date | undefined
        if (event.end && eventEdited.end) {
            endDate = new Date(event.end)
            const editedEndDate = new Date(eventEdited.end)
            endDate.setHours(editedEndDate.getHours(), editedEndDate.getMinutes())
        }

        const my_event: EventoModel = {
            id: Number(event.id),
            titulo: eventEdited.title,
            descripcion: eventEdited.extendedProps.description,
            lugar: eventEdited.extendedProps.location,
            organizadorId: event.extendedProps.organizerId,
            facultad: eventEdited.extendedProps.faculty,
            tematica: eventEdited.extendedProps.topic,
            tipoEvento: eventEdited.extendedProps.eventType,
            fechaInicio: startDate ? startDate.toISOString() : '',
            fechaFinal: endDate ? endDate.toISOString() : '',
            cupoInscripcion: eventEdited.extendedProps.maxCapacity
                ? Number(eventEdited.extendedProps.maxCapacity)
                : 0,
        }
        await LogicService.editEvent(my_event)
        console.log('Evento editado:', my_event, event)

        // const updatedEvents = [...currentEvents]

        // for (let i = 0; i < updatedEvents.length; i++) {
        //     if (updatedEvents[i].id === id) {
        //         updatedEvents[i] = {
        //             ...updatedEvents[i],
        //             id: id,
        //             title: event.title,
        //             extendedProps: {
        //                 description: event.extendedProps?.description || '',
        //                 location: event.extendedProps?.location || '',
        //                 organizerId: event.extendedProps?.organizerId || '',
        //                 faculty: event.extendedProps?.faculty || '',
        //                 topic: event.extendedProps?.topic || '',
        //                 eventType: event.extendedProps?.eventType || '',
        //                 maxCapacity: event.extendedProps?.maxCapacity || 0,
        //             },
        //             start: event.start,
        //             end: event.end,
        //         }
        //         break // Salir del bucle una vez encontrado
        //     }
        // }

        // // Actualizar el estado con la copia modificada
        // setTimeout(() => {
        //     setCurrentEvents(updatedEvents)
        //     setEvents(updatedEvents)
        // }, 1000)

        // // Transformar los eventos a un modelo simple
        // const updatedEventoModels = updatedEvents.map((e) => ({
        //     id: Number(e.id),
        //     titulo: e.title,
        //     descripcion: e.extendedProps?.description || '',
        //     lugar: e.extendedProps?.location || '',
        //     organizadorId: e.extendedProps?.organizerId || '',
        //     facultad: e.extendedProps?.faculty || '',
        //     tematica: e.extendedProps?.topic || '',
        //     tipoEvento: e.extendedProps?.eventType || '',
        //     fechaInicio: e.start ? new Date(e.start).toISOString() : '',
        //     fechaFinal: e.end ? new Date(e.end).toISOString() : '',
        //     cupoInscripcion: e.extendedProps?.maxCapacity || 0,
        // }))

        // setMyEvents(updatedEventoModels)
    }

    const handleDeleteEvent = async (event: EventApi) => {
        if (
            window.confirm(
                `Are you sure you want to delete the event "${event.title}"?`
            )
        ) {
            try {
                await LogicService.deleteEvent(Number(event.id))
                const updatedEvents = currentEvents.filter((e) => e.id !== event.id)
                setCurrentEvents(updatedEvents)
                setEvents(updatedEvents)
                const updatedEventoModels = updatedEvents.map((event) => ({
                    id: Number(event.id),
                    titulo: event.title,
                    descripcion: event.extendedProps.description,
                    lugar: event.extendedProps.location,
                    organizadorId: event.extendedProps.organizerId,
                    facultad: event.extendedProps.faculty,
                    tematica: event.extendedProps.topic,
                    tipoEvento: event.extendedProps.eventType,
                    fechaInicio: event.start ? event.start.toISOString() : '',
                    fechaFinal: event.end ? event.end.toISOString() : '',
                    cupoInscripcion: event.extendedProps.maxCapacity,
                }))
                setMyEvents(updatedEventoModels)
                console.log(`Event "${event.title}" deleted successfully.`)
            } catch (error) {
                console.error('Error deleting event:', error)
            }
        }
    }

    return (
        <div className='pt-20 pl-5 pr-5 bg-white dark:bg-gray-800 min-h-screen'>
            <div className='flex flex-col gap-8'>
                <div className='flex flex-col lg:flex-row gap-8 w-full'>
                    <div className='lg:w-2/3 w-full'>
                        {/* FullCalendar Component */}
                        <FullCalendar
                            ref={calendarRef}
                            height={'75vh'}
                            plugins={[
                                dayGridPlugin,
                                timeGridPlugin,
                                interactionPlugin,
                            ]}
                            headerToolbar={{
                                left: 'prev',
                                center: 'title',
                                right: 'next',
                            }}
                            initialView={calendarView}
                            editable={true}
                            selectable={true}
                            selectMirror={true}
                            dayMaxEvents={true}
                            select={handleDateClick}
                            eventClick={handleEventClick}
                            events={events.map((event) => ({
                                id: event.id,
                                title: event.title,
                                start: event.start || undefined,
                                end: event.end || undefined,
                                allDay: event.allDay,
                                extendedProps: event.extendedProps,
                            }))}
                            eventsSet={handleEventsSet}
                            locale='es'
                            themeSystem='standard'
                        />

                        {/* Custom View Buttons */}
                        <div className='flex justify-between mt-4'>
                            <button
                                className='px-3 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white'
                                onClick={handleTodayClick}>
                                Hoy
                            </button>
                            <div className='space-x-2'>
                                <button
                                    className={`px-4 py-2 rounded ${
                                        calendarView === 'dayGridMonth'
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-200 text-gray-700'
                                    }`}
                                    onClick={() => handleViewChange('dayGridMonth')}>
                                    Mes
                                </button>
                                <button
                                    className={`px-4 py-2 rounded ${
                                        calendarView === 'timeGridWeek'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-200 text-gray-700'
                                    }`}
                                    onClick={() => handleViewChange('timeGridWeek')}>
                                    Semana
                                </button>
                                <button
                                    className={`px-4 py-2 rounded ${
                                        calendarView === 'timeGridDay'
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-200 text-gray-700'
                                    }`}
                                    onClick={() => handleViewChange('timeGridDay')}>
                                    Día
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Filtro Component */}
                    <div className='lg:w-1/3 w-full mb-4 lg:mt-5'>
                        <Filtro />
                    </div>
                </div>

                {/* Eventos Component */}
                <div className='w-full'>
                    <div className='text-2xl font-extrabold px-4 py-4'>Eventos</div>
                    <div className='flex justify-between items-center my-4 w-full'>
                        <button
                            className=' hover:text-blue-500'
                            onClick={handlePreviousPage}
                            disabled={currentPage === 0}>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='25'
                                height='25'
                                fill='currentColor'
                                className='bi bi-arrow-left-circle'
                                viewBox='0 0 16 16'>
                                <path
                                    fillRule='evenodd'
                                    d='M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z'
                                />
                            </svg>
                        </button>
                        <ul className='mx-2 grid gap-4 w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                            {paginatedEvents.map((event: EventApi) => (
                                <EventCard
                                    key={event.id}
                                    event={event}
                                    onEdit={(eventEdited) =>
                                        handleEditEvent(event, eventEdited)
                                    }
                                    onDelete={() => handleDeleteEvent(event)}
                                />
                            ))}
                        </ul>
                        <button
                            className=' hover:text-blue-500'
                            onClick={handleNextPage}
                            disabled={
                                startIndex + eventsPerPage >= currentEvents.length
                            }>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='25'
                                height='25'
                                fill='currentColor'
                                className='bi bi-arrow-right-circle'
                                viewBox='0 0 16 16'>
                                <path
                                    fillRule='evenodd'
                                    d='M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z'
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <CreateEvent
                isDialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
                newEvent={newEvent}
                setNewEvent={setNewEvent}
                handleCloseDialog={handleCloseDialog}
                selectedDate={selectedDate}
            />
        </div>
    )
}

export default Calendar
