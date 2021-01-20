const express = require('express');
const router = express.Router();
const {createUser} = require('../controller/userController');


router.route('/create').get()
                      .post(createUser)



module.exports= router