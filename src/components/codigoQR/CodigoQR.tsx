import React, { useState, useEffect } from 'react';
import LogicService from 'app/services/logicService';

const QRCodeComponent = ({ participanteId, eventoId }: { participanteId: number, eventoId: number }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Manejo de errores
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Estado del modal

  // Efecto para obtener el código QR
  useEffect(() => {
    const fetchQRCode = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const qrCode = await LogicService.generateQRCode(participanteId, eventoId);
        setQrCodeUrl(qrCode);
      } catch (error) {
        console.error('Failed to fetch QR Code', error);
        setError('Error al generar el código QR.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchQRCode();
  }, [participanteId, eventoId]);

  // Función para abrir el modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>Inscribirse</button> {/* Botón para abrir el modal */}

      {/* Modal */}
      {isModalOpen && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.modal}>
            <h2>Este es tu código QR</h2>
            {isLoading ? (
              <p>Loading QR code...</p>
            ) : error ? (
              <p style={{ color: 'red' }}>{error}</p>
            ) : (
              <div>
                <p>Usalo cuando vayas a asistir al evento:</p>
                <img src={qrCodeUrl} alt="QR Code" style={modalStyles.qrImage} />
              </div>
            )}
            <button onClick={closeModal} style={modalStyles.closeButton}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

// Tipado de estilos para TypeScript
const modalStyles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    width: '300px',
  },
  qrImage: {
    marginTop: '10px',
    width: '100%',
    height: 'auto',
  },
  closeButton: {
    marginTop: '10px',
    padding: '8px 16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
}
