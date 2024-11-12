import { LogicConfig } from 'app/config/logicConfig'
import { EventoModel } from 'app/models/evento.model'
import axios from 'axios'

const LOGIC_URL = LogicConfig.LOGIC_URL

const createEvent = async (eventData: EventoModel): Promise<EventoModel> => {
    try {
        const response = await axios.post(LOGIC_URL + 'evento', eventData, {
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
            },
        })
        return response.data
    } catch (error) {
        console.error('Error creating event:', error)
        throw error
    }
}

const getOrganizerIdByEmail = async (correo: string): Promise<number> => {
    try {
        const response = await axios.get(
            LOGIC_URL +
                `organizador?filter={"fields":["id"], "where": {"correo": "${correo}"}}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    accept: 'application/json',
                },
            }
        )
        return response.data
    } catch (error) {
        console.error('Error getting organizer:', error)
        throw error
    }
}

const getEvents = async (): Promise<EventoModel[]> => {
    try {
        const response = await axios.get(
            LOGIC_URL + 'evento?filter={ "include": [ {"relation": "organizador"}]}',
            {
                headers: {
                    'Content-Type': 'application/json',
                    accept: 'application/json',
                },
            }
        )
        return response.data
    } catch (error) {
        console.error('Error getting events:', error)
        throw error
    }
}

const filterEvents = async (filter: string): Promise<EventoModel[]> => {
    try {
        const response = await axios.get(
            LOGIC_URL + `evento?filter=${filter}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    accept: 'application/json',
                },
            }
        )
        return response.data
    } catch (error) {
        console.error('Error filtering events:', error)
        throw error
    }
}

const getParticipantIdByEmail = async (correo: string): Promise<number> => {
    try {
        const response = await axios.get(
            LOGIC_URL +
                `participante?filter={"fields":["id"], "where": {"correo": "${correo}"}}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    accept: 'application/json',
                },
            }
        )
        return response.data
    } catch (error) {
        console.error('Error getting participant:', error)
        throw error
    }
}

const inscriptionToEvent = async (
    inscription : {
        fecha: Date,
        eventoId: number,
        participanteId: number,
    }
): Promise<void> => {
    try {
        const response = await axios.post(
            LOGIC_URL + `inscripcion/` , inscription,
            {
                headers: {
                    'Content-Type': 'application/json',
                    accept: 'application/json',
                },
            }
        )
        return response.data
    } catch (error) {
        console.error('Error inscribing to event:', error)
        throw error
    }
}

const LogicService = {
    getEvents,
    createEvent,
    filterEvents,
    inscriptionToEvent,
    getOrganizerIdByEmail,
    getParticipantIdByEmail,
}

export default LogicService
