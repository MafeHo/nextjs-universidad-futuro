"use client";

import React, { useState, useEffect, useRef } from "react";

import {
  //formatDate,
  DateSelectArg,
  EventClickArg,
  EventApi,
} from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import CreateEvent from "../CreateEvent";
//import esLocale from '@fullcalendar/core/locales/es'; // Importa el idioma español
import { Filtro } from "app/components/filtros";
import EventCard from "../EventCard";
import LogicService from "app/services/logicService";
import useEventsStore from "app/stores/useEventsStore";

const Calendar: React.FC = () => {
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    location: "",
    organizer: "",
    faculty: "",
    topic: "",
    eventType: "",
    startTime: "",
    endTime: "",
    maxCapacity: "",
    attendees: "",
  });
  const [selectedDate, setSelectedDate] = useState<DateSelectArg | null>(null);
  const [calendarView, setCalendarView] = useState<string>("dayGridMonth");

  // useRef para acceder al componente FullCalendar
  const calendarRef = useRef<FullCalendar | null>(null);

  const { setMyEvents, parseToEventApi, parsedEvents } = useEventsStore();
  const [events, setEvents] = useState<EventApi[]>([]);

  const fetchEvents = async () => {
    try {
      const events = await LogicService.getEvents();
      const parsedEvents = parseToEventApi(events);
      setCurrentEvents(parsedEvents);
      setEvents(parsedEvents);
      setMyEvents(events);
      console.log("Events fetched:", events);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    setCurrentEvents(parsedEvents);
    setEvents(parsedEvents);
  }, [parsedEvents]);

  useEffect(() => {
    fetchEvents();
  }, []);

  // useEffect(() => {
  //     if (typeof window !== 'undefined') {
  //         const savedEvents = localStorage.getItem('events')
  //         if (savedEvents) {
  //             setCurrentEvents(JSON.parse(savedEvents))
  //         }
  //     }
  // }, [])

  // useEffect(() => {
  //     if (typeof window !== 'undefined') {
  //         localStorage.setItem('events', JSON.stringify(currentEvents))
  //     }
  // }, [currentEvents])

  const handleDateClick = (selected: DateSelectArg) => {
    setSelectedDate(selected);
    setIsDialogOpen(true);
  };

  const handleEventClick = (selected: EventClickArg) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event "${selected.event.title}"?`
      )
    ) {
      selected.event.remove();
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setNewEvent({
      title: "",
      description: "",
      location: "",
      organizer: "",
      faculty: "",
      topic: "",
      eventType: "",
      startTime: "",
      endTime: "",
      maxCapacity: "",
      attendees: "",
    });
  };

  const handleViewChange = (view: string) => {
    setCalendarView(view);
    // Cambia la vista de FullCalendar usando la referencia
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.changeView(view);
    }
  };

  const handleTodayClick = () => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.today();
    }
  };

  const handleEventsSet = (newEvents: EventApi[]) => {
    if (JSON.stringify(events) !== JSON.stringify(newEvents)) {
      setEvents(newEvents);
      setCurrentEvents(newEvents);
    }
  };

  return (
    <div className="pt-20 pl-5 pr-5 bg-white dark:bg-gray-800 min-h-screen">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col lg:flex-row gap-8 w-full">
          <div className="lg:w-2/3 w-full">
            {/* FullCalendar Component */}
            <FullCalendar
              ref={calendarRef}
              height={"75vh"}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={{
                left: "prev",
                center: "title",
                right: "next",
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
              locale="es"
              themeSystem="standard"
            />

            {/* Custom View Buttons */}
            <div className="flex justify-between mt-4">
              <div>
                <button
                  className="px-3 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white"
                  onClick={handleTodayClick}
                >
                  Hoy
                </button>
              </div>

              <div className="space-x-2">
                <button
                  className={`px-4 py-2 rounded ${
                    calendarView === "dayGridMonth"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                  onClick={() => handleViewChange("dayGridMonth")}
                >
                  Mes
                </button>
                <button
                  className={`px-4 py-2 rounded ${
                    calendarView === "timeGridWeek"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                  onClick={() => handleViewChange("timeGridWeek")}
                >
                  Semana
                </button>
                <button
                  className={`px-4 py-2 rounded ${
                    calendarView === "timeGridDay"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                  onClick={() => handleViewChange("timeGridDay")}
                >
                  Día
                </button>
              </div>
            </div>
          </div>

          {/* Filtro Component */}
          <div className="lg:w-1/3 w-full mb-4 lg:mt-5">
            <Filtro />
          </div>
        </div>

        {/* Eventos Component */}
        <div className="w-full">
          <div className="text-2xl font-extrabold px-4 py-6">Eventos</div>
          <ul className="flex p-4 space-x-4">
            {currentEvents.length <= 0 && (
              <div className="italic text-center text-gray-400">
                Por el momento no hay eventos
              </div>
            )}

            {currentEvents.length > 0 &&
              currentEvents.map((event: EventApi) => (
                <EventCard 
                key={event.id} event={event} 
                onEdit={(event) => console.log("Editar", event)} 
                onDelete={(event) => console.log("Eliminar", event)} 
                />
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
        selectedDate={selectedDate}
      />
    </div>
  );
};

export default Calendar;
