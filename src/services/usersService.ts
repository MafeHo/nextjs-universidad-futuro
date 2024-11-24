import { SecurityConfig } from 'app/config/securityConfig'
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

const usersService: {
    getUsers: () => Promise<any>
} = {
    getUsers,
}

export default usersService
