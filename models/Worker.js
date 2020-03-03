const mongoose = require('mongoose');

// TODO: format validation
const workerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: String,
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    birthday: Date,
    gender: {
        type: String,
        enum: ['male', 'female', 'n/a']
    },
    ssn: {
        type: String,
        // TODO: encrypt?
    },
    isManager: {
        type: Boolean,
        default: false
    },
    driversLicense: String,
    w9: String,
    w4: String,
    i9: String
});
// TODO: (later) custom yes/no, short answer, long answer questions to add to profile

const Worker = mongoose.Model('Worker', workerSchema);

module.exports = Worker;