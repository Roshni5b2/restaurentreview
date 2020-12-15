const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Userdata = new Schema({
    fullname: {
        type: String,
        required: 'name cannot be empty',
        match:/^[A-Za-z]+([\s][A-Za-z]+)*$/
    },
    email: {
        type: String,
        required: 'Email cannot be empty',
        unique: true,
        match:/^(([A-Za-z0-9]+_+)|([A-Za-z0-9]+\-+)|([A-Za-z0-9]+\.+)|([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+\-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,6}$/
    },
    age: {
        type: Number,
        required: 'age cannot be empty!'
    },
    phonenumber: {
        type: Number,
        required: 'phoonenumber cannot be empty'
    },
    address: {
        type: String,
        required: 'address cannot be empty'
    },
    password: {
        type: String,
        required: 'password cannot be empty'
    },
    favouritebars: {
        type: [String]
    },
    resetLink: {
        data: String,
        default:''
    }
});

const User= mongoose.model('Userdata',Userdata);
module.exports = User;