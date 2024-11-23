import { useState } from "react";

const FormSatisfaccion = () => {
  const [formData, setFormData] = useState({
    generalRating: "",
    contentQuality: "",
    organizationQuality: "",
    additionalComments: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
    
    alert("Encuesta enviada con éxito. ¡Gracias por tu participación!");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Encuesta de Satisfacción</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Campo del Evento */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Evento:</label>
          <input
            type="text"
            name="eventName"
            className="w-full border rounded-md p-2"
            placeholder="Nombre del evento"
            disabled
            value="Evento Ejemplo" // Puedes remplazarlo dinámicamente
          />
        </div>

        {/* Calificación General */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Calificación general del evento:</label>
          <div className="flex gap-4">
            {[1, 2, 3, 4, 5].map((value) => (
              <label key={value} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="generalRating"
                  value={value}
                  onChange={handleChange}
                  required
                />
                {value}
              </label>
            ))}
          </div>
        </div>

        {/* Calidad del Contenido */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Calidad del contenido:</label>
          <div className="flex gap-4">
            {[1, 2, 3, 4, 5].map((value) => (
              <label key={value} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="contentQuality"
                  value={value}
                  onChange={handleChange}
                  required
                />
                {value}
              </label>
            ))}
          </div>
        </div>

        {/* Calidad de la Organización */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Calidad de la organización:</label>
          <div className="flex gap-4">
            {[1, 2, 3, 4, 5].map((value) => (
              <label key={value} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="organizationQuality"
                  value={value}
                  onChange={handleChange}
                  required
                />
                {value}
              </label>
            ))}
          </div>
        </div>

        {/* Comentarios Adicionales */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Comentarios adicionales:</label>
          <textarea
            name="additionalComments"
            rows={4}
            className="w-full border rounded-md p-2"
            placeholder="Comparte tus opiniones y sugerencias"
            onChange={handleChange}
          />
        </div>

        {/* Botón de Enviar */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Enviar Encuesta
        </button>
      </form>
    </div>
  );
};

export default FormSatisfaccion;
