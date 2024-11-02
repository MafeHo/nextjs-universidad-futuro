'use client'

import React, { useState, useEffect, useRef } from 'react'

import {
    formatDate,
    DateSelectArg,
    EventClickArg,
    EventApi,
} from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import CreateEvent from '../CreateEvent'
//import esLocale from '@fullcalendar/core/locales/es'; // Importa el idioma español
import { Filtro } from 'app/components/filtros'
import EventCard from '../EventCard'
import LogicService from 'app/services/logicService'
import { title } from 'process'

const Calendar: React.FC = () => {
    const [currentEvents, setCurrentEvents] = useState<EventApi[]>([])
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
    const [newEvent, setNewEvent] = useState({
        title: '',
        organizer: '',
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

    // useRef para acceder al componente FullCalendar
    const calendarRef = useRef<FullCalendar | null>(null)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedEvents = localStorage.getItem('events')
            if (savedEvents) {
                setCurrentEvents(JSON.parse(savedEvents))
            }
        }
    }, [])

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('events', JSON.stringify(currentEvents))
        }
    }, [currentEvents])

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
            organizer: '',
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
        // Cambia la vista de FullCalendar usando la referencia
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

    return (
        <div className='pt-20 pl-5 pr-5 bg-white dark:bg-gray-800 min-h-screen'>
            <div className='flex flex-col lg:flex-row gap-8 '>
                <div className='lg:w-2/3 w-full'>
                    {/* FullCalendar Component */}

                    <FullCalendar
                        ref={calendarRef}
                        height={'75vh'}
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
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
                        eventsSet={(events) => setCurrentEvents(events)}
                        initialEvents={
                            typeof window !== 'undefined'
                                ? JSON.parse(localStorage.getItem('events') || '[]')
                                : []
                        }
                        locale='es'
                        themeSystem='standard'
                    />

                    {/* Custom View Buttons */}
                    <div className='flex justify-between mt-4'>
                        <div>
                            <button
                                className='px-3 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white'
                                onClick={handleTodayClick}>
                                Hoy
                            </button>
                        </div>

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

                <div className='lg:w-1/3 w-full mb-4 lg:mt-5 '>
                    <div className='lg:mb-14 mb-7'>
                        <Filtro />
                    </div>

                    <div className='text-2xl font-extrabold px-4 py-6'>Eventos</div>
                    <ul className='space-y-4 px-4'>
                        {currentEvents.length <= 0 && (
                            <div className='italic text-center text-gray-400'>
                                Por el momento no hay eventos
                            </div>
                        )}

                        {currentEvents.length > 0 &&
                            currentEvents.map((event: EventApi) => (
                                <EventCard key={event.id} event={event} />
                            ))}
                    </ul>
                </div>
            </div>

            <CreateEvent
                isDialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
                newEvent={newEvent}
                setNewEvent={setNewEvent}
                handleCloseDialog={handleCloseDialog}
                selectedDate={selectedDate}></CreateEvent>
        </div>
    )
}

export default Calendar
