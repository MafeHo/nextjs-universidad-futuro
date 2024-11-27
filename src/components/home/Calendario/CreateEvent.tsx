import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog'
import useSecurityStore from 'app/stores/useSecurityStore'
import { DateSelectArg } from '@fullcalendar/core/index.js'
import LogicService from 'app/services/logicService'
import { EventoModel } from 'app/models/evento.model'
import Swal from 'sweetalert2'

interface CreateEventProps {
    isDialogOpen: boolean
    setIsDialogOpen: (isOpen: boolean) => void
    newEvent: {
        title: string
        description: string
        location: string
        organizer: string
        faculty: string
        topic: string
        eventType: string
        startTime: string
        endTime: string
        maxCapacity: string
    }
    setNewEvent: React.Dispatch<
        React.SetStateAction<{
            title: string
            description: string
            location: string
            organizer: string
            organizerId: string
            faculty: string
            topic: string
            eventType: string
            startTime: string
            endTime: string
            maxCapacity: string
        }>
    >
    selectedDate: DateSelectArg | null
    handleCloseDialog: () => void
}

const CreateEvent: React.FC<CreateEventProps> = ({
    isDialogOpen,
    setIsDialogOpen,
    newEvent,
    setNewEvent,
    selectedDate,
    handleCloseDialog,
}) => {
    const { user } = useSecurityStore()

    const handleAddEvent = async (e: React.FormEvent) => {
        e.preventDefault()
        if (newEvent.title && selectedDate) {
            const calendarApi = selectedDate.view.calendar
            calendarApi.unselect()

            // Obtener las fechas de inicio y fin con las horas especificadas en el formulario
            const startDateTime = new Date(selectedDate.start)
            const [startHour, startMinute] = newEvent.startTime
                .split(':')
                .map(Number)
            startDateTime.setHours(startHour, startMinute)

            const endDateTime = new Date(selectedDate.start)
            const [endHour, endMinute] = newEvent.endTime.split(':').map(Number)
            endDateTime.setHours(endHour, endMinute)

            // Validar que la fecha de inicio sea menor a la fecha de fin
            if (startDateTime >= endDateTime) {
                Swal.fire({
                    title: 'Fecha inválida',
                    text: 'La fecha de inicio debe ser menor a la fecha de fin.',
                    icon: 'warning',
                    timer: 3000, // Se cierra automáticamente después de 3 segundos
                    timerProgressBar: true, // Muestra una barra de progreso mientras el temporizador avanza
                    showConfirmButton: false, // Oculta el botón de confirmación
                    allowOutsideClick: false, // Evita que se cierre al hacer clic fuera
                })
                return
            }

            const new_event: EventoModel = {
                titulo: newEvent.title,
                descripcion: newEvent.description,
                lugar: newEvent.location,
                facultad: newEvent.faculty,
                tematica: newEvent.topic,
                tipoEvento: newEvent.eventType,
                fechaInicio: startDateTime.toISOString(),
                fechaFinal: endDateTime.toISOString(),
                cupoInscripcion: Number(newEvent.maxCapacity),
            }

            let event = null
            try {
                if (!user) {
                    Swal.fire({
                        title: 'Acción requerida',
                        text: 'Debes iniciar sesión para crear un evento.',
                        icon: 'warning',
                        timer: 3000, // Tiempo de cierre automático
                        timerProgressBar: true, // Muestra la barra de progreso
                        showConfirmButton: false, // Oculta el botón de confirmación
                        allowOutsideClick: false, // Impide cerrar haciendo clic fuera
                    })
                    return
                }
                if (!user.correo) {
                    Swal.fire({
                        title: 'Información faltante',
                        text: 'El correo del usuario no está disponible.',
                        icon: 'error',
                        timer: 3000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                        allowOutsideClick: false,
                    })
                    return
                }
                const organizerArr = await LogicService.getOrganizerIdByEmail(
                    user.correo
                )
                let organizerId = null
                if (organizerArr) {
                    organizerId =
                        Array.isArray(organizerArr) && organizerArr.length > 0
                            ? organizerArr[0].id
                            : null
                }

                if (!organizerArr || !organizerId) {
                    Swal.fire({
                        title: 'Error',
                        text: 'No se encontró el organizador.',
                        icon: 'error',
                        timer: 3000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                        allowOutsideClick: false,
                    })
                    return
                }
                new_event.organizadorId = organizerId
                event = await LogicService.createEvent(new_event)
            } catch (error) {
                console.error('Error creating event:', error)
                Swal.fire({
                    title: 'Error',
                    text: 'Error al crear el evento. Inténtalo de nuevo.',
                    icon: 'error',
                    timer: 3000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    allowOutsideClick: false,
                })
                return
            }

            if (event) {
                newEvent.organizer = user!.primerNombre + ' ' + user!.primerApellido

                const newCalendarEvent = {
                    // id: `${startDateTime.toISOString()}-${newEvent.title}`,
                    id: event.id?.toString(),
                    title: newEvent.title,
                    start: startDateTime,
                    end: endDateTime,
                    allDay: false,
                    description: newEvent.description,
                    location: newEvent.location,
                    organizer: newEvent.organizer,
                    organizerId: new_event.organizadorId,
                    faculty: newEvent.faculty,
                    topic: newEvent.topic,
                    eventType: newEvent.eventType,
                    maxCapacity: newEvent.maxCapacity,
                }
                calendarApi.addEvent(newCalendarEvent)
                handleCloseDialog()
            }
        }
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className='max-h-[550px] overflow-y-auto bg-white dark:bg-gray-900 md:max-w-2xl '>
                {(user && (
                    <>
                        <DialogHeader>
                            <DialogTitle>Crear Evento</DialogTitle>
                        </DialogHeader>
                        <form className='space-y-4' onSubmit={handleAddEvent}>
                            <div className=''>
                                <label className='block text-l font-medium'>
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
                                    className='w-full border border-gray-200 p-3 rounded-md dark:text-gray-400 bg-white dark:bg-gray-700 h-10'
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
                            <div className='mt-2'>
                                <label className='block font-medium'>
                                    Descripción
                                </label>
                                <textarea
                                    value={newEvent.description}
                                    onChange={(e) =>
                                        setNewEvent((prev) => ({
                                            ...prev,
                                            description: e.target.value,
                                        }))
                                    }
                                    required
                                    className='w-full border border-gray-200 p-3 rounded-md dark:text-gray-400 bg-white dark:bg-gray-700 h-12'
                                />
                            </div>

                            <div className='grid gap-2 md:grid-cols-2'>
                                <div className=''>
                                    <label className='block font-medium'>
                                        Lugar
                                    </label>
                                    <input
                                        type='text'
                                        value={newEvent.location}
                                        onChange={(e) =>
                                            setNewEvent((prev) => ({
                                                ...prev,
                                                location: e.target.value,
                                            }))
                                        }
                                        required
                                        className='w-full h-11 border border-gray-200 p-3 rounded-md dark:text-gray-400 bg-white dark:bg-gray-700'
                                    />
                                </div>

                                <div>
                                    <label className='block text-l font-medium'>
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
                                        <option value=''>
                                            Seleccione una facultad
                                        </option>
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
                                        <option value='Ingeniería'>
                                            Ingeniería
                                        </option>
                                    </select>
                                </div>
                            </div>

                            {/* temática y tipo. Hora de inicio y fin */}
                            <div className='grid gap-4 md:grid-cols-2'>
                                {/* temática y tipo*/}
                                <div>
                                    <label className='block font-medium mt-4'>
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
                                        <option value=''>
                                            Seleccione una temática
                                        </option>
                                        <option value='Academico'>Académico</option>
                                        <option value='Cultural'>Cultural</option>
                                    </select>
                                </div>

                                <div>
                                    <label className='block  font-medium mt-4'>
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
                                        <option value='Conferencia'>
                                            Conferencia
                                        </option>
                                        <option value='Seminario'>Seminario</option>
                                        <option value='Taller'>Taller</option>
                                    </select>
                                </div>

                                {/* Hora de inicio y fin */}
                                <div className='mt-4'>
                                    <label className='block font-medium'>
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
                                    <label className='block font-medium'>
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
                            </div>

                            {/* Cupos máximos*/}
                            <div className='mt-4'>
                                <label className='block font-medium'>
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
                                    className='w-full border border-gray-200 p-3 rounded-md dark:text-gray-400 bg-white dark:bg-gray-700 h-10'
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
                    <DialogHeader className='flex justify-start items-center h-full flex-col'>
                        <DialogTitle>Por favor</DialogTitle>
                        <p className='text-center'>
                            Inicia sesión para crear un evento
                        </p>
                    </DialogHeader>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default CreateEvent
