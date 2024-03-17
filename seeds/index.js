const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground({
            author: "65f3efca0d2471077c90c0a0",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt ducimus, odit modi voluptatum rerum sit dolor error. Consequuntur, nemo? Excepturi, veritatis tenetur! Placeat est rerum maxime! Corrupti vitae ipsa perspiciatis.",
            price,
            geometry: {
              type: "Point",
              coordinates: [cities[random1000].longitude, cities[random1000].latitude],
          },
            images: [
                {
                  url: 'https://res.cloudinary.com/ds8wwev7y/image/upload/v1710629960/YelpCamp/hr5emt1jgiyd0om7twps.jpg',
                  filename: 'YelpCamp/phwg7o784igeexarjeby',
                },
                {
                  url: 'https://res.cloudinary.com/ds8wwev7y/image/upload/v1710629960/YelpCamp/vsgvljcsi6iuqiomiaoj.jpg',
                  filename: 'YelpCamp/pbl92qaivy4yeifmzkjf',
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})