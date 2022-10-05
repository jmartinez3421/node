const {model} = require('mongoose');
const CategorySchema = require('./schemas/categorySchema');

CategorySchema.methods.toJSON = function() {
    const { _id, __v, ...category } = this.toObject();
    category.uid = _id;
    category.user.uid = category.user._id;
    delete category.user._id;
    return category;
}

const Category = model('Category', CategorySchema);

module.exports = Category;
