import React, { useEffect } from 'react';


const Alert = ({ message, onClose }) => {
  // Cerrar la alerta después de 3 segundos
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // 3 segundos

      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  return (
    message ? (
      <div className="alert-box">
        {message}
      </div>
    ) : null
  );
};

export default Alert;