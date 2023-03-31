const { campgroundSchema,reviewSchema} = require('./schemas'); /**joi.... javascript object schema*/
const ExpressError =require('./utils/ExpressError');
const Campground =require('./models/campground');
const { schema } = require('./models/campground');

module.exports.isLoggedIn =(req,res,next)=>{
    // console.log("REQ.USER...",req.user);
    if(!req.isAuthenticated()){
        // strore the url they are requesting
        // console.log(req.path,req.originalUrl)
        req.session.returnTo =req.originalUrl;
        req.flash('error','please login');
        return res.redirect('/login')
    }
    next();
}
// making separate function  this is actucallly the joi shit... but making it a middleware functions
module.exports.validateCampground = (req, res, next) => {

    // const campgroundSchema =Joi.object({
    //     campground:Joi.object({
    //         title:Joi.string().required(),
    //         price:Joi.number().required().min(0),
    //         image:Joi.string().required(),
    //         location:Joi.string().required(),
    //         description:Joi.string().required(),
    //     }).required()

    // })
    // this block of code to be written on separate file
    const { error } = campgroundSchema.validate(req.body);/**destructuring .. */
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    }
    else {
        next();
    }
}
module.exports.validateReview =(req,res,next)=>{
    const{ error }=reviewSchema.validate(req.body);/** here the validate function comes from our joi framwork.. which help in validating the form */
    if (error) {
        console.log(error)
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    }
    else {
        next();
    }
}
module.exports.isAuthor =async(req,res,next)=>{
    const {id}=req.params;
    const campground =await Campground.findById(id);
    if(!campground.author.equals(req.user._id)){
        req.flash('error',"you don't have the permision to do that")
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}

module.exports.validateReview =(req,res,next)=>{
    const{ error }=reviewSchema.validate(req.body);/** here the validate function comes from our joi framwork.. which help in validating the form */
    if (error) {
        console.log(error)
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    }
    else {
        next();
    }
}