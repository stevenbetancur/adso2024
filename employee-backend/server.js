const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./src/db');
const employeeRoutes = require('./src/employee.controller');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Ruta para empleados
app.get('/api/employees', employeeRoutes.getAllEmployees);
app.post('/api/employees', employeeRoutes.createEmployee);

const PORT = process.env.PORT || 3001;

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
});
