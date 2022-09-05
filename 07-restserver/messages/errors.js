
const Errors = {
    createUser: 'There was an error creating the user. Try again or contact the administrator',
    emailExists: 'This email is already registered',
    serverError: 'There was an error on the server, please try again or contact the administrator',
    emailOrPass: 'The email or password is incorrect',
    jwtGenError: `The token couldn't be generated`,
    noJwt: `There is no token in the petition`,
    invalidJwt: `Invalid token`
}

module.exports = Errors;
