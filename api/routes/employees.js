const express = require('express');
const sqlite = require('sqlite3');

const router = express.Router();

const db = new sqlite.Database('./database.db');
db.run("CREATE TABLE IF NOT EXISTS employees(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)");

//get all employees from 'employees'
router.get('/all/', (req, res, next) => {
    db.all("SELECT * FROM employees", function (err, employees) {
        if (err) throw err;
        res.status(200).json({
            employees
        });
    });
});

//get especific employee from 'employees' based on id
router.get('/find/:employeeId', (req, res, next) => {
    const employeeId = req.params.employeeId;

    db.all("SELECT * FROM employees WHERE id = (?)", [employeeId], function (err, employees) {
        if (err) throw err;
        res.status(200).json({
            employees
        });
    });
});

//insert new employee in 'employees'
router.post('/', (req, res, next) => {
    const newEmployeeName = req.body.name;

    db.all("INSERT INTO employees (name) VALUES (?)", [req.body.name], function (err) {
        if (err) throw err;
        res.status(201).json({
            message: 'Employee was created',
            employee: newEmployeeName
        });
    });
});

//delete especific employee from 'employees' based on id
router.delete('/delete/:employeeId', (req, res, next) => {
    const employeeId = req.params.employeeId;

    db.all("DELETE FROM employees WHERE id = (?)", [employeeId], function (err, employees) {
        if (err) throw err;
        res.status(200).json({
            message: 'Employee was deleted',
            employeeId: employeeId
        });
    });
});

module.exports = router;