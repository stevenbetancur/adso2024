# adso2024

En este repositorio encontramos dos proyectos

BackEnd - NodeJS: employee-backend
FrontEnd - React: employee-management-frontend

Para poder probar cada uno, primero debe ingresar a cada carpeta y ejecutar npm install.
NOTA: Recuerden que deben tener instalado NodeJS como vimos en clase.

Para que el back funcione debe crear una base de datos con el nombre: employee_db

Y crear una tabla con la siguiente estructura:

CREATE TABLE `employees` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NOT NULL COLLATE 'latin1_swedish_ci',
	`email` VARCHAR(255) NOT NULL COLLATE 'latin1_swedish_ci',
	`position` VARCHAR(255) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
	`createdAt` DATETIME NOT NULL,
	`updatedAt` DATETIME NOT NULL,
	PRIMARY KEY (`id`) USING BTREE,
	UNIQUE INDEX `email` (`email`) USING BTREE
);

Con solo estos pasos debería funcionar forma correcta una aplicación que consulte y cree empleados.

Al ejecutar el npm install en cada uno, debemos ejecutar cada aplicación

El back de node sube ejecutando el comando: node server.js
NOTA: Recuerde que esto lo debe ejecutar como vimos en clase en una consola de Git o CMD y estar en la carpeta employee-backend

El Front de React, sube ejecutando el comando: npm start
NOTA: Recuerde que esto lo debe ejecutar como vimos en clase en una consola de Git o CMD y estar en la carpeta employee-management-frontend

Quiere decir que debe tener dos consolas, cada una debe subir el servicio de una aplicación.

El back está subiendo el servicio por el puerto 3001 y el front sube por el puerto 3000


Paso a paso creación de los proyectos:


Backend con Node.js y MySQL
1. Instalar Node.js y MySQL
Asegúrate de tener Node.js y MySQL instalados en tu máquina.

2. Crear un proyecto Node.js
Abre una terminal y crea una nueva carpeta para el backend

mkdir employee-management-backend
cd employee-management-backend


Inicializa un proyecto Node.js:

npm init -y

Instala las dependencias necesarias:

npm install express mysql2 sequelize body-parser cors

3. Configurar la base de datos MySQL
Crea una base de datos en MySQL

CREATE DATABASE employee_management;

4. Configurar Sequelize para conectar a MySQL
Crea un archivo db.config.js dentro de una carpeta config

module.exports = {
  HOST: 'localhost',
  USER: 'root',
  PASSWORD: 'your_password',
  DB: 'employee_management',
  dialect: 'mysql',
};


Configurar el modelo de empleado
Dentro de una carpeta models, crea un archivo employee.model.js

const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/db.config');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
});

const Employee = sequelize.define('Employee', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  position: {
    type: DataTypes.STRING,
  },
});

sequelize.sync()
  .then(() => {
    console.log('Employee table created.');
  })
  .catch(err => console.log('Error: ', err));

module.exports = Employee;


 Configurar rutas y controladores
Crea una carpeta controllers y un archivo employee.controller.js

const Employee = require('../models/employee.model');

exports.createEmployee = async (req, res) => {
  try {
    const { name, email, position } = req.body;
    const employee = await Employee.create({ name, email, position });
    res.json(employee);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.json(employees);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};


Crear el servidor con Express
Crea un archivo server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const employeeController = require('./controllers/employee.controller');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/employees', employeeController.createEmployee);
app.get('/api/employees', employeeController.getEmployees);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


Ejecuta el servidor

node server.js


Frontend con React
1. Crear el proyecto React
Crea una nueva carpeta para el frontend y usa create-react-app

npx create-react-app employee-management-frontend
cd employee-management-frontend


. Instalar Axios para las peticiones HTTP

npm install axios


Crear el componente EmployeeList
En la carpeta src/components, crea un archivo EmployeeList.js

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
      <h2>Employee List</h2>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            {employee.name} - {employee.email} ({employee.position})
          </li>
        ))}
      </ul>

      <h2>Add Employee</h2>
      <form onSubmit={saveEmployee}>
        <input
          type="text"
          name="name"
          placeholder="Name"
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
          placeholder="Position"
          value={newEmployee.position}
          onChange={handleInputChange}
        />
        <button type="submit">Save Employee</button>
      </form>
    </div>
  );
};

export default EmployeeList;


Integrar el componente en la App
Modifica src/App.js

import React from 'react';
import EmployeeList from './components/EmployeeList';

function App() {
  return (
    <div className="App">
      <EmployeeList />
    </div>
  );
}

export default App;


npm start
