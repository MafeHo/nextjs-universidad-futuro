import { SecurityConfig } from 'app/config/securityConfig'
import { UsuarioModel } from 'app/models/usuario.model'
import axios from 'axios'

const SECURITY_URL = SecurityConfig.SECURITY_URL

const register = async (userData: {
    primerNombre: string
    segundoNombre?: string
    primerApellido: string
    segundoApellido?: string
    correo: string
    celular: string
    clave: string
    rolId: string
}) => {
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

const getRole = async (roleId: string) => {
    try {
        const response = await axios.get(SECURITY_URL + 'rol/' + roleId, {
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

const storeIdentifiedUserData = (data: UsuarioModel): boolean => {
    let text = JSON.stringify(data)
    console.log(text)

    let dataLS = localStorage.getItem('user-data')
    if (dataLS) {
        return false
    } else {
        localStorage.setItem('user-data', text)
        console.log('2', text)
        return true
    }
}

const UserService: {
    register: (userData: {
        primerNombre: string;
        segundoNombre?: string;
        primerApellido: string;
        segundoApellido?: string;
        correo: string;
        celular: string;
        clave: string;
        rolId: string;
    }) => Promise<any>;
    login: (credentials: { correo: string; clave: string }) => Promise<any>;
    getRoleIdByName: (role: string) => Promise<string>;
    storeIdentifiedUserData: (data: UsuarioModel) => boolean;
} = {
    register,
    login,
    getRoleIdByName,
    storeIdentifiedUserData,
}

export default UserService
