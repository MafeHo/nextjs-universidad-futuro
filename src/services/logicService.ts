import { LogicConfig } from 'app/config/logicConfig'
import { EventoModel } from 'app/models/evento.model'
import axios from 'axios'

const LOGIC_URL = LogicConfig.LOGIC_URL

const createEvent = async (eventData: EventoModel) => {
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
        return response.data.id
    } catch (error) {
        console.error('Error getting organizer:', error)
        throw error
    }
}

const LogicService = {
    createEvent,
    getOrganizerIdByEmail,
}

export default LogicService
