const {Router} = require('express');
const { signUp } = require('../controller/user.controller');

const router = Router();

router.post('/sign-up' , signUp);

module.exports = router