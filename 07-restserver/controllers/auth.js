const bcryptjs = require('bcryptjs');

const {User} = require("../db/models");

const {Errors} = require("../messages");
const {generateJWT} = require("../helpers/generateJWT");
const {googleVerify} = require("../helpers/google-verify");


const login = async (req, res) => {

    const {email, password} = req.body;

    try {

        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({
                msg: Errors.emailOrPass
            })
        }

        if (!user.status) {
            return res.status(400).json({
                msg: Errors.emailOrPass
            })
        }

        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: Errors.emailOrPass
            })
        }

        const token = await generateJWT(user.id);

        res.json({
            token
        })
    } catch (err) {
        return res.status(500).json({
            msg: Errors.serverError
        })
    }
}

const googleLogin = async (req, res) => {

    const { id_token } = req.body;

    try{
        const {name, img, email} = await googleVerify(id_token);

        let user = await User.findOne({email});
        if(!user){
            //Create a new user
            const data = {
                name,
                email,
                password: ':)',
                img,
                google: true
            };

            user = new User(data);
            await user.save();
        }

        if(!user.status){
            return res.status(401).json({
                msg: Errors.inactive
            })
        }

        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        });
    }catch(err){
        console.log(err);
        res.status(400).json({
            msg: Errors.invalidJwt
        })
    }


}

module.exports = {
    login,
    googleLogin
}
