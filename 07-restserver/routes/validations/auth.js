const { check } = require('express-validator');

const {isValid} = require("../../middlewares/isValid");

const LoginValidators = [
    check('email', 'Email is required').notEmpty(),
    check('password', 'Password is required').notEmpty(),
    isValid
];

const GoogleValidators = [
    check('id_token', 'id_token is required').notEmpty(),
    isValid
]

module.exports = {
    LoginValidators,
    GoogleValidators
}
