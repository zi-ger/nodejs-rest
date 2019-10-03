const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Employee = require('../models/employee');

//get all employees
router.get('/all/', (req, res, next) => {
    Employee.find().exec().then(employess => {
        res.status(200).json({ employess });
    }).catch(err => {
        res.status(500).json({ error: err });
    });
});

//get especific employee based on id
router.get('/find/:employeeId', (req, res, next) => {
    const employeeId = req.params.employeeId;

    Employee.findById(employeeId).exec().then(employee => {
        if (employee) {
            res.status(200).json({ employee });
        } else {
            res.status(404).json({ message: 'ID not found.' });
        }
    }).catch(err => {
        res.status(500).json({ error: err });
    });
});

//insert new employee
router.post('/', (req, res, next) => {
    const newEmployee = new Employee({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name
    });

    newEmployee.save().then(result => {
        res.status(201).json({
            message: 'Employee was created',
            employee: newEmployee
        });
    }).catch(err => {
        res.status(500).json({ error: err });
    });
});

//update especific employee based on id
router.patch('/update/:employeeId', (req, res, next) => {
    const employeeId = req.params.employeeId;
    const newEmployeeName = req.body.newEmployeeName

    Employee.updateOne({ _id: employeeId }, { $set: { name: newEmployeeName } }).exec().then(result => {
        res.status(200).json({
            message: "Employee was updated.",
            updatedEmployeeId: employeeId,
            newEmployeeName: newEmployeeName
        });
    }).catch(err => {
        res.status(500).json({ error: err });
    });
});

//delete especific employee based on id
router.delete('/delete/:employeeId', (req, res, next) => {
    const employeeId = req.params.employeeId;

    Employee.deleteOne({ _id: employeeId }).exec().then(result => {
        res.status(200).json({
            message: "Employee was deleted.",
            deletedEmployeeId: employeeId
        });
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;