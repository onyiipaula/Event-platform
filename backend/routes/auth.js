const express = require('express');
const router = express.Router();
const {body} = require ('express-validator');
const authenticateToken = require('../middleware/usermiddleware')
const {register, login, forgotPassword, resetPassword} = require ('../controllers/authentication');

//protected routes

router.get('/profile', authenticateToken, (req, res)=>{
    res.json({user: req.user})
})

router.post('/register', [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({min: 6})
], register);

router.post('/login',[
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty()
], login);



router.post('/forgot-password',[
    body('email').isEmail().normalizeEmail()
],forgotPassword);

router.post('/reset-password',[
    body('token').notEmpty(),
    body('password').isLength({min: 6})
],resetPassword);



module.exports = router;
