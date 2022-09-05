const {response} = require('express');

const {User} = require('../db/models');
const { Correct, serverErrorResponse } = require('../messages');
const {cryptPassword} = require("../helpers");

const getUser = async (req, res = response) => {

    const {limit = 5, from = 0} = req.query;
    const status = true;

    try{
        const [numberOfUsers, users] = await Promise.all([
            User.countDocuments({status}),
            User.find({status})
                .skip(Number(from))
                .limit(Number(limit))
        ]);

        res.status(200).json({
            numberOfUsers,
            users
        });
    }catch (err){
        console.log(err);
        serverErrorResponse(res);
    }
}

const putUser = async (req, res = response) => {

    //Always comes as a String
    const {id} = req.params;

    const {_id, newPassword, google, email, ...other} = req.body;

    try{
        if (newPassword) {
            other.password = cryptPassword(newPassword);
        }

        const user = await User.findByIdAndUpdate(id, other);

        res.status(200).json({
            msg: Correct.updateUser,
            user
        });
    }catch(err){
        console.log(err);
        serverErrorResponse(res);
    }
}

const postUser = async (req, res = response) => {

    const {name, email, password, role} = req.body;

    try {
        const user = new User({name, email, password, role});

        user.password = cryptPassword(password);

        //Save the user in DB
        await user.save();

        res.status(200).json({
            msg: Correct.createUser,
            user
        });

    } catch (err) {
        console.log(err);
        serverErrorResponse(res);
    }
}

const deleteUser = async (req, res = response) => {

    const {id} = req.params;

    try {
        const user = await User.findByIdAndUpdate(id, {status: false});

        res.status(200).json({
            msg: Correct.deleteUser,
        });
    } catch (err) {
        console.log(err);
        serverErrorResponse(res);
    }


}

module.exports = {
    getUser,
    putUser,
    postUser,
    deleteUser
}
