import { SecurityConfig } from 'app/config/securityConfig'
import { TwoFactorModel } from 'app/models/twoFactor.model'
import { TwoFactorResponseModel } from 'app/models/twoFactorResponse.model'
import { UsuarioModel } from 'app/models/usuario.model'
import axios from 'axios'

const SECURITY_URL = SecurityConfig.SECURITY_URL

const register = async (userData: UsuarioModel) => {
    try {
        const response = await axios.post(SECURITY_URL + 'usuario', userData, {
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
            },
        })
        return response.data
    } catch (error) {
        console.error('Error creating user:', error)
        throw error
    }
}

const getRole = async (rolId: string) => {
    try {
        const response = await axios.get(SECURITY_URL + 'rol/' + rolId, {
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
            },
        })
        return response.data
    } catch (error) {
        console.error('Error getting role:', error)
        throw error
    }
}

const getRoleIdByName = async (role: string): Promise<string> => {
    try {
        const response = await axios.get(
            SECURITY_URL +
                `rol?filter={"fields":["nombre", "_id"], "where": {"nombre": "${role}"}}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    accept: 'application/json',
                },
            }
        )
        return response.data
    } catch (error) {
        console.error('Error getting role:', error)
        throw error
    }
}

const login = async (credentials: { correo: string; clave: string }) => {
    try {
        const response = await axios.post(
            SECURITY_URL + '/identificar-usuario',
            credentials,
            {
                headers: {
                    'Content-Type': 'application/json',
                    accept: 'application/json',
                },
            }
        )
        return response.data
    } catch (error) {
        console.error('Error logging in:', error)
        throw error
    }
}

const verify2faCode = async (twoFactor: TwoFactorModel) => {
    try {
        const response = await axios.post(
            SECURITY_URL + '/verificar-2FA',
            twoFactor ,
            {
                headers: {
                    'Content-Type': 'application/json',
                    accept: 'application/json',
                },
            }
        )
        return response.data
    } catch (error) {
        console.error('Error verifying 2FA code:', error)
        throw error
    }
}

const storeIdentifiedUserData = (data: UsuarioModel, dataLS: string): boolean => {

    let text = JSON.stringify(data)
    console.log(text)

    if (dataLS) {
        return false
    } else {
        console.log('2', text)
        return true
    }
}

const SecurityService: {
    register: (userData: UsuarioModel) => Promise<any>;
    login: (credentials: { correo: string; clave: string }) => Promise<any>;
    getRoleIdByName: (role: string) => Promise<string>;
    storeIdentifiedUserData: (data: UsuarioModel, dataLS: string) => boolean;
    verify2faCode: (twoFactor: TwoFactorModel) => Promise<TwoFactorResponseModel>;
} = {
    register,
    login,
    getRoleIdByName,
    storeIdentifiedUserData,
    verify2faCode,
}

export default SecurityService
