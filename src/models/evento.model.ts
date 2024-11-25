import { OrganizadorModel } from "./organizador.model"

export class EventoModel {
    id?: number
    titulo?: string
    descripcion?:string
    lugar?: string
    organizadorId?: number
    organizador?: OrganizadorModel
    facultad?: string
    tematica?: string
    tipoEvento?: string
    fechaInicio?: string
    fechaFinal?: string
    cupoInscripcion?: number
    numeroAsistentes?: number
}
