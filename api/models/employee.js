const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String
});

module.exports = mongoose.model('Employee', employeeSchema);