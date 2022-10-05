const { check, param } = require('express-validator');
const {JWTValidator, isValid, isAdmin} = require("../../middlewares");
const {existsCategoryId} = require("../../helpers");

const CategoryPostValidators = [
    JWTValidator,
    check('name', 'The name is required').notEmpty(),
    isValid
];

const CategoryGetByIdValidators = [
    param('id', 'The id must be a valid Mongo Id').isMongoId(),
    param('id').if(param('id').isMongoId()).custom(existsCategoryId),
    isValid
];

const CategoryPutValidators = [
    JWTValidator,
    param('id', 'The id must be a valid Mongo Id').isMongoId(),
    param('id').if(param('id').isMongoId()).custom(existsCategoryId),
    check('name', 'The name is required').notEmpty(),
    isValid
];

const CategoryDeleteValidators = [
    JWTValidator,
    isAdmin,
    param('id', 'The id must be a valid Mongo Id').isMongoId(),
    param('id').if(param('id').isMongoId()).custom(existsCategoryId),
    isValid
];

module.exports = {
    CategoryPostValidators,
    CategoryGetByIdValidators,
    CategoryPutValidators,
    CategoryDeleteValidators
}
