const {Errors} = require("../messages");
const {Category, User} = require("../db/models");

const getCategories = async (req, res) => {

    const { limit = 5, from = 0 } = req.query;
    const status = true;

    try{
        const [categories, numberOfCategories] = await Promise.all([
            Category.find({status})
                .skip(from)
                .limit(limit)
                .populate('user', 'name', User),
            Category.count({status})
        ]);

        res.json({
            numberOfCategories,
            categories
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            msg: Errors.serverError
        });
    }

}

const getCategoryById = async (req, res) => {

    const { id } = req.params;

    try{
        const category = await Category.findById(id).populate('user', 'name');

        res.json({
            category
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            msg: Errors.serverError
        });
    }

}

const createCategory = async (req, res) => {

    const name = req.body.name.toUpperCase();

    try{
        const categoryDB = await Category.findOne({name});
        if(categoryDB){
            return res.status(400).json({
                msg: `Category ${name} already exists`
            });
        }

        const data = {
            name,
            user: req.loggedUser._id
        }

        const category = new Category(data);

        await category.save();

        res.json({
            msg: 'Category created',
            category
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            msg: Errors.serverError
        });
    }
}


const updateCategory = async (req, res) => {

    const id = req.params.id;
    const name = req.body.name.toUpperCase();

    try{
        const alredyExists = await Category.findOne({name});
        if(alredyExists){
            return res.status(400).json({
                msg: `Category ${name} already exists`
            });
        }

        const category = await Category.findByIdAndUpdate(id, {name, user: req.loggedUser.uid}, {new: true});

        res.json({
            msg: 'The category has been updated',
            category
        })

    }catch(err){
        console.log(err);
        res.status(500).json({
            msg: Errors.serverError
        });
    }

}

//Soft delete
const deleteCategory = async (req, res) => {

    const id = req.params.id;

    try{
        const category = await Category.findByIdAndUpdate(id, {status: false});

        res.json({
            msg: `The category ${category.name} has been deleted`
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            msg: Errors.serverError
        });
    }

}

module.exports = {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
}
