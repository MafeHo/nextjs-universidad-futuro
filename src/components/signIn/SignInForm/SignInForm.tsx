'use client'
import { useState } from 'react'
// import { PARTICIPANTE, ORGANIZADOR } from 'app/constants/cts'
import SecurityService from 'app/services/securityService'
import { SecurityConfig } from 'app/config/securityConfig'
import { useRouter } from 'next/navigation'

export const SignInForm = () => {
    const minLengthPassWord = 4
    const router = useRouter()

    const [formData, setFormData] = useState({
        primerNombre: '',
        segundoNombre: '',
        primerApellido: '',
        segundoApellido: '',
        email: '',
        celular: '',
        clave: '',
        confirmarClave: '',
    })
    const [error, setError] = useState('')
    // const [rol, setRol] = useState('')

    // const handleChangeRole = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //     setRol(e.target.value)
    // }

    const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        console.log(name, value)

        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const validatePassword = (password: string) => {
        const hasNumber = /\d/
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/

        if (password.length < minLengthPassWord) {
            return `La contraseña debe tener al menos ${minLengthPassWord} caracteres.`
        }
        if (!hasNumber.test(password)) {
            return 'La contraseña debe incluir al menos un número.'
        }
        if (!hasSpecialChar.test(password)) {
            return 'La contraseña debe incluir al menos un carácter especial.'
        }
        return ''
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (formData.clave !== formData.confirmarClave) {
            setError('Las contraseñas no coinciden')
            return
        }
        // const passwordError = validatePassword(formData.clave)
        // if (passwordError) {
        //     setError(passwordError)
        //     return
        // }

        setError('')
        // Aquí puedes manejar el envío del formulario

        const user = {
            primerNombre: formData.primerNombre,
            segundoNombre: formData.segundoNombre,
            primerApellido: formData.primerApellido,
            segundoApellido: formData.segundoApellido,
            correo: formData.email,
            celular: formData.celular,
            clave: formData.clave,
            rolId: SecurityConfig.ID_ROLE_PARTICIPANT,
        }

        // Aquí puedes manejar la redirección al dashboard
        try {
            await SecurityService.register(user)
                .then((response) => {
                    console.log(response)
                    if (response.status === 200) {
                        console.log('Usuario registrado')
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
            router.push('/login')
        } catch (error) {
            setError('Error al crear usuario. Inténtalo de nuevo.')
        }
    }

    return (
        <div className='min-h-screen bg-gray-100 dark:bg-gray-800 flex items-center justify-center pt-20 pb-20'>
            <div className='w-11/12 max-w-lg mx-auto'>
                <form
                    onSubmit={handleSubmit}
                    className='grid gap-4 bg-blue-600 dark:bg-gray-900 p-8 rounded-lg shadow-md'>
                    {/* Header */}
                    <h2 className='text-center text-2xl font-bold text-white dark:text-gray-300 mb-6'>
                        Registrarse
                    </h2>

                    <div className='grid gap-4 md:grid-cols-2'>
                        {/* Nombre Field */}
                        <input
                            type='text'
                            name='primerNombre'
                            placeholder='Primer Nombre'
                            value={formData.primerNombre}
                            onChange={handleChangeForm}
                            required
                            className='w-full p-3 bg-white dark:bg-gray-700 rounded-md text-gray-800 dark:text-gray-200 placeholder-gray-400'
                        />
                        <input
                            type='text'
                            name='segundoNombre'
                            placeholder='Segundo Nombre'
                            value={formData.segundoNombre}
                            onChange={handleChangeForm}
                            className='w-full p-3 bg-white dark:bg-gray-700 rounded-md text-gray-800 dark:text-gray-200 placeholder-gray-400'
                        />

                        {/* Apellido Field */}
                        <input
                            type='text'
                            name='primerApellido'
                            placeholder='Primer Apellido'
                            value={formData.primerApellido}
                            onChange={handleChangeForm}
                            required
                            className='w-full p-3 bg-white dark:bg-gray-700 rounded-md text-gray-800 dark:text-gray-200 placeholder-gray-400'
                        />
                        <input
                            type='text'
                            name='segundoApellido'
                            placeholder='Segundo Apellido'
                            value={formData.segundoApellido}
                            onChange={handleChangeForm}
                            className='w-full p-3 bg-white dark:bg-gray-700 rounded-md text-gray-800 dark:text-gray-200 placeholder-gray-400'
                        />
                    </div>
                    {/* Teléfono Field */}
                    <input
                        type='tel'
                        name='celular'
                        placeholder='Celular'
                        value={formData.celular}
                        onChange={handleChangeForm}
                        required
                        className='w-full p-3 bg-white dark:bg-gray-700 rounded-md text-gray-800 dark:text-gray-200 placeholder-gray-400'
                    />

                    {/* Correo Electrónico Field */}
                    <input
                        type='email'
                        name='email'
                        placeholder='Correo'
                        value={formData.email}
                        onChange={handleChangeForm}
                        required
                        className='w-full p-3 bg-white dark:bg-gray-700 rounded-md text-gray-800 dark:text-gray-200 placeholder-gray-400'
                    />

                    {/* Rol Field */}
                    {/* <select
                        name='rol'
                        required
                        className='w-full p-3 bg-white dark:bg-gray-700 rounded-md text-gray-800 dark:text-gray-200'
                        value={rol}
                        onChange={handleChangeRole}>
                        <option value='' disabled>
                            Selecciona tu rol
                        </option>
                        <option value='admin'>Administrador</option>
                        <option value={PARTICIPANTE}>{PARTICIPANTE}</option>
                        <option value={ORGANIZADOR}>{ORGANIZADOR}</option>
                    </select> */}

                    {/* Contraseña Field */}
                    <input
                        type='password'
                        minLength={minLengthPassWord}
                        name='clave'
                        placeholder='Contraseña'
                        value={formData.clave}
                        onChange={handleChangeForm}
                        required
                        className='w-full p-3 bg-white dark:bg-gray-700 rounded-md text-gray-800 dark:text-gray-200 placeholder-gray-400'
                    />

                    {/* Confirmar Contraseña Field */}
                    <input
                        type='password'
                        name='confirmarClave'
                        placeholder='Confirmar contraseña'
                        value={formData.confirmarClave}
                        onChange={handleChangeForm}
                        required
                        className='w-full p-3 bg-white dark:bg-gray-700 rounded-md text-gray-800 dark:text-gray-200 placeholder-gray-400'
                    />
                    {error && (
                        <p className='text-red-500 bg-gray-200 p-4 rounded-full flex justify-center'>
                            {error}
                        </p>
                    )}

                    {/* Submit Button */}
                    <button
                        type='submit'
                        className='w-full p-3 bg-gray-800 dark:bg-blue-600 hover:bg-gray-700 dark:hover:bg-blue-500 text-white font-bold uppercase rounded-md transition'>
                        Ingresar
                    </button>
                </form>
            </div>
        </div>
    )
}
