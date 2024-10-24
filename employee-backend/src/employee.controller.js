const Employee = require('./employee.model');

exports.getAllEmployees = async (req, res) => {
    const employees = await Employee.findAll();
    res.json(employees);
};

exports.createEmployee = async (req, res) => {
    const { name, email, position } = req.body;
    const employee = await Employee.create({ name, email, position });
    res.json(employee);
};
