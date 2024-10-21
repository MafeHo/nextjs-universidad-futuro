"use client"; // Necesario si estás usando Next.js App Router

import React, { useEffect, useRef } from "react";
import moment from "moment";
import styles from "./Calendar.module.css";

interface Event {
  idEvento: number;
  facultad: string;
  tematica: string;
  fechaInicio: Date;
  fechaFin: Date;
  tipoEvento: string;
  cupoInscripcion: number;
  numeroAsistentes: number;
  organizador: string;
  inscripciones: [];
  certificados: [];
  participantes: [];
}

export const Calendar = () => {
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!calendarRef.current) return;

    // Configuración del calendario con Moment.js
    const today = moment();

    class Calendar {
      el: HTMLDivElement;
      current: moment.Moment;
      events: Event[];

      constructor(selector: HTMLDivElement, events: Event[]) {
        this.el = selector;
        this.events = events;
        this.current = moment().date(1);
        this.draw();
      }

      draw() {
        // Limpia el contenido del calendario antes de volver a dibujarlo
        this.el.innerHTML = "";
        this.drawHeader();
        this.drawMonth();
      }
      

      drawHeader() {
        const header = document.createElement("div");
        header.className = styles.header; // Usa la clase CSS para el encabezado

        const title = document.createElement("h1");
        title.textContent = this.current.format("MMMM YYYY");

        header.appendChild(title);
        this.el.appendChild(header);
      }

      drawMonth() {
        const month = document.createElement("div");
        month.className = styles.month; // Usa la clase CSS para el mes

        const clone = this.current.clone();

        while (clone.month() === this.current.month()) {
          const day = this.drawDay(clone.clone());
          month.appendChild(day);
          clone.add(1, "day");
        }

        this.el.appendChild(month);
      }

      drawDay(day: moment.Moment) {
        const dayEl = document.createElement("div");
        dayEl.className = `${styles.day} ${today.isSame(day, "day") ? styles.today : ""}`; // Usa las clases CSS day y today

        const dayNumber = document.createElement("div");
        dayNumber.className = styles["day-number"]; // Usa la clase CSS para el número del día
        dayNumber.textContent = day.format("D");

        dayEl.appendChild(dayNumber);
        return dayEl;
      }
    }

    new Calendar(calendarRef.current, []);
  }, []);

  return (
    <section className="mt-1 bg-gray-900 text-white flex items-center justify-center h-80 md:h-96  md:w-96 rounded">
      <div id="calendar" ref={calendarRef} className="w-80 md:w-[550px] h-[265px] md:h-[350px]  p-3 md:p-5" />
    </section>
  );
};

export default Calendar;
