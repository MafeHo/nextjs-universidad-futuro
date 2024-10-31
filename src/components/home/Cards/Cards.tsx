// components/CardGrid.js
//import Image from 'next/image';

// const cards = [
//   {
//     title: "A starry night",
//     text: "Look up at the night sky, and find yourself immersed in the amazing mountain range of Aspen.",
//     //img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80",
//     alt: "Snowy Mountains",
//   },
// ];

interface Event {
  title: string;
  organizer: string;
  faculty: string;
  topic: string;
  eventType: string;
  start: string;
  end: string;
  maxCapacity: string;
}

interface CardProps {
  events: Event[];
}

export default function Card({ events }: CardProps) {
  return (
    <div className="justify-center grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-6">
      {events.map((event, index) => (
        <div
          key={index}
          className="flex flex-col dark:bg-gray-700 bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:-translate-y-1 w-80"
        >
          <div className="relative h-48">
            {/* <Image
              src={card.img}
              alt={card.alt}
              layout="fill"
              objectFit="cover"
              className="w-full h-full"
            /> */}
          </div>
          <div className="flex flex-col p-6 space-y-4">
            <h1 className="text-2xl dark:text-white font-semibold text-gray-800">
              {event.title}
            </h1>
            <p className="text-gray-600 dark:text-white">Organizador: {event.organizer}</p>
            <p className="text-gray-600 dark:text-white">Facultad: {event.faculty}</p>
            <p className="text-gray-600 dark:text-white">Temática: {event.topic}</p>
            <p className="text-gray-600 dark:text-white">Tipo de Evento: {event.eventType}</p>
            <p className="text-gray-600 dark:text-white">Hora Inicio: {event.start}</p>
            <p className="text-gray-600 dark:text-white">Hora Fin: {event.end}</p>
            <p className="text-gray-600 dark:text-white">Cupos Máximos: {event.maxCapacity}</p>
            <button className="mt-auto py-2 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded focus:ring-2 focus:ring-blue-400">
              Explore <span className="ml-2">&rarr;</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
