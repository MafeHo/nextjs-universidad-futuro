"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  formatDate,
  DateSelectArg,
  EventClickArg,
  EventApi,
} from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../ui/dialog";
import esLocale from '@fullcalendar/core/locales/es'; // Importa el idioma español
import { Filtro } from "app/components/filtros";

const Calendar: React.FC = () => {
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedEvents = localStorage.getItem("events");
      if (savedEvents) {
        setCurrentEvents(JSON.parse(savedEvents));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("events", JSON.stringify(currentEvents));
    }
  }, [currentEvents]);

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

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEvent.title && selectedDate) {
      const calendarApi = selectedDate.view.calendar;
      calendarApi.unselect();

      // Obtener las fechas de inicio y fin con las horas especificadas en el formulario
      const startDateTime = new Date(selectedDate.start);
      const [startHour, startMinute] = newEvent.startTime.split(":").map(Number);
      startDateTime.setHours(startHour, startMinute);

      const endDateTime = new Date(selectedDate.start);
      const [endHour, endMinute] = newEvent.endTime.split(":").map(Number);
      endDateTime.setHours(endHour, endMinute);

      const newCalendarEvent = {
        id: `${startDateTime.toISOString()}-${newEvent.title}`,
        title: newEvent.title,
        start: startDateTime,
        end: endDateTime,
        allDay: false,
        organizer: newEvent.organizer,
        faculty: newEvent.faculty,
        topic: newEvent.topic,
        eventType: newEvent.eventType,
        maxCapacity: newEvent.maxCapacity,
      };

      calendarApi.addEvent(newCalendarEvent);
      handleCloseDialog();
    }
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

  return (
    <div className="pt-20 pl-5 pr-5 bg-white dark:bg-gray-800">
      <div className="flex flex-col lg:flex-row gap-8 ">
        <div className="lg:w-2/3 w-full">
          {/* FullCalendar Component */}
        <div className="bg-white dark:bg-gray-800">
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
            eventsSet={(events) => setCurrentEvents(events)}
            initialEvents={
              typeof window !== "undefined"
                ? JSON.parse(localStorage.getItem("events") || "[]")
                : []
            }
            locale="es"
            themeSystem="standard" // Agrega esto
          />
        </div>
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

        <div className="lg:mt-5">
          <Filtro/>
        </div>

        <div className="lg:w-1/3 w-full mb-4 lg:mb-0 lg:-mt-5">
          <div className="text-2xl font-extrabold px-4 py-6 ">
            Eventos
          </div>
          <ul className="space-y-4 px-4">
            {currentEvents.length <= 0 && (
              <div className="italic text-center text-gray-400">
                No Events Present
              </div>
            )}

            {currentEvents.length > 0 &&
              currentEvents.map((event: EventApi) => (
                <li
                  className="border border-gray-200 shadow px-4 py-2 rounded-md text-blue-800 dark:text-white bg-white dark:bg-gray-900"
                  key={event.id}
                >
                  <div className="font-bold">{event.title}</div>
                  <div className="text-sm text-slate-600 dark:text-white">
                    <p>Organizador: {event.extendedProps.organizer}</p>
                    <p>Facultad: {event.extendedProps.faculty}</p>
                    <p>Temática: {event.extendedProps.topic}</p>
                    <p>Tipo de Evento: {event.extendedProps.eventType}</p>
                    <p>Hora Inicio: {formatDate(event.start!, { hour: 'numeric', minute: 'numeric', hour12: false })}</p>
                    <p>Hora Fin: {formatDate(event.end!, { hour: 'numeric', minute: 'numeric', hour12: false })}</p>
                    <p>Cupos Máximos: {event.extendedProps.maxCapacity}</p>
                </div>
                  <br />
                  <label className="text-slate-950 dark:text-white">
                    {formatDate(event.start!, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </label>
                </li>
              ))}
          </ul>
        </div>
      </div>

      {/* Dialog for adding new events */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-h-[550px] overflow-y-auto bg-white dark:bg-gray-900">
          <DialogHeader>
            <DialogTitle>Crear Evento</DialogTitle>
          </DialogHeader>
          <form className="space-y-4 " onSubmit={handleAddEvent}>
          <div className="mt-4">
              <label className="block text-lg font-medium">Título</label>
              <input
                type="text"
                value={newEvent.title}
                onChange={(e) => setNewEvent((prev) => ({ ...prev, title: e.target.value }))}
                required
                className="w-full border border-gray-200 p-3 rounded-md text-lg dark:text-gray-400 bg-white dark:bg-gray-700"
            />
            </div>
            <div className="mt-4">
              <label className="block text-lg font-medium">Organizador</label>
              <input
                type="text"
                value={newEvent.organizer}
                onChange={(e) =>
                  setNewEvent((prev) => ({ ...prev, organizer: e.target.value }))
                }
                className="w-full border border-gray-200 p-3 rounded-md dark:text-gray-400 bg-white dark:bg-gray-700"
            />
            </div>
            <label className="block text-lg font-medium">Facultad</label>
            <select
              value={newEvent.faculty}
              onChange={(e) => setNewEvent((prev) => ({ ...prev, faculty: e.target.value }))}
              className="w-full border border-gray-200 p-3 rounded-md dark:text-gray-400 bg-white dark:bg-gray-700"
            >
              <option value="">Seleccione una facultad</option>
              <option value="Ciencias">Ciencias</option>
              <option value="Ingeniería">Ingeniería</option>
              <option value="Humanidades">Humanidades</option>
            </select>
            <label className="block text-lg font-medium mt-4">Temática</label>
            <select
              value={newEvent.topic}
              onChange={(e) => setNewEvent((prev) => ({ ...prev, topic: e.target.value }))}
              className="w-full border border-gray-200 p-3 rounded-md dark:text-gray-400 bg-white dark:bg-gray-700"
            >
              <option value="">Seleccione una temática</option>
              <option value="Academico">Académico</option>
              <option value="Cultural">Cultural</option>
            </select>

            <label className="block text-lg font-medium mt-4">Tipo de Evento</label>
            <select
              value={newEvent.eventType}
              onChange={(e) => setNewEvent((prev) => ({ ...prev, eventType: e.target.value }))}
              className="w-full border border-gray-200 p-3 rounded-md dark:text-gray-400 bg-white dark:bg-gray-700"
            >
              <option value="">Seleccione el tipo de evento</option>
              <option value="Seminario">Seminario</option>
              <option value="Taller">Taller</option>
              <option value="Conferencia">Conferencia</option>
            </select>
            {/* Hora de inicio y fin */}
            <div className="mt-4">
              <label className="block text-lg font-medium">Hora de Inicio</label>
              <input
                type="time"
                value={newEvent.startTime}
                onChange={(e) => setNewEvent((prev) => ({ ...prev, startTime: e.target.value }))}
                required
                className="w-full border border-gray-200 p-3 rounded-md dark:text-gray-400 bg-white dark:bg-gray-700"
              />
            </div>

            <div className="mt-4">
              <label className="block text-lg font-medium">Hora de Fin</label>
              <input
                type="time"
                value={newEvent.endTime}
                onChange={(e) => setNewEvent((prev) => ({ ...prev, endTime: e.target.value }))}
                required
                className="w-full border border-gray-200 p-3 rounded-md dark:text-gray-400 bg-white dark:bg-gray-700"
              />
            </div>
            {/* Cupos máximos*/}
            <div className="mt-4">
              <label className="block text-lg font-medium">Cupos Máximos</label>
              <input
                type="number"
                value={newEvent.maxCapacity}
                onChange={(e) => setNewEvent((prev) => ({ ...prev, maxCapacity: e.target.value }))}
                required
                className="w-full border border-gray-200 p-3 rounded-md dark:text-gray-400 bg-white dark:bg-gray-700"
              />
            </div>
            <button
              className="w-full dark:bg-blue-600 dark:hover:bg-blue-500 text-white p-3 rounded-md"
              type="submit"
            >
              Crear
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Calendar;
