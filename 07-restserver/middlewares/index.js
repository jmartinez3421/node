const isValid = require('./isValid');
const JWTValidator = require('./JWTValidator');
const checkRoles = require('./checkRoles');

module.exports = {
    ...isValid,
    JWTValidator,
    ...checkRoles
}
