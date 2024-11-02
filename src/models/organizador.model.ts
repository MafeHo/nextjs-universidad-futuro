import { EventoModel } from './evento.model'
import { UsuarioLogicModel } from './usuariologic.model'

export class OrganizadorModel extends UsuarioLogicModel {
    facultad?: string
    eventos?: EventoModel[]
    constructor() {
        super()
    }
}
