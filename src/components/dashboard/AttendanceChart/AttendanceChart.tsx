'use client'

import { Bar } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { useEffect, useState } from 'react'
import LogicService from 'app/services/logicService'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const AttendanceChart = () => {
    const [jan, setJan] = useState(0)
    const [feb, setFeb] = useState(0)
    const [mar, setMar] = useState(0)
    const [apr, setApr] = useState(0)
    const [may, setMay] = useState(0)
    const [jun, setJun] = useState(0)
    const [jul, setJul] = useState(0)
    const [aug, setAug] = useState(0)
    const [sep, setSep] = useState(0)
    const [oct, setOct] = useState(0)
    const [nov, setNov] = useState(0)
    const [dec, setDec] = useState(0)

    useEffect(() => {
        // Aquí puedes cargar los datos de asistencia para cada mes
        const fetchAttendanceData = async () => {
            const janData = await LogicService.getAttendanceBySpecificMonth(1)
            const febData = await LogicService.getAttendanceBySpecificMonth(2)
            const marData = await LogicService.getAttendanceBySpecificMonth(3)
            const aprData = await LogicService.getAttendanceBySpecificMonth(4)
            const mayData = await LogicService.getAttendanceBySpecificMonth(5)
            const junData = await LogicService.getAttendanceBySpecificMonth(6)
            const julData = await LogicService.getAttendanceBySpecificMonth(7)
            const augData = await LogicService.getAttendanceBySpecificMonth(8)
            const sepData = await LogicService.getAttendanceBySpecificMonth(9)
            const octData = await LogicService.getAttendanceBySpecificMonth(10)
            const novData = await LogicService.getAttendanceBySpecificMonth(11)
            const decData = await LogicService.getAttendanceBySpecificMonth(12)

            setJan(janData.count)
            setFeb(febData.count)
            setMar(marData.count)
            setApr(aprData.count)
            setMay(mayData.count)
            setJun(junData.count)
            setJul(julData.count)
            setAug(augData.count)
            setSep(sepData.count)
            setOct(octData.count)
            setNov(novData.count)
            setDec(decData.count)
        }

        fetchAttendanceData()
    }, [])

    const meses = [
        'Ene',
        'Feb',
        'Mar',
        'Abr',
        'May',
        'Jun',
        'Jul',
        'Ago',
        'Sep',
        'Oct',
        'Nov',
        'Dic',
    ]
    const data = {
        labels: meses,
        datasets: [
            {
                label: 'Asistencia',
                data: [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec],
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    }

    const options = {
        responsive: true,
        plugins: {
            legend: { display: true, position: 'top' as const },
            tooltip: { enabled: true },
        },
        scales: { y: { beginAtZero: true } },
    }

    return (
        <div className='bg-white shadow rounded-lg p-6'>
            <h3 className='text-lg font-bold text-gray-600 mb-4'>
                Tendencia de Asistencia
            </h3>
            <Bar data={data} options={options} />
        </div>
    )
}
