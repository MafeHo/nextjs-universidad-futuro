"use client"; // Necesario si estás usando Next.js App Router

import React, { useEffect, useRef } from "react";
import moment from "moment";



export const Calendar = () => {
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!calendarRef.current) return;

    // Configuración del calendario con Moment.js
    const today = moment();

    class Calendar {
      el: HTMLDivElement;
      current: moment.Moment;
      events: any[];

      constructor(selector: HTMLDivElement, events: any[]) {
        this.el = selector;
        this.events = events;
        this.current = moment().date(1);
        this.draw();
      }

      draw() {
        this.drawHeader();
        this.drawMonth();
      }

      drawHeader() {
        const header = document.createElement("div");
        header.className = "header bg-gray-700 text-white text-center py-2";

        const title = document.createElement("h1");
        title.textContent = this.current.format("MMMM YYYY");

        header.appendChild(title);
        this.el.appendChild(header);
      }

      drawMonth() {
        const month = document.createElement("div");
        month.className = "month grid grid-cols-7 gap-2";

        let clone = this.current.clone();

        while (clone.month() === this.current.month()) {
          const day = this.drawDay(clone.clone());
          month.appendChild(day);
          clone.add(1, "day");
        }

        this.el.appendChild(month);
      }

      drawDay(day: moment.Moment) {
        const dayEl = document.createElement("div");
        dayEl.className = `day text-center p-4 ${
          today.isSame(day, "day") ? "text-blue-400" : "text-white"
        }`;

        const dayNumber = document.createElement("div");
        dayNumber.className = "day-number text-xl";
        dayNumber.textContent = day.format("D");

        dayEl.appendChild(dayNumber);
        return dayEl;
      }
    }

    new Calendar(calendarRef.current, []);
  }, []);

  return (
    <section className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div ref={calendarRef} className="w-96 h-[570px] overflow-hidden" />
    </section>
  );
};

export default Calendar;