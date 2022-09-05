const {validRole} = require("./db-validators");

const emailRegExp = /^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const emptyOrNumber = async( obj ) => {
    if(obj && isNaN(obj)){
        throw new Error(`Must be a number`);
    }
}

const emptyOrEmail = async( obj ) => {
    if(obj){
        const isEmail = emailRegExp.test(obj);
        if(!isEmail){
            throw new Error(`The email ${obj} is not valid`);
        }
    }
}

const emptyOrRole = async( obj ) => {
    if(obj){
        await validRole(obj);
    }
}

const emptyOrStrongPassword = async( obj ) => {
    if(obj){
        const isStrongPassword = passwordRegExp.test(obj);
        if(!isStrongPassword){
            throw new Error(`The password must have 8 characters, 1 Lowercase, 1 Uppercase, 1 number and 1 symbol`);
        }
    }
}

module.exports = {
    emptyOrStrongPassword,
    emptyOrRole,
    emptyOrEmail,
    emptyOrNumber
}
