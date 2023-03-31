if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}
// console.log(process.env.SECRET);

const express = require('express')
const mongoose = require('mongoose');
const app = express();
const path = require('path')
const ejsMate = require('ejs-mate')
// const Joi =require('joi');/**wer are importing ..from schemas */
const { campgroundSchema,reviewSchema} = require('./schemas.js');
const ExpressError = require('./utils/ExpressError')
const methodOverride = require('method-override')
const Campground = require('./models/campground')
const catchAsync = require('./utils/catchAsync');
const Review = require('./models/review.js');
const passport =require('passport');
const localStrategy =require('passport-local')
const User =require('./models/user')


const userRoutes=require('./routes/users')
const campgroundsRoutes =require('./routes/campgrounds')
const reviewsRoutes=require('./routes/reviews');
const session = require('express-session');
const flash =require('connect-flash');
const { register } = require('./models/review.js');




/**put and patch are the method in sever side scripting which allow dyanmic .. and it can only be used after we install method override ... */

/**catach.. do remember to separated use the project database to update the data in the current application..  */
/**  be care full with the extra whitespace in your routing code while  routing your files */


main().catch(err => console.log(err));/**this block of code is for connecting our data base with mongoose...
that is connectin our mongod with mongoose */

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
    console.log("ok connection successfull")

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.set('view engine', 'ejs');/**embedded javascript templating */
app.set('views', path.join(__dirname, 'views'))/**this is a absolute path.. */


app.engine('ejs', ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname,'public')))



const sessionConfig={
    secret:'mynamiskhanandimnotanterrorist',
    resave:false,
    saveUninitialized:true,
    cookie:{
        httpOnly:true,
        expires:Date.now()+1000 *60*60*24*7,
        maxAge:1000 *60*60*24*7,
    }
    
}

app.use(session(sessionConfig))
app.use(flash())


app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{/**middle ware lines of code */
    // console.log(req.session)
    res.locals.currentUser=req.user;
    res.locals.success =req.flash('success');
    res.locals.error =req.flash('error');
    next();
})

app.use('/',userRoutes);
app.use('/campgrounds',campgroundsRoutes)
app.use('/campgrounds/:id/reviews',reviewsRoutes)
// route for home page



app.get('/', (req, res) => {/** this is a basic routing .. used for requresting and responding to sever */
    res.render('home')/**render used for rendering the page .. from the */
})
app.all('*', (req, res, next) => {
    // res.send('494...')
    next(new ExpressError('page not found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500, message = 'something went wrong' } = err;
    if (!err.message) err.message = "oh no something went wrong"
    res.status(statusCode).render('error', { err })
})

app.listen(3000, () => {/** this is starting the local server. from my laptop */
    console.log("servin on port 3000")
});