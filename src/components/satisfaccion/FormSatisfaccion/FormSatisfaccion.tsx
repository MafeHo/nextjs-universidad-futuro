'use client'
import { Feedback } from 'app/models/feedback.model'
import LogicService from 'app/services/logicService'
import { useState } from 'react'
import Swal from 'sweetalert2'

export const FormSatisfaccion = ({
    closeModal,
    inscriptionId,
    setFeedback,
}: {
    closeModal: () => void
    inscriptionId: number
    setFeedback: (number: number | undefined) => void
}) => {
    const [formData, setFormData] = useState({
        generalRating: '',
        contentQuality: '',
        organizationQuality: '',
        additionalComments: '',
    })

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Datos enviados:', formData)

        // Lógica para enviar la encuesta
        const feedbackData: Feedback = {
            comments: formData.additionalComments,
            overallEventRating: parseInt(formData.generalRating),
            contentQuality: parseInt(formData.contentQuality),
            organizationQuality: parseInt(formData.organizationQuality),
            inscripcionId: inscriptionId,
        }

        try {
            const feedback = await LogicService.createFeedback(feedbackData)
            console.log('====================================')
            console.log('Encuesta enviada:', feedback)
            console.log('====================================')
            setFeedback(feedback.id)
        } catch (error) {
            console.error('Error al enviar la encuesta:', error)
            setFeedback(undefined)
            Swal.fire({
                icon: 'error',
                title: 'Error al enviar la encuesta',
                text: 'Por favor, intenta de nuevo',
                confirmButtonText: 'Aceptar',
            })
        }

        Swal.fire({
            icon: 'success',
            title: 'Encuesta Enviada',
            text: '¡Gracias por tu participación!',
            confirmButtonText: 'Aceptar',
        })

        closeModal()
    }

    return (
        <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Calificación general */}
            <div>
                <label
                    htmlFor='generalRating'
                    className='block text-gray-700 dark:text-gray-300 font-medium mb-2'>
                    Calificación general del evento:
                </label>
                <div className='flex justify-between'>
                    {[1, 2, 3, 4, 5].map((value) => (
                        <label
                            key={value}
                            className='flex items-center gap-2 text-gray-600 dark:text-gray-300'>
                            <input
                                id={`generalRating-${value}`}
                                type='radio'
                                name='generalRating'
                                value={value.toString()}
                                onChange={handleChange}
                                className='form-radio text-blue-500 focus:ring focus:ring-blue-300'
                                required
                            />
                            {value}
                        </label>
                    ))}
                </div>
            </div>

            {/* Calidad del contenido */}
            <div>
                <label
                    htmlFor='contentQuality'
                    className='block text-gray-700 dark:text-gray-300 font-medium mb-2'>
                    Calidad del contenido:
                </label>
                <div className='flex justify-between'>
                    {[1, 2, 3, 4, 5].map((value) => (
                        <label
                            key={value}
                            className='flex items-center gap-2 text-gray-600 dark:text-gray-300'>
                            <input
                                type='radio'
                                name='contentQuality'
                                value={value.toString()}
                                onChange={handleChange}
                                className='form-radio text-blue-500 focus:ring focus:ring-blue-300'
                                required
                            />
                            {value}
                        </label>
                    ))}
                </div>
            </div>

            {/* Calidad de la organización */}
            <div>
                <label
                    htmlFor='organizationQuality'
                    className='block text-gray-700 dark:text-gray-300 font-medium mb-2'>
                    Calidad de la organización:
                </label>
                <div className='flex justify-between'>
                    {[1, 2, 3, 4, 5].map((value) => (
                        <label
                            key={value}
                            className='flex items-center gap-2 text-gray-600 dark:text-gray-300'>
                            <input
                                type='radio'
                                name='organizationQuality'
                                value={value.toString()}
                                onChange={handleChange}
                                className='form-radio text-blue-500 focus:ring focus:ring-blue-300'
                                required
                            />
                            {value}
                        </label>
                    ))}
                </div>
            </div>

            {/* Comentarios adicionales */}
            <div>
                <label
                    htmlFor='additionalComments'
                    className='block text-gray-700 dark:text-gray-300 font-medium mb-2'>
                    Comentarios adicionales:
                </label>
                <textarea
                    name='additionalComments'
                    rows={4}
                    className='w-full border rounded-md p-3 text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-800 focus:ring focus:ring-blue-300'
                    placeholder='Comparte tus opiniones y sugerencias'
                    onChange={handleChange}
                />
            </div>

            {/* Botón de enviar */}
            <button
                onClick={handleSubmit}
                className='w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 font-bold'>
                Enviar Encuesta
            </button>
        </form>
    )
}
