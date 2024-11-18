'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

export const Codigo = () => {
    const router = useRouter()
    const [digits, setDigits] = useState(['', '', '', ''])
    const inputRefs = useRef<Array<HTMLInputElement | null>>([])

    const handleDigitInput = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        if (/^[0-9]?$/.test(value)) {
            const newDigits = [...digits]
            newDigits[index] = value
            setDigits(newDigits)

            // Move focus to the next input if it's valid
            if (value && index < inputRefs.current.length - 1) {
                inputRefs.current[index + 1]?.focus()
            }
        }
    }

    const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Backspace' && !digits[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        const code = digits.join('')
        console.log('Código ingresado:', code)
        // Aquí puedes manejar la lógica para verificar el código
        if (code.length === 4) {
            router.push('/cambio') // Redirige a la página para cambiar la contraseña
        } else {
            alert('Por favor, completa los 4 dígitos.')
        }
    }

    return (
        <div className='min-h-screen bg-white dark:bg-gray-800 flex items-center justify-center pt-16'>
            <div className='w-11/12 max-w-sm mx-auto'>
                <form
                    onSubmit={handleSubmit}
                    className='grid gap-4 bg-blue-600 pr-8 dark:bg-gray-900 p-8 rounded-md shadow-lg'>
                    <h2 className='text-center text-2xl font-bold text-white dark:text-gray-300 mb-6'>
                        Cambio de Contraseña
                    </h2>

                    <div className='text-center text-muted mb-4'>
                        <small>Ingresa el código que te enviamos al correo electrónico</small>
                    </div>

                    <div className='flex justify-center gap-4'>
                        {digits.map((digit, index) => (
                            <input
                                key={index}
                                type='text'
                                className='w-12 h-12 text-center text-2xl rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-300 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                maxLength={1}
                                value={digit}
                                onChange={(event) => handleDigitInput(index, event)}
                                onKeyDown={(event) => handleKeyDown(index, event)}
                                ref={(el) => {
                                    inputRefs.current[index] = el;
                                }}
                            />
                        ))}
                    </div>

                    <button
                        type='submit'
                        className='w-full p-4 bg-gray-800 dark:bg-blue-600 hover:bg-gray-700 dark:hover:bg-blue-500 text-white font-bold uppercase rounded-md cursor-pointer transition mt-4'>
                        Enviar
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Codigo
