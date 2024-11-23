'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Swal from "sweetalert2";

export const CambioContraseña = () => {
    const minLengthPassWord = 8
    const router = useRouter()

    const [formData, setFormData] = useState({
        nuevaClave: '',
        confirmarClave: '',
    })
    const [error, setError] = useState('')

    const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
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
        if (formData.nuevaClave !== formData.confirmarClave) {
            setError('Las contraseñas no coinciden')
            return
        }
        const passwordError = validatePassword(formData.nuevaClave)
        if (passwordError) {
            setError(passwordError)
            return
        }

        setError('');
        try {
        // Aquí puedes manejar el envío del formulario
        console.log('Nueva contraseña:', formData.nuevaClave);

        await Swal.fire({
            title: "Contraseña cambiada",
            text: "Tu contraseña ha sido cambiada exitosamente.",
            icon: "success",
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
            allowOutsideClick: false,
        });

        router.push('/login'); // Redirige al login
        } catch (error) {
        console.error("Error al cambiar la contraseña:", error);
        Swal.fire({
            title: "Error",
            text: "Ocurrió un problema al cambiar la contraseña.",
            icon: "error",
            timer: 3000,
            timerProgressBar: true,
            showConfirmButton: false,
            allowOutsideClick: false,
        });
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
                        Cambio de Contraseña
                    </h2>

                    {/* Nueva Contraseña */}
                    <input
                        type='password'
                        name='nuevaClave'
                        placeholder='Nueva Contraseña'
                        value={formData.nuevaClave}
                        onChange={handleChangeForm}
                        required
                        className='w-full p-3 bg-white dark:bg-gray-700 rounded-md text-gray-800 dark:text-gray-200 placeholder-gray-400'
                    />

                    {/* Confirmar Contraseña */}
                    <input
                        type='password'
                        name='confirmarClave'
                        placeholder='Confirmar Contraseña'
                        value={formData.confirmarClave}
                        onChange={handleChangeForm}
                        required
                        className='w-full p-3 bg-white dark:bg-gray-700 rounded-md text-gray-800 dark:text-gray-200 placeholder-gray-400'
                    />

                    {/* Error Message */}
                    {error && (
                        <p className='text-red-500 bg-gray-200 p-4 rounded-full flex justify-center'>
                            {error}
                        </p>
                    )}

                    {/* Submit Button */}
                    <button
                        type='submit'
                        className='w-full p-3 bg-gray-800 dark:bg-blue-600 hover:bg-gray-700 dark:hover:bg-blue-500 text-white font-bold uppercase rounded-md transition'>
                        Cambiar Contraseña
                    </button>
                </form>
            </div>
        </div>
    )
}
