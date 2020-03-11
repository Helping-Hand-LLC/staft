const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { privateKey } = require('../config/keys');

// TODO: format validation
const workerSchema = new mongoose.Schema({
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
        required: true,
        unique: true
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
    isAdmin: {
        type: Boolean,
        default: false
    },
    driversLicense: String,
    w9: String,
    w4: String,
    i9: String
});
// TODO: (later) custom yes/no, short answer, long answer questions to add to profile

workerSchema.methods.generateAuthToken = () => {
    jwt.sign({ 
        _id: this._id,
        isManager: this.isManager,
        isAdmin: this.isAdmin
    }, privateKey, { expiresIn: '2 days' }, (err, token) => {
        if (err) return console.error(err);
        return token;
    });
}

const Worker = mongoose.model('Worker', workerSchema);

const validate = (worker) => {
    const { email, phone, password, passwordConfirm } = worker;
    let errors = [];

    // check all required fields
    if (!email || !phone || !password || !passwordConfirm) {
        errors.push({ msg: 'Please fill in all fields.' });
    }

    // check password match
    if (password !== passwordConfirm) {
        errors.push({ msg: 'Passwords do not match.' });
    }

    // check password min length
    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters.' });
    }

    return errors;
}

const findExisting = (worker) => {
    let errors = [];

    // find existing worker
    Worker.findOne({ email: worker.email })
        .then(res => {
            if (res) {
                // req.flash('error_msg', 'Email already registered.');
                errors.push({ msg: 'Email already registered.' });
            }
        });

    return errors;
}

module.exports = {
    Worker,
    validate,
    findExisting
};