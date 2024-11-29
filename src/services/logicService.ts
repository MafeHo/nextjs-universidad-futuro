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

const getOrganizerIdByEmail = async (correo: string): Promise<{ id: number }[]> => {
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
        const response = await axios.get(LOGIC_URL + `evento?filter=${filter}`, {
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
            },
        })
        return response.data
    } catch (error) {
        console.error('Error filtering events:', error)
        throw error
    }
}

const getParticipantIdByEmail = async (
    correo: string
): Promise<{ id: number }[]> => {
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

const inscriptionToEvent = async (inscription: {
    eventoId: number
    participanteId: number
}): Promise<void> => {
    try {
        const response = await axios.post(LOGIC_URL + `inscripcion/`, inscription, {
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
            },
        })
        return response.data
    } catch (error) {
        console.error('Error inscribing to event:', error)
        throw error
    }
}

const editEvent = async (eventData: EventoModel): Promise<EventoModel> => {
    try {
        const response = await axios.put(
            LOGIC_URL + `evento/${eventData.id}`,
            eventData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    accept: 'application/json',
                },
            }
        )
        return response.data
    } catch (error) {
        console.error('Error editing event:', error)
        throw error
    }
}

const deleteEvent = async (eventId: number): Promise<void> => {
    try {
        const response = await axios.delete(LOGIC_URL + `evento/${eventId}`, {
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
            },
        })
        return response.data
    } catch (error) {
        console.error('Error deleting event:', error)
        throw error
    }
}

const generateQRCode = async (participantId: number, eventId: number): Promise<string> => {
    try {
        const response = await axios.post(
            LOGIC_URL + `codigo-qr/${participantId}/${eventId}`,
            {},
            {
                headers: {
                    'Content-Type': 'application/json',
                    accept: 'application/json',
                },
            }
        );
        return response.data.qrCode; // Devuelve el QR en formato base64 desde el backend
    } catch (error) {
        console.error('Error generating QR code:', error);
        throw new Error('Error en la generación del código QR.');
    }
};

const registerAssistance = async (data: {
    participantId: number;
    eventId: number;
    qrCode: string;
}): Promise<void> => {
    try {
        const response = await axios.post(
            LOGIC_URL + `inscripcion/registrar-asistencia`,
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    accept: 'application/json',
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error registering assistance:', error);
        throw new Error('Error al registrar la asistencia.');
    }
};


const isParticipantInEvent = async (
    participantId: number,
    eventId: number
): Promise<boolean> => {
    try {
        const response = await axios.get(
            LOGIC_URL +
                `inscripcion?filter={"where": {"eventoId": ${eventId}, "participanteId": ${participantId}}}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    accept: 'application/json',
                },
            }
        )
        return response.data.length > 0
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            return true
        }
        console.error('Error getting inscriptions:', error)
        throw error
    }
}

const getInscriptionsToEvent = async (
    eventId: number
): Promise<{ count: number }> => {
    try {
        const response = await axios.get(
            LOGIC_URL +
                `inscripcion?filter={"fields":["id"], "where": {"eventoId": ${eventId}}}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    accept: 'application/json',
                },
            }
        )
        return response.data
    } catch (error) {
        console.error('Error getting inscriptions:', error)
        throw error
    }
}

const LogicService = {
    getEvents,
    createEvent,
    filterEvents,
    editEvent,
    deleteEvent,
    inscriptionToEvent,
    getOrganizerIdByEmail,
    isParticipantInEvent,
    getParticipantIdByEmail,
    getInscriptionsToEvent,
    generateQRCode,
    registerAssistance,
}

export default LogicService
