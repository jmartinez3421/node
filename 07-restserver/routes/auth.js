const { Router } = require('express');

const {login, googleLogin} = require("../controllers/auth");
const {LoginValidators, GoogleValidators} = require("./validations/auth");

const router = Router();

router.post('/login', LoginValidators, login);

router.post('/google', GoogleValidators, googleLogin);

module.exports = router;
