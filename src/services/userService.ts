import { SecurityConfig } from 'app/config/securityConfig'
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

const UserService = {
    register,
    getRole,
}

export default UserService
