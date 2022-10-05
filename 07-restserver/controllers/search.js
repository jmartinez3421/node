const {User, Category, Product} = require("../db/models");
const {ObjectId} = require('mongoose').Types;

const collections = [
    'categories',
    'products',
    'users',
    'roles'
];

const searchUsers = async (queries, res) => {
    const { id, name = '.*', email = '.*', role = '.*', status = true, google} = queries;

    if(id){
        const isMongoId = ObjectId.isValid(id);
        if(isMongoId){
            const user = await User.findById(id);
            return res.json({
                results: (user && user.status) ? [user] : []
            });
        }
    }

    const query = {
        name: new RegExp(name, 'i'),
        email: new RegExp(email, 'i'),
        role: new RegExp(role, 'i'),
        google,
        status
    };

    if(google !== undefined) delete query.google;

    const users = await User.find(query);

    return res.json({
        results: users
    });
}

const searchCategories = async (queries, res) => {
    const { id, name = '.*', user, status = true} = queries;

    if(id){
        const isMongoId = ObjectId.isValid(id);
        if(isMongoId){
            const category = await Category.findById(id).populate('user', 'name');
            return res.json({
                results: (category && category.status) ? [category] : []
            });
        }
    }

    const query = {
        name: new RegExp(name, 'i'),
        user,
        status
    }

    if(!user || !ObjectId.isValid(user)) delete query.user;

    const categories = await Category.find(query).populate('user', 'name');

    return res.json({
        results: categories
    });
}

const searchProducts = async (queries, res) => {
    const { id, name = '.*', user, status = true, price, category, description = '.*', available, greaterThan, lessThan} = queries;

    if(id){
        const isMongoId = ObjectId.isValid(id);
        if(isMongoId){
            const product = await Product.findById(id).populate('user', 'name');
            return res.json({
                results: (product && product.status) ? [product] : []
            });
        }
    }

    const query = {
        name: new RegExp(name, 'i'),
        description: new RegExp(description, 'i'),
        price,
        category,
        available,
        user,
        status
    }

    if(!user || !ObjectId.isValid(user)) delete query.user;
    if(!user || !ObjectId.isValid(category)) delete query.category;
    if(available === undefined) delete query.available;

    if(greaterThan && lessThan){
        query.price = {
            $gt: greaterThan,
            $lt: lessThan
        }
    }else if(greaterThan){
        query.price = {
            $gt: greaterThan
        }
    }else if(lessThan){
        query.price = {
            $lt: lessThan
        }
    }
    if(!price && !greaterThan && !lessThan) delete query.price;

    const categories = await Product.find(query)
        .populate('user', 'name')
        .populate('category', 'name', Category);

    return res.json({
        results: categories
    });
}

const search = (req, res) => {

    const { collection } = req.params;
    const queries = req.query;

    if(!collections.includes(collection)){
        return res.status(400).json({
            msg: `${collection} is not a collection, you can search: ${collections.join(', ')}.`
        });
    }

    switch(collection){
        case 'users':
            searchUsers(queries, res);
            break;

        case 'categories':
            searchCategories(queries, res);
            break;

        case 'products':
            searchProducts(queries, res);
            break;

        case 'roles':
            break;

        default:
            res.status(500).json({
                msg: `I haven't done this search call ${collection}`
            });
    }
}

module.exports = {
    search
}
