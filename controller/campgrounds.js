const Campground = require('../models/campground')

const mbxGeoCoding =require('@mapbox/mapbox-sdk/services/geocoding');
const mapBoxToken=process.env.MAPBOX_TOKEN;
// const geoCoder=mbxGeoCoding({ accessToken: mapBoxToken });
const {cloudinary}=require('../cloudinary')



module.exports.index =async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds })
}
module.exports.new=(req, res) => {
    res.render('campgrounds/new')
}
module.exports.createNew=async (req, res, next) => {
   const geoData =await geoCoder.forwardGeocode({
        query:req.body.campground.location,
        limit:1
    }).send();
    // console.log(geoData.body.features)
    // res.send('okay done');
    
    
    const campground = new Campground(req.body.campground);
    campground.geometry =geoData.body.features[0].geometry;
    campground.images=req.files.map(f=>({url:f.path,filename:f.filename}));
    campground.author =req.user._id;
    await campground.save();
    console.log(campground)
    req.flash('success','successfully made a new campground');
    res.redirect(`/campgrounds/${campground._id}`);
}
module.exports.show=async (req, res) => {
  
    const campground = await Campground.findById(req.params.id).populate({
        path:'reviews',
        populate:{
            path:'author'
        }
    }).populate('author');
    // console.log(campground)
    if(!campground){
        req.flash('error','Cannot find that campground');
        return res.redirect('/campgrounds');
    }
    // console.log(campground)
    res.render('campgrounds/show', { campground })
}

module.exports.edit =async (req, res) => {

    const campground = await Campground.findById(req.params.id)
    const { id } = req.params;
    if(!campground){
        req.flash('error','Cannot find that campground');
        return res.redirect(`/campgrounds`);
    }
    
 
    res.render('campgrounds/edit', { campground });

}
module.exports.update =async (req, res) => {/**update routes */
    

    // res.send("it worked")
    const { id } = req.params;
    // const campground =await Campground.findById(id);
    console.log(req.body)
    
   
    const camp = await Campground.findByIdAndUpdate(id, { ...req.body.campground })/** ... spread */
    const imgs =req.files.map(f=>({url:f.path,filename:f.filename}));
    camp.images.push(...imgs);
    await camp.save();
    if(req.body.deleteImages){
        for(let filename of req.body.deleteImages){
            await cloudinary.uploader.destroy(filename)
        }
        await camp.updateOne({$pull:{images:{filename:{$in:req.body.deleteImages}}}})
        // console.log(camp)

    }
    req.flash('success','successfully updated the campground')
    res.redirect(`/campgrounds/${camp._id}`)
}
module.exports.delete =async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
}