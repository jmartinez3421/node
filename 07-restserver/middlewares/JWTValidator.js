const jwt = require('jsonwebtoken')
const {Errors} = require("../messages");
const {User} = require("../db/models");

const JWTValidator = async (req, res, next) => {

    const token = req.header('X-Auth');

    if (!token) {
        return res.status(401).json({
            msg: Errors.noJwt
        })
    }

    try {
        const {uid} = jwt.verify(token, process.env.JWT_KEY);

        //Get the logged user information
        const loggedUser = await User.findById(uid);

        //Verify if the user exists
        if(!loggedUser){
            throw new Error('No user with this uid');
        }

        //Verify if the user is active
        if(!loggedUser.status){
            throw new Error('The user is inactive')
        }

        req.uid = uid;
        req.loggedUser = loggedUser;
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({
            msg: Errors.invalidJwt
        })
    }
}

module.exports = JWTValidator;
