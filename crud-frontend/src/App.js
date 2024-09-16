import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from './Components/DataTable';
import Modal from './Components/Modal';
import Alert from './Components/Alert';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // Nuevo estado para mensajes de error

  const url = 'http://localhost:8000/api/users/';

  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      setErrorMessage('Error fetching data');
    }
  };

  const handleSearch = async () => {
    try {
      setSelectedUser(null);
      const response = await axios.get(url + `${searchId}`);
      setSelectedUser(response.data);
      setShowModal(true);
      setIsCreating(false);
    } catch (error) {
      setErrorMessage('Usuario no encontrado'); // Establecer mensaje de error
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
      await axios.put(`${url}${updatedUser.id}`, updatedUser, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      fetchData();
      setShowModal(false);
    } catch (error) {
      setErrorMessage('Error actualizando el usuario');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${url}${id}`);
      fetchData();
      setShowModal(false);
    } catch (error) {
      setErrorMessage('Error eliminando el usuario');
    }
  };

  const handleCreateUser = async (newUser) => {
    try {
      await axios.post(url,newUser);
      fetchData();
      setShowModal(false);
    } catch (error) {
      setErrorMessage('Error creando usuario');
      console.error('Detalles del error:', error);
    }
  };

  const handleShowCreateModal = () => {
    setSelectedUser({
      id: '',
      name: '',
      username: '',
      email: '',
      address_city: '',
      phone: '',
      website: '',
      company_name: '',
      company_bs: '',
    });
    setIsCreating(true);
    setShowModal(true);
  };

  const closeAlert = () => {
    setErrorMessage('');
  };

  return (
    <div className="App container mt-5">
      <h1 className="text-center mb-4">Lista de Usuarios</h1>
      <div className="d-flex justify-content-center mb-4">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Buscar por ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button className="btn btn-primary me-2" onClick={handleSearch}>Buscar</button>
        <button className="btn btn-secondary me-2" onClick={handleShowAll}>Mostrar Todos</button>
        <button className="btn btn-success" onClick={handleShowCreateModal}>Agregar Usuario</button>
      </div>

      {/* Mostrar alerta solo si hay un mensaje de error */}
      {errorMessage && <Alert message={errorMessage} onClose={closeAlert} />}

      {showModal && selectedUser && (
        <Modal
          user={selectedUser}
          onClose={handleCloseModal}
          onEdit={isCreating ? handleCreateUser : handleEdit}
          onDelete={isCreating ? null : handleDelete}
        />
      )}
      <DataTable data={data} />
    </div>
  );
}

export default App;

