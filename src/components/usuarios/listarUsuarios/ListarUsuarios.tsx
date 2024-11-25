'use client'

import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'
import UsersService from 'app/services/usersService'
import EditarUsuario from '../editarUsuarios/EditarUsuarios'
import { SecurityConfig } from 'app/config/securityConfig'
import { Usuario } from 'app/models/usuario.model'
import useSecurityStore from 'app/stores/useSecurityStore'

const ListarUsuarios: React.FC = () => {
    const [usuarios, setUsuarios] = useState<Usuario[]>([])
    const [selectedUsuario, setSelectedUsuario] = useState<Usuario | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const { user } = useSecurityStore()

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const users = await UsersService.getUsers().then(
                    async (data: Usuario[]) => {
                        if (data.length === 0) {
                            console.log('No trae la información de los usuarios')
                        } else {
                            return filterUsersByRole(data)
                        }
                    }
                )
                if (users) {
                    console.log('Usuarios:', users)
                    setUsuarios(users)
                }
            } catch (error) {
                console.error('Error al obtener usuarios:', error)
            }
        }

        fetchUsuarios()
    }, [])

    const filterUsersByRole = async (data: Usuario[]) => {
        let users: Usuario[] = []
        switch (user?.rolId) {
            case SecurityConfig.ID_ROLE_ADMIN:
                users = data
                break
            case SecurityConfig.ID_ROLE_ORGANIZER:
                users = data.filter(
                    (user) =>
                        user.rolId !== SecurityConfig.ID_ROLE_ADMIN &&
                        user.rolId !== SecurityConfig.ID_ROLE_ORGANIZER
                )
                break
            case SecurityConfig.ID_ROLE_PARTICIPANT:
                const userId = user._id
                users = data.filter((user) => user._id === userId)
                break
            default:
                break
        }
        return users
    }

    const handleEditAction = (usuario: Usuario) => {
        setSelectedUsuario(usuario)
        setIsDialogOpen(true)
    }

    const handleEditUser = (updatedUsuario: Usuario) => {
        let newUser = {
            primerNombre: updatedUsuario.primerNombre,
            segundoNombre: updatedUsuario.segundoNombre,
            primerApellido: updatedUsuario.primerApellido,
            segundoApellido: updatedUsuario.segundoApellido,
            correo: updatedUsuario.correo,
            celular: updatedUsuario.celular,
            rolId: updatedUsuario.rolId,
        }
        UsersService.updateUser(newUser, updatedUsuario._id).then(() => {
            setUsuarios((prevUsuarios) =>
                prevUsuarios.map((user) => {
                    if (user._id === updatedUsuario._id) {
                        if (user.rolId !== updatedUsuario.rolId) {
                            let rolNombre
                            if (
                                updatedUsuario.rolId === SecurityConfig.ID_ROLE_ADMIN
                            ) {
                                rolNombre = 'Administrador'
                            } else if (
                                updatedUsuario.rolId ===
                                SecurityConfig.ID_ROLE_ORGANIZER
                            ) {
                                rolNombre = 'Organizador'
                            } else {
                                rolNombre = 'Participante'
                            }
                            updatedUsuario.rol = { nombre: rolNombre }
                        }
                        return updatedUsuario
                    }
                    return user
                })
            )
            setIsDialogOpen(false)
        })
    }

    const handleDelete = async (id: string) => {
        const result = await Swal.fire({
            title: 'Eliminar',
            text: '¿Está seguro que quiere eliminar el usuario?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'No, cancelar',
        })

        if (result.isConfirmed) {
            try {
                const response = await UsersService.deleteUser(id)
                if (response.status === 204) {
                    Swal.fire(
                        'Eliminado!',
                        'El usuario ha sido eliminado.',
                        'success'
                    )
                    setUsuarios(usuarios.filter((user) => user._id !== id))
                } else {
                    Swal.fire('Error', 'No se pudo eliminar el usuario.', 'error')
                }
            } catch (error) {
                Swal.fire(
                    'Error',
                    'Ocurrió un problema al eliminar el usuario.',
                    'error'
                )
            }
        }
    }

    return (
        <div className=' bg-white dark:bg-gray-800 pb-[102px]'>
            <div className='container mx-auto py-20 px-3'>
                <h2 className='text-2xl font-semibold mb-6'>Usuarios</h2>
                <div className='overflow-x-auto'>
                    <table className='table-auto w-full border-collapse border border-gray-300'>
                        <thead className='bg-gray-100'>
                            <tr>
                                {/* <th className='border border-gray-300 px-4 py-2 text-sm text-black dark:text-blue-600'>
                                    Id
                                </th> */}
                                <th className='border border-gray-300 px-4 py-2 text-sm text-black dark:text-blue-600'>
                                    Nombre
                                </th>
                                <th className='border border-gray-300 px-4 py-2 text-sm  md:table-cell text-black dark:text-blue-600'>
                                    Apellido
                                </th>
                                <th className='border border-gray-300 px-4 py-2 text-sm  lg:table-cell text-black dark:text-blue-600'>
                                    Teléfono
                                </th>
                                <th className='border border-gray-300 px-4 py-2 text-sm text-black dark:text-blue-600'>
                                    Correo
                                </th>
                                <th className='border border-gray-300 px-4 py-2 text-sm  md:table-cell text-black dark:text-blue-600'>
                                    Rol
                                </th>
                                <th className='border border-gray-300 px-4 py-2 text-sm text-black dark:text-blue-600'>
                                    Opciones
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map((usuario) => (
                                <tr key={usuario._id}>
                                    {/* <td className='border border-gray-300 px-4 py-2 text-sm'>
                                        {usuario._id}
                                    </td> */}
                                    <td className='border border-gray-300 px-4 py-2 text-sm'>
                                        {usuario.primerNombre}
                                    </td>
                                    <td className='border border-gray-300 px-4 py-2 text-sm  '>
                                        {usuario.primerApellido}
                                    </td>
                                    <td className='border border-gray-300 px-4 py-2 text-sm  '>
                                        {usuario.celular || 'N/A'}
                                    </td>
                                    <td className='border border-gray-300 px-4 py-2 text-sm'>
                                        {usuario.correo}
                                    </td>
                                    <td className='border border-gray-300 px-4 py-2 text-sm  md:table-cell'>
                                        {usuario.rol.nombre}
                                    </td>
                                    <td className='border border-gray-300 px-4 py-2 text-sm flex gap-2 justify-center'>
                                        <button
                                            onClick={() => handleEditAction(usuario)}
                                            className='bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2'>
                                            Editar
                                        </button>
                                        {(user?.rolId ==
                                            SecurityConfig.ID_ROLE_ADMIN ||
                                            user?.rolId ==
                                                SecurityConfig.ID_ROLE_PARTICIPANT) && (
                                            <button
                                                onClick={() =>
                                                    handleDelete(usuario._id)
                                                }
                                                className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'>
                                                Eliminar
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {isDialogOpen && selectedUsuario && (
                    <EditarUsuario
                        usuario={selectedUsuario}
                        isOpen={isDialogOpen}
                        onClose={() => setIsDialogOpen(false)}
                        onUpdate={handleEditUser}
                    />
                )}
            </div>
        </div>
    )
}

export default ListarUsuarios
