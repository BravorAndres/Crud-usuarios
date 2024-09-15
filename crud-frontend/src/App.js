import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from './Components/DataTable';
import Modal from './Components/Modal';

function App() {
  const [data, setData] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const url = 'http://localhost:8000/api/users/';

  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = async () => {
    try {
      setSelectedUser(null); // Limpia el usuario seleccionado antes de buscar
      const response = await axios.get(url + `${searchId}`);
      setSelectedUser(response.data);
      setShowModal(true);
    } catch (error) {
      console.error('Error searching user:', error);
    }
  };

  const handleShowAll = () => {
    fetchData();
    setSelectedUser(null);
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleEdit = async (updatedUser) => {
    try {
      const response = await axios.put(`${url}${updatedUser.id}`, updatedUser, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      console.log('Usuario actualizado:', response.data);
      fetchData(); // Refresca la lista de usuarios
      setShowModal(false);
    } catch (error) {
      if (error.response && error.response.status === 422) {
        console.error("Error de validación:", error.response.data.errors);
        alert("Error: " + error.response.data.errors.email[0]); // Muestra el mensaje de error
      } else {
        console.error("Error actualizando el usuario:", error);
      }
    }
  };
  
  

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${url}${id}`); // Elimina el usuario en la API
      fetchData(); // Refresca la lista de usuarios
      setShowModal(false);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="App">
      <h1>Lista de Usuarios</h1>
      <div>
        <input
          type="text"
          placeholder="Buscar por ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button onClick={handleSearch}>Buscar</button>
        <button onClick={handleShowAll}>Mostrar Todos</button>
      </div>
      <DataTable data={data} />
      {showModal && selectedUser && (
        <Modal
          user={selectedUser}
          onClose={handleCloseModal}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default App;
