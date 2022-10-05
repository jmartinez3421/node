const Errors = require('../messages');
const { Product, Category} = require('../db/models');

const getAllProducts = async (req, res) => {
    const {limit, from} = req.body;
    const status = true;

    try{
        const [products, totalProducts] = await Promise.all([
            Product.find({status})
                .skip(from)
                .limit(limit)
                .populate('user', 'name')
                .populate('category', 'name', Category),
            Product.count({status})
        ]);

        res.json({
            totalProducts,
            products
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            msg: Errors.serverError
        })
    }

}

const getProductById = async (req, res) => {

    const id = req.params.id;

    try{
        const product = await Product.findById(id)
            .populate('user', 'name')
            .populate('category', 'name', Category);

        res.json({
            product
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            msg: Errors.serverError
        })
    }

}

const createProduct = async (req, res) => {

    const user = req.loggedUser;
    console.log(user);
    const name = req.body.name.toUpperCase();
    const { price = 0, category, description = '', available = true } = req.body;

    try{
        const productExists = await Product.findOne({name});
        if(productExists){
            return res.status(400).json({
                msg: `Product ${name} alredy exists`
            });
        }

        const data = {
            name,
            price,
            user,
            category,
            description,
            available
        };

        const product = new Product(data);

        await product.save();

        res.json({
            msg: 'Product created',
            product
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            msg: Errors.serverError
        })
    }

}

const updateProduct = async (req, res) => {

    const id = req.params.id;
    const { status, user, ...data } = req.body;

    if(data.name) data.name = data.name.toUpperCase();
    data.user = req.loggedUser.uid;

    try{
        const alredyExists = await Product.findOne({name: data.name});
        if(alredyExists){
            return res.status(400).json({
                msg: `Product ${data.name} already exists`
            });
        }

        const product = await Product.findByIdAndUpdate(id, data, {new: true});

        res.json({
            msg: 'The product has been updated',
            product
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            msg: Errors.serverError
        })
    }

}

const deleteProduct = async (req, res) => {

    const id = req.params.id;

    try{
        const {name} = await Product.findByIdAndUpdate(id, {status: false});

        res.json({
            msg: `The product ${name} has been deleted`
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            msg: Errors.serverError
        })
    }

}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}
