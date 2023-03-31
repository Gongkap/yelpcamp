const Campground = require('../models/campground')
const Review = require('../models/review.js');

module.exports.createReviews =async (req, res) => {
    // res.send('it worked')
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author =req.user._id;
    campground.reviews.push(review);/** what is the hell review come from and what is its data type. */
    await review.save();
    await campground.save();
    req.flash('success','created new reviews');
    res.redirect(`/campgrounds/${campground._id}`);
}
module.exports.deleteReviews =async (req, res) => {
    const {id,reviewId}=req.params;
    await Campground.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});/** her in the code the $pull is a function from mongo which takes id and pullls out the  item out from the collection or array */
    await Review.findByIdAndDelete(req.params.reviewId);
    // res.send("it worked!!")
    res.redirect(`/campgrounds/${id}`);
}