const express =require('express');
const myFunctions=require('../controllers/usersController')
const router = express.Router();

// users Routes
router.post('/signup',myFunctions.createUser);
router.post('/login', myFunctions.siginUser);

module.exports= router;