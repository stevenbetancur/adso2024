import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    position: '',
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const response = await axios.get('http://localhost:3001/api/employees');
    setEmployees(response.data);
  };

  const handleInputChange = (e) => {
    setNewEmployee({
      ...newEmployee,
      [e.target.name]: e.target.value,
    });
  };

  const saveEmployee = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:3001/api/employees', newEmployee);
    fetchEmployees();
    setNewEmployee({ name: '', email: '', position: '' });
  };

  return (
    <div>
      <h2>Empleados</h2>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            {employee.name} - {employee.email} ({employee.position})
          </li>
        ))}
      </ul>

      <h2>Adicionar Empleado</h2>
      <form onSubmit={saveEmployee}>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={newEmployee.name}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newEmployee.email}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="position"
          placeholder="Cargo"
          value={newEmployee.position}
          onChange={handleInputChange}
        />
        <button type="submit">Guardar Empleado</button>
      </form>
    </div>
  );
};

export default EmployeeList;
