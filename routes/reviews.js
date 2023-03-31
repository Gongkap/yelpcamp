const express = require('express')

const { validateReview, isAuthor, isLoggedIn} = require('../middleware');
const ExpressError = require('../utils/ExpressError')
const router =express.Router({mergeParams:true});

const Campground = require('../models/campground')
const catchAsync = require('../utils/catchAsync');
const Review = require('../models/review.js');
const review=require('../controller/reviews')
// const router = require('../campgrounds.js');

router.post('/',isLoggedIn, validateReview,catchAsync(review.createReviews))
/// route for deleting the reviews
// router.delete('/campgrounds/:id/reviews/:reviewId',catchAsync(async(req,res)=>{
//     res.send("delete mee!!");
// }))
router.delete('/:reviewId',isLoggedIn,isAuthor, catchAsync(review.deleteReviews))
module.exports =router;