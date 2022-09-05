const { check } = require('express-validator');

const {isValid} = require("../../middlewares/isValid");

const LoginValidators = [
    check('email', 'Email is required').notEmpty(),
    check('password', 'Password is required').notEmpty(),
    isValid
];

module.exports = {
    LoginValidators
}
