'use client' // Esto indica que el componente es un Client Component

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import MD5 from 'crypto-js/md5'
import { UsuarioModel } from 'app/models/usuario.model'
import useSecurityStore from 'app/stores/useSecurityStore'
import SecurityService from 'app/services/securityService'
import Swal from 'sweetalert2'

export const LoginForm = () => {
    const router = useRouter()
    const { setUser } = useSecurityStore()
    const [formData, setFormData] = useState({
        email: '',
        clave: '',
    })

    const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        console.log(name, value)

        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        // Aquí puedes agregar lógica de autenticación si es necesario
        let cryptoPassword = MD5(formData.clave).toString()
        let credentials = {
            correo: formData.email,
            clave: cryptoPassword,
        }
        SecurityService.login(credentials).then((data: UsuarioModel) => {
            if (data._id == undefined || data._id == null) {
                Swal.fire({
                    title: 'Error de autenticación',
                    text: 'Credenciales incorrectas.',
                    icon: 'warning',
                    timer: 3000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    allowOutsideClick: false,
                })
            } else {
                console.log('====================================')
                console.log(data)
                console.log('====================================')
                setUser(data)
                router.push('/doblefactor') // Redirige a la página de doble factor
            }
        })
    }

    const handleForgotPasswordClick = () => {
        router.push('/inicial') // Redirige a la página "inicial" al hacer clic en "¿Olvidaste tu contraseña?"
    }

    return (
        <div className='min-h-screen bg-white dark:bg-gray-800 flex items-center justify-center pt-16'>
            <div className='w-11/12 max-w-sm mx-auto'>
                <form
                    onSubmit={handleSubmit}
                    className='grid gap-4 bg-blue-600 pr-8 dark:bg-gray-900 p-8 rounded-md shadow-lg'>
                    <h2 className='text-center text-2xl font-bold text-white dark:text-gray-300 mb-6'>
                        Inicia Sesión
                    </h2>

                    <div className='flex items-center bg-white dark:bg-gray-700 rounded-md'>
                        <label htmlFor='login__email' className='p-4'>
                            <svg className='w-5 h-5 fill-current text-gray-400'>
                                <use xlinkHref='#icon-user' />
                            </svg>
                        </label>
                        <input
                            autoComplete='email'
                            id='login__email'
                            type='email'
                            name='email'
                            value={formData.email}
                            onChange={handleChangeForm}
                            placeholder='Correo Electrónico'
                            required
                            className='w-full p-4 bg-transparent outline-none text-gray-400 placeholder-gray-400'
                        />
                    </div>

                    <div className='flex items-center bg-white dark:bg-gray-700 rounded-md'>
                        <label htmlFor='login__password' className='p-4'>
                            <svg className='w-5 h-5 fill-current text-gray-400'>
                                <use xlinkHref='#icon-lock' />
                            </svg>
                        </label>
                        <input
                            id='login__password'
                            type='password'
                            name='clave'
                            value={formData.clave}
                            onChange={handleChangeForm}
                            placeholder='Contraseña'
                            required
                            className='w-full p-4 bg-transparent outline-none text-gray-400 placeholder-gray-400'
                        />
                    </div>

                    <div>
                        <button className='w-full p-4 bg-gray-800 dark:bg-blue-600 hover:bg-gray-700 dark:hover:bg-blue-500 text-white font-bold uppercase rounded-md cursor-pointer transition'>
                            Ingresar
                        </button>
                    </div>

                    {/* <div className='text-center'>
                        <button
                            type='button'
                            onClick={handleForgotPasswordClick}
                            className='text-white dark:text-gray-300'>
                            ¿Olvidaste tu contraseña?
                        </button>
                    </div> */}
                </form>

                <p className='text-center text-gray-600 dark:text-gray-300 mt-4'>
                    ¿Eres nuevo?{' '}
                    <Link href='/signIn' className='text-blue-600 underline'>
                        Regístrate
                    </Link>
                    <svg className='w-4 h-4 inline-block ml-1 fill-current text-blue-600'>
                        <use xlinkHref='#icon-arrow-right' />
                    </svg>
                </p>
            </div>

            <svg xmlns='http://www.w3.org/2000/svg' className='hidden'>
                <symbol id='icon-arrow-right' viewBox='0 0 1792 1792'>
                    <path d='M1600 960q0 54-37 91l-651 651q-39 37-91 37-51 0-90-37l-75-75q-38-38-38-91t38-91l293-293H245q-52 0-84.5-37.5T128 1024V896q0-53 32.5-90.5T245 768h704L656 474q-38-36-38-90t38-90l75-75q38-38 90-38 53 0 91 38l651 651q37 35 37 90z' />
                </symbol>
                <symbol id='icon-lock' viewBox='0 0 1792 1792'>
                    <path d='M640 768h512V576q0-106-75-181t-181-75-181 75-75 181v192zm832 96v576q0 40-28 68t-68 28H416q-40 0-68-28t-28-68V864q0-40 28-68t68-28h32V576q0-184 132-316t316-132 316 132 132 316v192h32q40 0 68 28t28 68z' />
                </symbol>
                <symbol id='icon-user' viewBox='0 0 1792 1792'>
                    <path d='M1600 1405q0 120-73 189.5t-194 69.5H459q-121 0-194-69.5T192 1405q0-53 3.5-103.5t14-109T236 1084t43-97.5 62-81 85.5-53.5T538 832q9 0 42 21.5t74.5 48 108 48T896 971t133.5-21.5 108-48 74.5-48 42-21.5q61 0 111.5 20t85.5 53.5 62 81 43 97.5 26.5 108.5 14 109 3.5 103.5zm-320-893q0 159-112.5 271.5T896 896 624.5 783.5 512 512t112.5-271.5T896 128t271.5 112.5T1280 512z' />
                </symbol>
            </svg>
        </div>
    )
}
