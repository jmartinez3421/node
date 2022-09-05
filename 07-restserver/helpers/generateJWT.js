const jwt = require('jsonwebtoken');
const {Errors} = require("../messages");


const generateJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = {uid};

        jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if(err){
                console.log(err);
                reject(Errors.jwtGenError);
            }else{
                resolve(token);
            }
        })
    });
}

module.exports = {
    generateJWT
}
