const {JWTValidator, isValid, isAdmin} = require("../../middlewares");
const {check, param} = require("express-validator");
const {existsProductId, emptyOrNumber, existsCategoryId} = require("../../helpers");

const ProductGetByIdValidators = [
    param('id', 'The id must be a valid Mongo Id').isMongoId(),
    param('id').if(param('id').isMongoId()).custom(existsProductId),
    isValid
];

const ProductPostValidators = [
    JWTValidator,
    check('name', 'The name is required').notEmpty(),
    check('price').custom(emptyOrNumber),
    check('category').isMongoId(),
    check('category').if(check('category').isMongoId()).custom(existsCategoryId),
    check('available').if(check('available').notEmpty()).isBoolean(),
    isValid
];

const ProductPutValidators = [
    JWTValidator,
    param('id', 'The id must be a valid Mongo Id').isMongoId(),
    param('id').if(param('id').isMongoId()).custom(existsProductId),
    check('name', 'The name is required').notEmpty(),
    check('category').isMongoId(),
    check('category').if(check('category').isMongoId()).custom(existsCategoryId),
    check('available').if(check('available').notEmpty()).isBoolean(),
    isValid
];

const ProductDeleteValidators = [
    JWTValidator,
    isAdmin,
    param('id', 'The id must be a valid Mongo Id').isMongoId(),
    param('id').if(param('id').isMongoId()).custom(existsProductId),
    isValid
];

module.exports = {
    ProductDeleteValidators,
    ProductGetByIdValidators,
    ProductPostValidators,
    ProductPutValidators
}
