
import React from 'react';
import { EventApi } from '@fullcalendar/core';
import { formatDate } from "@fullcalendar/core";

interface EventCardProps {
  event: EventApi;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => (
  <li className="border border-gray-200 shadow px-3 py-2 rounded-md text-blue-800 dark:text-white bg-white dark:bg-gray-900">
    <div className="font-bold">{event.title}</div>
    <div className="text-sm text-slate-600 dark:text-white">
      <p>Descripcion: {event.extendedProps.description}</p>
      <p>Lugar: {event.extendedProps.location}</p>
      <p>Organizador: {event.extendedProps.organizer}</p>
      <p>Facultad: {event.extendedProps.faculty}</p>
      <p>Temática: {event.extendedProps.topic}</p>
      <p>Tipo de Evento: {event.extendedProps.eventType}</p>
      <p>Hora Inicio: {formatDate(event.start!, { hour: "numeric", minute: "numeric", hour12: false })}</p>
      <p>Hora Fin: {formatDate(event.end!, { hour: "numeric", minute: "numeric", hour12: false })}</p>
      <p>Cupos Máximos: {event.extendedProps.maxCapacity}</p>
    </div>
    <br />
    <label className="text-slate-950 dark:text-white">
      {formatDate(event.start!, { year: "numeric", month: "short", day: "numeric" })}
    </label>
    <div className="mt-4">
      <button
        className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-md text-center"
        onClick={() => alert(`Inscripción en el evento: ${event.title}`)}
      >
        Inscribirse
      </button>
    </div>
  </li>
);

export default EventCard;
