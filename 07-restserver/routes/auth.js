const { Router } = require('express');

const {login} = require("../controllers/auth");
const {LoginValidators} = require("./validations/auth");

const router = Router();

router.post('/login', LoginValidators, login);

module.exports = router;
