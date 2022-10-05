const {model} = require('mongoose');
const ProductSchema = require('./schemas/productSchema');

ProductSchema.methods.toJSON = function() {
    const { __v, _id, ...product } = this.toObject();
    const { __v: v2, _id: id2, password, ...user} = product.user;
    const { __v: v3, _id: id3, ...category} = product.category;
    product.uid = _id;
    user.uid = id2;
    product.user = user;
    category.uid = id3;
    product.category = category;
    return product;
}

const Product = model('product', ProductSchema);

module.exports = Product;
