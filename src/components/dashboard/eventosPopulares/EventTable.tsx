"use client";

type Event = {
    nombre: string;
    asistentes: number;
    satisfaccion: number;
  };
  
  const popularEvents: Event[] = [
    { nombre: "Conferencia de IA", asistentes: 300, satisfaccion: 4.8 },
    { nombre: "Taller de Desarrollo Web", asistentes: 150, satisfaccion: 4.6 },
  ];
  
  const EventTable = () => {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-bold text-gray-600 mb-4">Eventos Más Populares</h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b p-4 text-gray-600">Nombre del Evento</th>
              <th className="border-b p-4 text-gray-600">Asistentes</th>
              <th className="border-b p-4 text-gray-600">Satisfacción</th>
            </tr>
          </thead>
          <tbody>
            {popularEvents.map((event, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="p-4">{event.nombre}</td>
                <td className="p-4">{event.asistentes}</td>
                <td className="p-4">{event.satisfaccion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default EventTable;
  