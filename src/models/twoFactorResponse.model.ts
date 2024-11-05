import { UsuarioModel } from "./usuario.model"

export class TwoFactorResponseModel {
    usuario?: UsuarioModel
    token?: string
}
