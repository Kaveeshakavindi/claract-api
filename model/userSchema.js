const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {isEmail} = require ('validator');

const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password:{
        type: String,
        required: [true, 'Please enter a valid password'],
        minlength:[6, 'Minimum pasword length must be 6 characters']
    },
    register_date:{
        type: Date,
        default: Date.now
    }
})

module.exports = User - mongoose.model('user', UserSchema);