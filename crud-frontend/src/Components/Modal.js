import React, { useState } from 'react';

const Modal = ({ user, onClose, onEdit, onDelete }) => {
  const [editedUser, setEditedUser] = useState(user);

  const handleChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEdit(editedUser);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Información del Usuario</h2>
        <form onSubmit={handleSubmit}>
          <label>ID:</label>
          <input type="text" name="id" value={editedUser.id} readOnly />
          <label>Nombre:</label>
          <input type="text" name="name" value={editedUser.name} onChange={handleChange} />
          <label>Usuario:</label>
          <input type="text" name="username" value={editedUser.username} onChange={handleChange} />
          <label>Email:</label>
          <input type="email" name="email" value={editedUser.email} onChange={handleChange} />
          <label>Ciudad:</label>
          <input type="text" name="address_city" value={editedUser.address_city} onChange={handleChange} />
          <label>Teléfono:</label>
          <input type="text" name="phone" value={editedUser.phone} onChange={handleChange} />
          <label>Website:</label>
          <input type="text" name="website" value={editedUser.website} onChange={handleChange} />
          <label>Compañía:</label>
          <input type="text" name="company_name" value={editedUser.company_name} onChange={handleChange} />
          <button type="submit">Guardar Cambios</button>
          <button type="button" onClick={() => onDelete(editedUser.id)}>Eliminar</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
