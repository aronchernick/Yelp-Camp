const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

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
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '608afcb9c76f205d994f7d0a',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
              type: "Point",
              coordinates: [ 
                cities[random1000].longitude,
              cities[random1000].latitude,
            ]
          },
            images: [
                {
                    url: 'https://res.cloudinary.com/aronchernick/image/upload/v1619986132/yelpCamp/smgemzbaflbjanccezpc.jpg',
                    filename: 'yelpCamp/smgemzbaflbjanccezpc'
                  },
                  {
                    url: 'https://res.cloudinary.com/aronchernick/image/upload/v1619986134/yelpCamp/gihlvt4xodpaqszweprm.jpg',
                    filename: 'yelpCamp/gihlvt4xodpaqszweprm'
                  },
                  {
                    url: 'https://res.cloudinary.com/aronchernick/image/upload/v1619986135/yelpCamp/bx6znm0pytijozxatufy.jpg',
                    filename: 'yelpCamp/bx6znm0pytijozxatufy'
                  },
                  {
                    url: 'https://res.cloudinary.com/aronchernick/image/upload/v1619986135/yelpCamp/g4xr4p66fglju8e1qmbj.jpg',
                    filename: 'yelpCamp/g4xr4p66fglju8e1qmbj'
                  }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})