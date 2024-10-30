"use client";

import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventApi } from "@fullcalendar/core";

const ReadOnlyCalendar: React.FC = () => {
  const [events, setEvents] = useState<EventApi[]>([]);

  useEffect(() => {
    // Cargar eventos desde localStorage o desde el backend según tu arquitectura
    const savedEvents = localStorage.getItem("events");
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, []);

  return (
    <div className="pt-20 pl-5 pr-5">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={events}
        editable={false}  // Desactiva la edición de eventos
        selectable={false}  // Desactiva la selección de fechas
        eventClick={(e) => e.jsEvent?.preventDefault()} // Evita acciones en los eventos
      />
    </div>
  );
};

export default ReadOnlyCalendar;
