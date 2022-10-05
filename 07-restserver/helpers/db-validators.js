const bcryptjs = require('bcryptjs');

const {Role, User, Category, Product} = require("../db/models");

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

const existsUserId = async(id = '') => {
    const existsId = await User.findById(id);
    if(!existsId){
        throw new Error(`The id ${id} doesn't exists`);
    }
}

const existsCategoryId = async(id = '') => {
    const existsId = await Category.findById(id);
    if(!existsId){
        throw new Error(`The id ${id} doesn't exists`);
    }
}

const existsProductId = async(id = '') => {
    const existsId = await Product.findById(id);
    if(!existsId){
        throw new Error(`The id ${id} doesn't exists`);
    }
}

module.exports = {
    validRole,
    existsEmail,
    noExistsEmail,
    existsUserId,
    existsCategoryId,
    existsProductId
}
