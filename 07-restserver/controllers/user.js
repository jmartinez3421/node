const { response } = require('express');

const getUser = (req, res= response) => {

    const { q, name = 'No name', apiKey, page = 1, limit = 10 } = req.query;

    res.status(200).json({
        msg: 'get API - Controller',
        q,
        name,
        apiKey,
        page,
        limit
    });
}

const putUser = (req, res= response) => {

    //Always comes as a String
    const { id } = req.params;

    res.status(200).json({
        msg: 'put API - Controller',
        id
    });
}

const postUser = (req, res= response) => {

    const { name, age } = req.body;

    res.status(200).json({
        msg: 'post API - Controller',
        name,
        age
    });
}

const deleteUser = (req, res= response) => {
    res.status(200).json({
        msg: 'delete API - Controller'
    });
}

module.exports = {
    getUser,
    putUser,
    postUser,
    deleteUser
}
