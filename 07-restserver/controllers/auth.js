const bcryptjs = require('bcryptjs');

const {User} = require("../db/models");

const {Errors} = require("../messages");
const {generateJWT} = require("../helpers/generateJWT");


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

module.exports = {
    login
}
