import React from 'react';



const DataTable = ({ data }) => {
  return (
    <div className="App table-responsive">
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Usuario</th>
            <th>Email</th>
            <th>Ciudad</th>
            <th>Teléfono</th>
            <th>Website</th>
            <th>Compañía</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.username}</td>
              <td>{item.email}</td>
              <td>{item.address_city}</td>
              <td>{item.phone}</td>
              <td>{item.website}</td>
              <td>{item.company_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
