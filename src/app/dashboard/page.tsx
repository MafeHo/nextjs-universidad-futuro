import { AttendanceChart } from "app/components/dashboard/AttendanceChart";
import StatCard from "app/components/dashboard/cards/card";
import EventTable from "app/components/dashboard/eventosPopulares/EventTable";
import { EventBar } from "app/components/eventBarChart/EventBar";

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-700 mb-6 mt-16">
        Dashboard de Eventos
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatCard
          title="Total de Eventos"
          value={42}
          description="Últimos 6 meses"
        />
        <StatCard
          title="Total de Asistentes"
          value={1120}
          description="Últimos 6 meses"
        />
        <StatCard
          title="Satisfacción Promedio"
          value={4.7}
          description="Escala del 1 al 5"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <AttendanceChart />
        <EventBar />
      </div>
      <div className="mt-4">
        <EventTable />
      </div>
    </div>
  );
};

export default Dashboard;
