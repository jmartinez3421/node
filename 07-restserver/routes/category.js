const {Router} = require('express');
const {getCategories, getCategoryById, createCategory, updateCategory, deleteCategory} = require("../controllers/category");
const {CategoryPostValidators, CategoryGetByIdValidators, CategoryPutValidators, CategoryDeleteValidators} = require("./validations/category");

const router = Router();

//Get all categories - Public
router.get('/', getCategories);

//Get a category by ID - Public
router.get('/:id', CategoryGetByIdValidators, getCategoryById);

//Create - Private - All roles
router.post('/', CategoryPostValidators, createCategory);

//Update - Private - All roles
router.put('/:id', CategoryPutValidators, updateCategory);

//Delete - Private - Admin role
router.delete('/:id', CategoryDeleteValidators, deleteCategory);

module.exports = router;
