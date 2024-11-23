'use client'

import LogicService from 'app/services/logicService'
import useEventsStore from 'app/stores/useEventsStore'
import { useState } from 'react'
import Swal from "sweetalert2"

export const Filtro = () => {
    const { my_events, setMyEvents, parseToEventApi, setParsedEvents } =
        useEventsStore()
    const [facultad, setFacultad] = useState('')
    const [tematica, setTematica] = useState('')
    const [tipoEvento, setTipoEvento] = useState('')

    const handleChangeFacultad = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFacultad(e.target.value)
    }

    const handleChangeTematica = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTematica(e.target.value)
    }

    const handleChangeTipoEvento = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTipoEvento(e.target.value)
    }

    const handleFilter = () => {
        const whereConditions = []
        if (!tematica && !facultad && !tipoEvento) {
            Swal.fire({
              title: "Filtros requeridos",
              text: "Debes seleccionar al menos un filtro.",
              icon: "warning",
              timer: 3000,
              timerProgressBar: true,
              showConfirmButton: false,
              allowOutsideClick: false,
            });
            return;
          }
        if (tematica) whereConditions.push({ tematica })
        if (facultad) whereConditions.push({ facultad })
        if (tipoEvento) whereConditions.push({ tipoEvento })

        const filterQuery = {
            where: {
                or: whereConditions,
            },
        }

        LogicService.filterEvents(JSON.stringify(filterQuery))
            .then((data) => {
                console.log('====================================')
                console.log(data)
                console.log('====================================')
                // Aquí puedes hacer algo con los datos filtrados
                setMyEvents(data)
                setParsedEvents(parseToEventApi(data))
            })
            .catch((error) => {
                console.error('Error filtering events:', error)
            })
    }
    const handleClear = () => {
        setFacultad('')
        setTematica('')
        setTipoEvento('')
        // Lógica adicional para limpiar los filtros, si es necesario
        console.log('Filtros limpiados')
        // selecciona la option con el value vacío en cada select
        document.querySelectorAll('select').forEach((select) => {
            select.value = ''
        })
        LogicService.filterEvents(JSON.stringify({}))
            .then((data) => {
                console.log('====================================')
                console.log(data)
                console.log('====================================')
                // Aquí puedes hacer algo con los datos filtrados
                setMyEvents(data)
                setParsedEvents(parseToEventApi(data))
            })
            .catch((error) => {
                console.error('Error filtering events:', error)
            })
    }

    return (
        <div className='relative top-12 left-1/2 transform -translate-x-1/2 h-auto p-4 bg-white rounded-md dark:bg-gray-800 border-2 0 shadow-lg'>
            <h2 className='text-blue-900 dark:text-white text-lg font-semibold mb-4 text-center'>
                Filtros
            </h2>
            <div className='flex flex-col gap-4'>
                <select
                    className='dark:bg-gray-700 p-2 rounded border-2'
                    onChange={handleChangeFacultad}>
                    <option value=''>Facultad</option>
                    <option value='Artes y Humanidades'>Artes y Humanidades</option>
                    <option value='Ciencias Agropecuarias'>
                        Ciencias Agropecuarias
                    </option>
                    <option value='Ciencias Exactas y Naturales'>
                        Ciencias Exactas y Naturales
                    </option>
                    <option value='Ciencias Juridicas y Sociales'>
                        Ciencias Jurídicas y Sociales
                    </option>
                    <option value='Ciencias para la salud'>
                        Ciencias para la salud
                    </option>
                    <option value='Ingeniería'>Ingeniería</option>
                </select>
                <select
                    className='dark:bg-gray-700 p-2 rounded border-2'
                    onChange={handleChangeTipoEvento}>
                    <option value=''>Tipo Evento</option>
                    <option value='Seminario'>Seminario</option>
                    <option value='Taller'>Taller</option>
                    <option value='Conferencia'>Conferencia</option>
                </select>
                <select
                    className='dark:bg-gray-700 p-2 rounded border-2'
                    onChange={handleChangeTematica}>
                    <option value=''>Temática</option>
                    <option value='Academico'>Académico</option>
                    <option value='Cultural'>Cultural</option>
                </select>
                <div className='flex'>
                    <button
                        onClick={handleFilter}
                        className='dark:bg-blue-900 dark:hover:bg-blue-800 bg-blue-600 font-semibold text-white hover:bg-blue-500 p-2 rounded border-2 w-full mr-2'>
                        Filtrar
                    </button>
                    <button
                        onClick={handleClear}
                        className='dark:bg-gray-700 dark:hover:bg-gray-600 p-2 rounded border-2 w-full ml-2 text-white font-semibold bg-gray-600 hover:bg-gray-500'>
                        Limpiar
                    </button>
                </div>
            </div>
        </div>
    )
}
