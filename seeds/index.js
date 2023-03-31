const mongoose = require('mongoose');
const Campground = require('../models/campground');

const { places, descriptors } = require('./seedHelper')
const cities = require('./cities');

main().catch(err => console.log(err));/**this block of code is for connecting our data base with mongoose...
that is connectin our mongod with mongoose */

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
    console.log("seed data base is connected")

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const sample = (array) => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    // const c =new Campground({title:'purple field'})
    // await c.save();
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000) + 1;
        const price = Math.floor(Math.random() * 50) + 10;
        const camp = new Campground({
            author:'6417599dafe6aefd8a7ce5ca',
            location: `${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)}${sample(places)}`,
            // image:`https://source.unsplash.com/collection/483251`,
            // image: `https://images.unsplash.com/photo-1480444704010-31f5e7c5707c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHw0ODMyNTF8fHx8fHx8MTY3ODk4MTk2Mg&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080`,
            // image: `https://images.unsplash.com/photo-1473294312123-83488e2f8e8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHw0ODQzNTF8fHx8fHx8MTY3ODUzMTgyNw&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080`,
            description: 'this is about our imgae .. this is very beautiful place every one must come here for a period of their life .. ',
            price,
            geometry: { type: 'Point',
            coordinates: [ 15.187539, 49.252448 ]
           },
            images:[
                {
                  url: 'https://res.cloudinary.com/dghd6ay0q/image/upload/v1679992167/project/d8ovrfklucqkcg9zwek0.jpg',
                  filename: 'project/d8ovrfklucqkcg9zwek0',
                //   _id: new ObjectId("6422a57d9b4cce1df3653b02")
                },
                {
                  url: 'https://res.cloudinary.com/dghd6ay0q/image/upload/v1679992172/project/y5iako3znmq22epivnmi.jpg',
                  filename: 'project/y5iako3znmq22epivnmi',
                //   _id: new ObjectId("6422a57d9b4cce1df3653b03")
                },
                {
                  url: 'https://res.cloudinary.com/dghd6ay0q/image/upload/v1679992189/project/crrc8qc5ajbncgfgv1xk.jpg',
                  filename: 'project/crrc8qc5ajbncgfgv1xk',
                //   _id: new ObjectId("6422a57d9b4cce1df3653b04")
                }
              ]
        })
        await camp.save();
    }
}
seedDB()
    .then(() => {
        mongoose.connection.close();
    })
