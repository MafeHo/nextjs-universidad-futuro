import { EventApi } from '@fullcalendar/core/index.js'
import { EventoModel } from 'app/models/evento.model'
import LogicService from 'app/services/logicService'
import { create } from 'zustand'

interface EventsStore {
    my_events: EventoModel[]
    setMyEvents: (my_events: EventoModel[]) => void
    parsedEvents: EventApi[]
    setParsedEvents: (parsedEvents: EventApi[]) => void
    parseToEventApi: (events: EventoModel[]) => EventApi[]
}

const useEventsStore = create<EventsStore>((set) => ({
    my_events: [],
    setMyEvents: (my_events: EventoModel[]) => set({ my_events }),
    parsedEvents: [],
    setParsedEvents: (parsedEvents: EventApi[]) => set({ parsedEvents }),
    parseToEventApi: (events: EventoModel[]): EventApi[] => {
        return events.map((event: EventoModel) => {
            const eventApi = {
                id: (event.id ?? '').toString(),
                title: event.titulo ?? '',
                start: new Date(event.fechaInicio ?? ''),
                end: new Date(event.fechaFinal ?? ''),
                extendedProps: {
                    description: event.descripcion,
                    location: event.lugar,
                    organizerId: event.organizadorId,
                    organizer:
                        event.organizador?.primerNombre +
                        ' ' +
                        event.organizador?.primerApellido +
                        ' ' +
                        '-' +
                        ' ' +
                        event.organizador?.correo,
                    faculty: event.facultad,
                    topic: event.tematica,
                    eventType: event.tipoEvento,
                    maxCapacity: event.cupoInscripcion,
                    attendees: event.numeroAsistentes,
                },
            } as unknown as EventApi

            return eventApi
        })
    },
}))

export default useEventsStore
