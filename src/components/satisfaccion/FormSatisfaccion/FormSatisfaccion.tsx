'use client'; 
import { useState } from 'react';

export const FormSatisfaccion = ({ closeModal }: { closeModal: () => void }) => {
  const [formData, setFormData] = useState({
      generalRating: '',
      contentQuality: '',
      organizationQuality: '',
      additionalComments: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log('Datos enviados:', formData);

      alert('Encuesta enviada con éxito. ¡Gracias por tu participación!');
      closeModal();
  };

  return (
      <form onSubmit={handleSubmit} className="space-y-6">
          {/* Calificación general */}
          <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                  Calificación general del evento:
              </label>
              <div className="flex justify-between">
                  {[1, 2, 3, 4, 5].map((value) => (
                      <label key={value} className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                          <input
                              type="radio"
                              name="generalRating"
                              value={value.toString()}
                              onChange={handleChange}
                              className="form-radio text-blue-500 focus:ring focus:ring-blue-300"
                              required
                          />
                          {value}
                      </label>
                  ))}
              </div>
          </div>

          {/* Calidad del contenido */}
          <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                  Calidad del contenido:
              </label>
              <div className="flex justify-between">
                  {[1, 2, 3, 4, 5].map((value) => (
                      <label key={value} className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                          <input
                              type="radio"
                              name="contentQuality"
                              value={value.toString()}
                              onChange={handleChange}
                              className="form-radio text-blue-500 focus:ring focus:ring-blue-300"
                              required
                          />
                          {value}
                      </label>
                  ))}
              </div>
          </div>

          {/* Calidad de la organización */}
          <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                  Calidad de la organización:
              </label>
              <div className="flex justify-between">
                  {[1, 2, 3, 4, 5].map((value) => (
                      <label key={value} className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                          <input
                              type="radio"
                              name="organizationQuality"
                              value={value.toString()}
                              onChange={handleChange}
                              className="form-radio text-blue-500 focus:ring focus:ring-blue-300"
                              required
                          />
                          {value}
                      </label>
                  ))}
              </div>
          </div>

          {/* Comentarios adicionales */}
          <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                  Comentarios adicionales:
              </label>
              <textarea
                  name="additionalComments"
                  rows={4}
                  className="w-full border rounded-md p-3 text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-800 focus:ring focus:ring-blue-300"
                  placeholder="Comparte tus opiniones y sugerencias"
                  onChange={handleChange}
              />
          </div>

          {/* Botón de enviar */}
          <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 font-bold"
          >
              Enviar Encuesta
          </button>
      </form>
  );
};


