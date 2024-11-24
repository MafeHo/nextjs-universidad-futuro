import { RolModel } from './rol.model'

export class UsuarioModel {
    _id?: string
    primerNombre?: string
    segundoNombre?: string
    primerApellido?: string
    segundoApellido?: string
    correo?: string
    celular?: string
    clave?: string
    rolId?: string
    rol?: RolModel
}

export interface Usuario {
    _id: string
    primerNombre: string
    segundoNombre?: string
    primerApellido: string
    segundoApellido?: string
    celular?: string
    correo: string
    rolId: string
    rol: RolModel
}
