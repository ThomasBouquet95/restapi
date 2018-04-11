const mongoose = require('mongoose');
const Schema = mongoose.Schema;



var userSchema = new Schema({
    firstName: String,
    lastName: String,
    userName: String,
    publicAddress: String,
    password: String,
    userType: String
});

userSchema.methods.validPassword = function(password){
    return this.password == password;
};

module.exports = mongoose.model('user', userSchema);