const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Employee = sequelize.define('Employee', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    position: {
        type: DataTypes.STRING,
    },
});

module.exports = Employee;