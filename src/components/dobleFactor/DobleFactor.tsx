// DobleFactor.tsx
'use client'

import { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation' // Importa useRouter
import SecurityService from 'app/services/securityService'
import useSecurityStore from 'app/stores/useSecurityStore'
import { TwoFactorResponseModel } from 'app/models/twoFactorResponse.model'
import Swal from "sweetalert2"

export const DobleFactor = () => {
    const router = useRouter() // Define router
    const digit1Ref = useRef<HTMLInputElement>(null)
    const digit2Ref = useRef<HTMLInputElement>(null)
    const digit3Ref = useRef<HTMLInputElement>(null)
    const digit4Ref = useRef<HTMLInputElement>(null)

    const [code, setCode] = useState<string>('')

    const { user, setSessionData } = useSecurityStore()

    useEffect(() => {
        // Focaliza el primer input al cargar la página
        digit1Ref.current?.focus()
    }, [])

    const onDigitInput = (
        index: number,
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = event.target.value

        // Permite solo números y limita la longitud a 1
        if (!/^\d*$/.test(value)) {
            event.target.value = ''
            return
        }

        // Enfoca al siguiente input si hay un valor
        if (value !== '') {
            switch (index) {
                case 1:
                    digit2Ref.current?.focus()
                    break
                case 2:
                    digit3Ref.current?.focus()
                    break
                case 3:
                    digit4Ref.current?.focus()
                    break
                default:
                    break
            }
        }
    }

    const verifyCode = () => {
        const codeEntered = [
            digit1Ref.current?.value,
            digit2Ref.current?.value,
            digit3Ref.current?.value,
            digit4Ref.current?.value,
        ].join('')

        // setCode(codeEntered)
        console.log('Código ingresado:', codeEntered)

        if (
            codeEntered === '' ||
            codeEntered === null ||
            codeEntered === undefined ||
            codeEntered.length < 4
        ) {
            Swal.fire({
                title: "Código requerido",
                text: "Debe ingresar el código completo.",
                icon: "warning",
                timer: 3000,
                timerProgressBar: true,
                showConfirmButton: false,
                allowOutsideClick: false,
              });
              return;
        }

        // Aquí podrías agregar la lógica de verificación del código

        try {
            if (user == null) {
                Swal.fire({
                    title: "Sesión no iniciada",
                    text: "No se ha iniciado sesión.",
                    icon: "error",
                    timer: 3000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    allowOutsideClick: false,
                  });
                  return;
            }
            let body = {
                usuarioId: user._id,
                codigo2fa: codeEntered,
            }
            SecurityService.verify2faCode(body)
                .then((data: TwoFactorResponseModel) => {
                    console.log('====================================')
                    console.log(data)
                    console.log('====================================')
                    if (
                        data.token != null &&
                        data.token != undefined &&
                        data.token != ''
                    ) {
                        // SecurityService.buildSideMenu(data.menu)
                        setSessionData(data)
                        // Redirige al usuario a la página de inicio después de verificar
                        router.push('/') // Redirecciona a la página de inicio
                    } else {
                        Swal.fire({
                            title: "Código inválido",
                            text: "El código ingresado no es válido.",
                            icon: "error",
                            timer: 3000,
                            timerProgressBar: true,
                            showConfirmButton: false,
                            allowOutsideClick: false,
                          });
                    }
                })
                .catch((error) => {
                    Swal.fire({
                        title: "Error",
                        text: error.message,
                        icon: "error",
                        timer: 3000,
                        timerProgressBar: true,
                        showConfirmButton: false,
                        allowOutsideClick: false,
                      });
                })
        } catch (error) {
            console.error('Error verificando el código:', error)
            return
        }
    }

    return (
        <div className='min-h-screen bg-white dark:bg-gray-800 flex items-center justify-center pt-16'>
            <div className='w-11/12 max-w-sm mx-auto'>
                <div className='grid gap-4 bg-blue-600 pr-8 dark:bg-gray-900 p-8 rounded-md shadow-lg'>
                    <h2 className='text-center text-2xl font-bold text-white dark:text-gray-300 mb-6'>
                        Código de Verificación
                    </h2>
                    <p className='text-center text-white dark:text-gray-400 mb-4'>
                        Ingresa el código que te enviamos al correo electrónico
                    </p>
                    <div className='flex justify-center space-x-2 mb-4'>
                        <input
                            ref={digit1Ref}
                            type='text'
                            maxLength={1}
                            className='w-12 h-14 text-center border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white text-lg'
                            onChange={(e) => onDigitInput(1, e)}
                        />
                        <input
                            ref={digit2Ref}
                            type='text'
                            maxLength={1}
                            className='w-12 h-14 text-center border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white text-lg'
                            onChange={(e) => onDigitInput(2, e)}
                        />
                        <input
                            ref={digit3Ref}
                            type='text'
                            maxLength={1}
                            className='w-12 h-14 text-center border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white text-lg'
                            onChange={(e) => onDigitInput(3, e)}
                        />
                        <input
                            ref={digit4Ref}
                            type='text'
                            maxLength={1}
                            className='w-12 h-14 text-center border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white text-lg'
                            onChange={(e) => onDigitInput(4, e)}
                        />
                    </div>
                    <button
                        onClick={verifyCode}
                        className='w-full p-4 bg-gray-800 dark:bg-blue-600 hover:bg-gray-700 dark:hover:bg-blue-500 text-white font-bold uppercase rounded-md cursor-pointer transition'>
                        Enviar
                    </button>
                    {code && (
                        <p className='text-center mt-4 text-white dark:text-gray-300'>
                            Código ingresado: {code}
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default DobleFactor
