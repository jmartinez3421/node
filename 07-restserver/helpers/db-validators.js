const bcryptjs = require('bcryptjs');

const {Role, User} = require("../db/models");

const validRole = async(role = '') => {
    const roleExists = await Role.findOne({role});
    if(!roleExists){
        throw new Error(`The role ${role} doesn't exists in the DB`);
    }
}

const existsEmail = async(email = '') => {
    const emailExists = await User.findOne({ email });
    if(emailExists){
        throw new Error(`The email ${email} is already registered`);
    }
}

const noExistsEmail = async(email = '') => {
    const emailExists = await User.findOne({ email });
    if(!emailExists){
        throw new Error(`The email ${email} doesn't exists`);
    }
}

const existsId = async(id = '') => {
    const existsId = await User.findById(id);
    if(!existsId){
        throw new Error(`The id ${id} doesn't exists`);
    }
}

const checkUserPassword = async(password = '', user) => {
    //TODO: When we have the JWT we check if the password is the same that we have in the server
    const validPassword = bcryptjs.compareSync(password, user);
    if(!validPassword){
        throw new Error(`The password doesn't match`);
    }
}

module.exports = {
    validRole,
    existsEmail,
    noExistsEmail,
    existsId
}
