import { LogicConfig } from 'app/config/logicConfig'
import { EventoModel } from 'app/models/evento.model'
import { Feedback } from 'app/models/feedback.model'
import { Inscripcion } from 'app/models/inscripcion.model'
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
            LOGIC_URL + `inscripcion/count?where: {"eventoId": ${eventId}}}`,
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

const generateQRCode = async (
    participantId: number,
    eventId: number
): Promise<string> => {
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
        )
        return response.data.qrCode // Devuelve el QR en formato base64 desde el backend
    } catch (error) {
        console.error('Error generating QR code:', error)
        throw new Error('Error en la generación del código QR.')
    }
}

const registerAssistance = async (data: {
    participantId: number
    eventId: number
    qrCode: string
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
        )
        return response.data
    } catch (error) {
        console.error('Error registering assistance:', error)
        throw new Error('Error al registrar la asistencia.')
    }
}

const getEventsByOrganizerEmail = async (correo: string): Promise<EventoModel[]> => {
    try {
        const response = await getOrganizerIdByEmail(correo).then(
            async (response) => {
                const organizadorId = response[0]?.id || null
                return await axios.get(
                    LOGIC_URL +
                        `evento?filter={"where": {"organizadorId": ${organizadorId}},"include": [ {"relation": "organizador"}]}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            accept: 'application/json',
                        },
                    }
                )
            }
        )
        return response.data
    } catch (error) {
        console.error('Error getting events by organizer:', error)
        throw error
    }
}

const getEventsByParticipantEmail = async (
    correo: string
): Promise<Inscripcion[]> => {
    try {
        let participanteId = null
        await getParticipantIdByEmail(correo).then((response) => {
            participanteId = response[0]?.id || null
        })
        const second_response = await axios.get(
            LOGIC_URL +
                `inscripcion?filter={
                            "where": {"participanteId":  ${participanteId}},
                            "include": [
                                {
                                "relation": "evento",
                                "scope": {
                                    "include":[{"relation":"organizador"}]
                                }
                                },
                                {"relation": "feedback"}
                            ]
                            }`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    accept: 'application/json',
                },
            }
        )
        if (second_response.status === 404) {
            return []
        }

        if (second_response.data.length === 0) {
            return []
        }
        return second_response.data
    } catch (error) {
        console.log('====================================')
        console.log(error)
        console.log('====================================')
        console.error('Error getting events by participant:', error)
        throw error
    }
}

const deleteInscription = async (inscription: number): Promise<void> => {
    try {
        const response = await axios.delete(
            LOGIC_URL + `inscripcion/${inscription}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    accept: 'application/json',
                },
            }
        )
        return response.data
    } catch (error) {
        console.error('Error deleting inscription:', error)
        throw error
    }
}

const createFeedback = async (feedbackData: Feedback): Promise<Feedback> => {
    try {
        const response = await axios.post(LOGIC_URL + `feedback/`, feedbackData, {
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
            },
        })
        return response.data
    } catch (error) {
        console.error('Error creating feedback:', error)
        throw error
    }
}

const getLastSixMothsEvents = async (): Promise<number> => {
    try {
        const response = await axios.get(
            LOGIC_URL +
                `evento/count?where={"fechaFinal": {"gte": "${new Date(
                    new Date().setMonth(new Date().getMonth() - 6)
                ).toISOString()}"}}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    accept: 'application/json',
                },
            }
        )
        return response.data.count
    } catch (error) {
        console.error('Error getting last six months events:', error)
        throw error
    }
}

const getLastSixMothsAttendants = async (): Promise<number> => {
    try {
        const response = await axios.get(
            LOGIC_URL +
                `inscripcion/count?where={"createdAt": {"gte": "${new Date(
                    new Date().setMonth(new Date().getMonth() - 6)
                ).toISOString()}"}}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    accept: 'application/json',
                },
            }
        )
        return response.data.count
    } catch (error) {
        console.error('Error getting last six months attendants:', error)
        throw error
    }
}

const getAverageSatisfaction = async (): Promise<number> => {
    try {
        const response = await axios.get(LOGIC_URL + `feedback/`, {
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
            },
        })

        const totalFeedbacks = response.data.length
        const total = response.data.reduce(
            (acc: number, feedback: Feedback) =>
                acc +
                ((feedback.organizationQuality ?? 0) +
                    (feedback.contentQuality ?? 0) +
                    (feedback.overallEventRating ?? 0) / 3),
            0
        )
        const averageSatisfaction = totalFeedbacks > 0 ? total / totalFeedbacks : 0
        return Math.round(averageSatisfaction * 100) / 100
    } catch (error) {
        console.error('Error getting average satisfaction:', error)
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
    getEventsByOrganizerEmail,
    getEventsByParticipantEmail,
    deleteInscription,
    createFeedback,
    getLastSixMothsEvents,
    getLastSixMothsAttendants,
    getAverageSatisfaction,
}

export default LogicService
