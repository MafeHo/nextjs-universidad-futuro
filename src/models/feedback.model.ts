import { Inscripcion } from './inscripcion.model'

export interface Feedback {
    id?: number
    comments: string
    overallEventRating?: number
    contentQuality?: number
    organizationQuality?: number
    inscripcionId: number
    inscripcion?: Inscripcion
}
