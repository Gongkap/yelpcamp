const User =require('../models/user');
const catchAsync =require('../utils/catchAsync')

module.exports.userRegister =(req,res)=>{
    res.render('users/register')
}
module.exports.Register =async(req,res)=>{
    try {
        const {email,username,password}=req.body;
        const user =new User({email,username});
        const registeredUser=await User.register(user,password);
        req.login(registeredUser,err=>{
            if(err) return next(err);
            req.flash('success','welcome to yelp camp');
            res.redirect('/campgrounds');
        })
        // console.log(registeredUser);
       
        
    } catch (e) {
        req.flash('error',e.message);
        res.redirect('register')
    }
    // res.send(req.body);
   
   

}
module.exports.renderLogin=(req,res)=>{
    res.render('users/login')
}
module.exports.login =(req,res)=>{
    req.flash('success','welcome back');
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
    // res.redirect('/campgrounds')
}
module.exports.logout =function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      req.flash('success','please do visit again')
      res.redirect("/campgrounds");
    });
  }