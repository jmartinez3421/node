const {model} = require('mongoose');
const UserSchema = require('./schemas/userSchema');

//Hide the password and the version of the Object User
UserSchema.methods.toJSON = function () {
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;
}

const User = model('User', UserSchema);

module.exports = User;
