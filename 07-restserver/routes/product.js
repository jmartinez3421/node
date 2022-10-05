const { Router } = require('express');
const {getAllProducts, getProductById, createProduct, updateProduct, deleteProduct} = require("../controllers/product");
const {ProductGetByIdValidators, ProductPostValidators, ProductPutValidators, ProductDeleteValidators} = require("./validations/product");

const router = Router();

//Get all products - Public
router.get('/', getAllProducts);

//Get a category by ID - Public
router.get('/:id', ProductGetByIdValidators, getProductById);

//Create - Private - All roles
router.post('/', ProductPostValidators, createProduct);

//Update - Private - All roles
router.put('/:id', ProductPutValidators, updateProduct);

//Delete - Private - Admin role
router.delete('/:id', ProductDeleteValidators, deleteProduct);

module.exports = router;
