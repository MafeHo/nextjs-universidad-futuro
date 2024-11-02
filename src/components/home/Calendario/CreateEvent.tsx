import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog'

interface CreateEventProps {
    isDialogOpen: boolean
    setIsDialogOpen: (isOpen: boolean) => void
    newEvent: {
        title: string
        organizer: string
        faculty: string
        topic: string
        eventType: string
        startTime: string
        endTime: string
        maxCapacity: string
        attendees: string
    }
    setNewEvent: React.Dispatch<
        React.SetStateAction<{
            title: string
            organizer: string
            faculty: string
            topic: string
            eventType: string
            startTime: string
            endTime: string
            maxCapacity: string
            attendees: string
        }>
    >
    handleAddEvent: (e: React.FormEvent) => void
}

const CreateEvent: React.FC<CreateEventProps> = ({
    isDialogOpen,
    setIsDialogOpen,
    newEvent,
    setNewEvent,
    handleAddEvent,
}) => {
    // Validar si usuario en local storage
    const [user, setUser] = useState(localStorage.getItem('user-data'))

    useEffect(() => {
        console.log(user)
    }, [user])

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className='max-h-[550px] overflow-y-auto bg-white dark:bg-gray-900'>
                {(user && (
                    <>
                        <DialogHeader>
                            <DialogTitle>Crear Evento</DialogTitle>
                        </DialogHeader>
                        <form className='space-y-4' onSubmit={handleAddEvent}>
                            <div className='mt-4'>
                                <label className='block text-lg font-medium'>
                                    Título
                                </label>
                                <input
                                    type='text'
                                    value={newEvent.title}
                                    onChange={(e) =>
                                        setNewEvent((prev) => ({
                                            ...prev,
                                            title: e.target.value,
                                        }))
                                    }
                                    required
                                    className='w-full border border-gray-200 p-3 rounded-md text-lg dark:text-gray-400 bg-white dark:bg-gray-700'
                                />
                            </div>
                            {/* <div className="mt-4">
                            <label className="block text-lg font-medium">Organizador</label>
                            <input
                                type="text"
                                value={newEvent.organizer}
                                onChange={(e) =>
                                setNewEvent((prev) => ({
                                    ...prev,
                                    organizer: e.target.value,
                                }))
                                }
                                className="w-full border border-gray-200 p-3 rounded-md dark:text-gray-400 bg-white dark:bg-gray-700"
                            />
                            </div> */}
                            <label className='block text-lg font-medium'>
                                Facultad
                            </label>
                            <select
                                value={newEvent.faculty}
                                onChange={(e) =>
                                    setNewEvent((prev) => ({
                                        ...prev,
                                        faculty: e.target.value,
                                    }))
                                }
                                className='w-full border border-gray-200 p-3 rounded-md dark:text-gray-400 bg-white dark:bg-gray-700'>
                                <option value=''>Seleccione una facultad</option>
                                <option value='Artes y Humanidades'>
                                    Artes y Humanidades
                                </option>
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
                            <label className='block text-lg font-medium mt-4'>
                                Temática
                            </label>
                            <select
                                value={newEvent.topic}
                                onChange={(e) =>
                                    setNewEvent((prev) => ({
                                        ...prev,
                                        topic: e.target.value,
                                    }))
                                }
                                className='w-full border border-gray-200 p-3 rounded-md dark:text-gray-400 bg-white dark:bg-gray-700'>
                                <option value=''>Seleccione una temática</option>
                                <option value='Academico'>Académico</option>
                                <option value='Cultural'>Cultural</option>
                            </select>

                            <label className='block text-lg font-medium mt-4'>
                                Tipo de Evento
                            </label>
                            <select
                                value={newEvent.eventType}
                                onChange={(e) =>
                                    setNewEvent((prev) => ({
                                        ...prev,
                                        eventType: e.target.value,
                                    }))
                                }
                                className='w-full border border-gray-200 p-3 rounded-md dark:text-gray-400 bg-white dark:bg-gray-700'>
                                <option value=''>
                                    Seleccione el tipo de evento
                                </option>
                                <option value='Conferencia'>Conferencia</option>
                                <option value='Seminario'>Seminario</option>
                                <option value='Taller'>Taller</option>
                            </select>
                            {/* Hora de inicio y fin */}
                            <div className='mt-4'>
                                <label className='block text-lg font-medium'>
                                    Hora de Inicio
                                </label>
                                <input
                                    type='time'
                                    value={newEvent.startTime}
                                    onChange={(e) =>
                                        setNewEvent((prev) => ({
                                            ...prev,
                                            startTime: e.target.value,
                                        }))
                                    }
                                    required
                                    className='w-full border border-gray-200 p-3 rounded-md dark:text-gray-400 bg-white dark:bg-gray-700'
                                />
                            </div>

                            <div className='mt-4'>
                                <label className='block text-lg font-medium'>
                                    Hora de Fin
                                </label>
                                <input
                                    type='time'
                                    value={newEvent.endTime}
                                    onChange={(e) =>
                                        setNewEvent((prev) => ({
                                            ...prev,
                                            endTime: e.target.value,
                                        }))
                                    }
                                    required
                                    className='w-full border border-gray-200 p-3 rounded-md dark:text-gray-400 bg-white dark:bg-gray-700'
                                />
                            </div>
                            {/* Cupos máximos*/}
                            <div className='mt-4'>
                                <label className='block text-lg font-medium'>
                                    Cupos Máximos
                                </label>
                                <input
                                    type='number'
                                    value={newEvent.maxCapacity}
                                    onChange={(e) =>
                                        setNewEvent((prev) => ({
                                            ...prev,
                                            maxCapacity: e.target.value,
                                        }))
                                    }
                                    required
                                    className='w-full border border-gray-200 p-3 rounded-md dark:text-gray-400 bg-white dark:bg-gray-700'
                                />
                            </div>
                            <button
                                className='w-full bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-md'
                                type='submit'>
                                Crear
                            </button>
                        </form>
                    </>
                )) ?? (
                    <div className='flex justify-center items-center h-full'>
                        <p className='text-lg text-center'>
                            Debes iniciar sesión para crear un evento
                        </p>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default CreateEvent
