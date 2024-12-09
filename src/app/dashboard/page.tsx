'use client'
import { AttendanceChart } from 'app/components/dashboard/AttendanceChart'
import StatCard from 'app/components/dashboard/cards/card'
import EventTable from 'app/components/dashboard/eventosPopulares/EventTable'
import { EventBar } from 'app/components/eventBarChart/EventBar'
import LogicService from 'app/services/logicService'
import { useEffect, useState } from 'react'

const Dashboard = () => {
    const [totalEventos, setTotalEventos] = useState(0)
    const [totalAsistentes, setTotalAsistentes] = useState(0)
    const [satisfaccionPromedio, setSatisfaccionPromedio] = useState(0)

    useEffect(() => {
        // Simula la carga de datos desde una API o servicio
        const fetchData = async () => {
            // Aquí puedes hacer una llamada a tu API para obtener los datos
            const eventos = await fetchTotalEventos()
            const asistentes = await fetchTotalAsistentes()
            const satisfaccion = await fetchSatisfaccionPromedio()

            setTotalEventos(eventos)
            setTotalAsistentes(asistentes)
            setSatisfaccionPromedio(satisfaccion)
        }

        fetchData()
    }, [])

    const fetchTotalEventos = async () => {
        return await LogicService.getLastSixMothsEvents()
    }

    const fetchTotalAsistentes = async () => {
        return await LogicService.getLastSixMothsAttendants()
    }

    const fetchSatisfaccionPromedio = async () => {
        // Simula una llamada a la API
        return await LogicService.getAverageSatisfaction()
    }

    return (
        <div className='p-6 bg-gray-100 min-h-screen'>
            <h1 className='text-2xl font-bold text-gray-700 mb-6 mt-16'>
                Dashboard de Eventos
            </h1>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-6'>
                <StatCard
                    title='Total de Eventos'
                    value={totalEventos}
                    description='Últimos 6 meses'
                />
                <StatCard
                    title='Total de Asistentes'
                    value={totalAsistentes}
                    description='Últimos 6 meses'
                />
                <StatCard
                    title='Satisfacción Promedio'
                    value={satisfaccionPromedio}
                    description='Escala del 1 al 5'
                />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
                <AttendanceChart />
                <EventBar />
            </div>
            <div className='mt-4'>
                <EventTable />
            </div>
        </div>
    )
}

export default Dashboard
