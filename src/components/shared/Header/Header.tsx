'use client'
import Link from 'next/link'
import { DarkMode } from '../DarkMode'
import useSecurityStore from 'app/stores/useSecurityStore'

export const Header = () => {
    const { user, removeUser } = useSecurityStore()
    return (
        <>
            {/* Header for larger screens */}
            <header className='hidden md:flex items-center justify-between w-full h-16 bg-blue-600 pr-8 dark:bg-gray-900 fixed z-50 top-0'>
                <div className='flex items-center text-white'>
                    <div className='text-xl font-bold bg-black dark:bg-gray-700 h-16 px-8 pt-4'>
                        UNF
                    </div>
                    <nav className='hidden md:flex space-x-12 pl-12'>
                        <Link href='/' className='text-white hover:text-blue-500'>
                            Inicio
                        </Link>
                        <Link
                            href='/events'
                            className='text-white hover:text-blue-500'>
                            Mis Eventos
                        </Link>
                        <Link
                            href='/contact'
                            className='text-white hover:text-blue-500'>
                            Contactanos
                        </Link>
                        <Link
                            href='/aboutus'
                            className='text-white hover:text-blue-500'>
                            Acerca de
                        </Link>
                        <Link
                            href='/calendario'
                            className='text-white hover:text-blue-500'>
                            Calendario
                        </Link>
                        <Link
                            href='/eventBarChart'
                            className='text-white hover:text-blue-500'>
                            Gráficas
                        </Link>
                        <Link
                            href='/dashboard'
                            className='text-white hover:text-blue-500'>
                            Dashboard
                        </Link>
                        <Link
                            href='/listarUsuarios'
                            className='text-white hover:text-blue-500'>
                            Usuarios
                        </Link>
                    </nav>
                </div>

                <div className='flex items-center space-x-6 transition-all duration-300 ease-in-out'>
                    <DarkMode />
                    {(user && (
                        <Link href='/logout' onClick={removeUser}>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='30'
                                height='30'
                                fill='currentColor'
                                className='bi bi-box-arrow-right transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-75'
                                viewBox='0 0 16 16'>
                                <path
                                    fillRule='evenodd'
                                    className='fill-current text-white dark:text-white'
                                    d='M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z'
                                />
                                <path
                                    fillRule='evenodd'
                                    className='fill-current text-white dark:text-white'
                                    d='M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z'
                                />
                            </svg>
                        </Link>
                    )) ?? (
                        <Link href='/login'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='30'
                                height='30'
                                fill='currentColor'
                                className='bi bi-person-fill transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-75'
                                viewBox='0 0 16 16'>
                                <path
                                    className='fill-current text-white dark:text-white'
                                    d='M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'
                                />
                            </svg>
                        </Link>
                    )}
                </div>
            </header>

            {/* Header for small screens */}
            <header className='md:hidden flex items-center align-middle w-full h-16 bg-blue-600 pr-8 dark:bg-blue-950 fixed z-50'>
                <div className='flex items-center text-white justify-start'>
                    <div className='text-xl font-bold bg-black h-16 px-8 pt-4'>
                        UNF
                    </div>
                </div>

                <div className='flex items-center space-x-9 p-12 justify-center transition-all duration-300 ease-in-out'>
                    <DarkMode />
                    {(user && (
                        <Link href='/logout' onClick={removeUser}>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='30'
                                height='30'
                                fill='currentColor'
                                className='bi bi-box-arrow-right transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-75'
                                viewBox='0 0 16 16'>
                                <path
                                    fillRule='evenodd'
                                    className='fill-current text-white dark:text-white'
                                    d='M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z'
                                />
                                <path
                                    fillRule='evenodd'
                                    className='fill-current text-white dark:text-white'
                                    d='M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z'
                                />
                            </svg>
                        </Link>
                    )) ?? (
                        <Link href='/login'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='30'
                                height='30'
                                fill='currentColor'
                                className='bi bi-person-fill transition-opacity duration-300 ease-in-out opacity-100 hover:opacity-75'
                                viewBox='0 0 16 16'>
                                <path
                                    className='fill-current text-white dark:text-white'
                                    d='M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'
                                />
                            </svg>
                        </Link>
                    )}
                    <Link href='/'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='30'
                            height='30'
                            fill='currentColor'
                            className='bi bi-search'
                            viewBox='0 0 16 16'>
                            <path
                                className='fill-current text-white dark:text-white'
                                d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'
                            />
                        </svg>
                    </Link>
                </div>
            </header>
        </>
    )
}
