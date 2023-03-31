const express =require('express');
const router =express.Router();


const catchAsync = require('../utils/catchAsync');
const { campgroundSchema} = require('../schemas.js');
const {isLoggedIn,isAuthor,validateCampground}=require('../middleware')
const campgrounds =require('../controller/campgrounds')

const ExpressError = require('../utils/ExpressError')
const Campground = require('../models/campground')



const {cloudinary}=require('../cloudinary')

const multer  = require('multer');
const {storage} =require('../cloudinary')
const upload = multer({ storage })



router.get('/', catchAsync(campgrounds.index));
router.get('/new', isLoggedIn,campgrounds.new)
router.post('/',isLoggedIn,upload.array('image'), validateCampground, catchAsync(campgrounds.createNew))
// router.post('/',upload.array('image'),(req,res)=>{
//     // res.send(req.body,req.file)
//     console.log(req.body,req.files)
//     res.send('it worked')
// })

router.get('/:id', catchAsync(campgrounds.show))
router.get('/:id/edit',isLoggedIn,isAuthor, catchAsync(campgrounds.edit))
router.put('/:id',isLoggedIn,upload.array('image'), validateCampground, catchAsync(campgrounds.update))
router.delete('/:id', catchAsync(campgrounds.delete))



module.exports=router;