import { SecurityConfig } from 'app/config/securityConfig'
import { UsuarioModel } from 'app/models/usuario.model'
import axios from 'axios'

const SECURITY_URL = SecurityConfig.SECURITY_URL

const getUsers = async () => {
    try {
        const response = await axios.get(
            SECURITY_URL + 'usuario?filter={ "include": [ {"relation": "rol"}]}',
            {
                headers: {
                    'Content-Type': 'application/json',
                    accept: 'application/json',
                },
            }
        )
        return response.data
    } catch (error) {
        console.error('Error creating user:', error)
        throw error
    }
}

const updateUser = async (usuario: UsuarioModel, id: string) => {
    try {
        const response = await axios.put(SECURITY_URL + 'usuario/' + id, usuario, {
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
            },
        })
        return response.data
    } catch (error) {
        console.error('Error updating user:', error)
        throw error
    }
}

const deleteUser = async (id: string) => {
    try {
        const response = await axios.delete(SECURITY_URL + 'usuario/' + id, {
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
            },
        })
        return response
    } catch (error) {
        console.error('Error deleting user:', error)
        throw error
    }
}

const UsersService: {
    getUsers: () => Promise<any>
    updateUser: (usuario: UsuarioModel, id: string) => Promise<any>
    deleteUser: (id: string) => Promise<any>
} = {
    getUsers,
    updateUser,
    deleteUser,
}

export default UsersService
