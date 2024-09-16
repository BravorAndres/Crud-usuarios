import React, { useState } from 'react';

function Modal({ user, onClose, onEdit, onDelete }) {
  const [formData, setFormData] = useState({ ...user });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-dialog">
        <div className="modal-header">
          <h2 className="modal-title">{user.id ? 'Editar Usuario' : 'Crear Usuario'}</h2>
          <button className="close" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="address_city"
            placeholder="Ciudad"
            value={formData.address_city}
            onChange={handleChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Teléfono"
            value={formData.phone}
            onChange={handleChange}
          />
          <input
            type="text"
            name="website"
            placeholder="Sitio Web"
            value={formData.website}
            onChange={handleChange}
          />
          <input
            type="text"
            name="company_name"
            placeholder="Nombre de la Compañía"
            value={formData.company_name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="company_bs"
            placeholder="Company BS"
            value={formData.company_bs}
            onChange={handleChange}
          />
        </div>
        <div className="modal-footer">
          <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
            {user.id ? 'Guardar Cambios' : 'Crear Usuario'}
          </button>
          {user.id && (
            <button className="btn btn-danger" onClick={() => onDelete(user.id)}>
              Eliminar
            </button>
          )}
          <button className="btn btn-secondary" onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
