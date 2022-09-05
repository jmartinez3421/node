const {check, param, query} = require('express-validator')

const {emptyOrRole, emptyOrStrongPassword, emptyOrNumber, validRole, existsEmail, existsId} = require("../../helpers");
const {isValid, JWTValidator, isAdmin, hasRole} = require("../../middlewares");

const UserPostValidators = [
    check('name', 'The name is required').notEmpty(),
    check('password', 'The password must have 8 characters, 1 Lowercase, 1 Uppercase, 1 number and 1 symbol').isStrongPassword(),
    check('email', 'The email is not valid').isEmail(),
    check('email').custom(existsEmail),
    check('role').custom(validRole),
    // check('role', 'Is not a valid role').isIn(['ADMIN_ROLE', 'USER_ROLE'])
    isValid
];

const UserPutValidators = [
    JWTValidator,
    //TODO: The user can only be modified by itself or by the admin
    param('id', 'The id must be a valid Mongo Id').isMongoId(),
    param('id').custom(existsId),
    check('password').custom(emptyOrStrongPassword),
    check('role').custom(emptyOrRole),
    isValid
];

const UserGetValidators = [
    JWTValidator,
    isAdmin,
    query('limit', ).custom(emptyOrNumber),
    query('from', ).custom(emptyOrNumber),
    isValid
];

const UserDeleteValidators = [
    JWTValidator,
    // isAdmin,
    hasRole('ADMIN_ROLE'),
    param('id', 'The id must be a valid Mongo Id').isMongoId(),
    param('id').if(param('id').isMongoId()).custom(existsId),
    isValid
];

module.exports = {
    UserPostValidators,
    UserPutValidators,
    UserGetValidators,
    UserDeleteValidators
}
