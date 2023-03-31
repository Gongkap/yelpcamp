const express =require('express');

const passport = require('passport');
const User =require('../models/user')
const users =require('../controller/users')

const router =express.Router();

const catchAsync =require('../utils/catchAsync')


router.get('/register',users.userRegister)
router.post('/register',catchAsync(users.Register))

router.get('/login',users.renderLogin)
router.post('/login',passport.authenticate('local',{failureFlash:true,failureRedirect:'/login'}),users.login)
// router.get('/logout',(req,res)=>{
//     req.logout();
//     req.flash('success',"please do visit again..");
//     res.redirect('/campgrounds');
// })
router.get("/logout", users.logout);
module.exports=router;