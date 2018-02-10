const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
   name: {
       type: String,
       required: true
   },
    rating : {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    review: {
       type: String,
        required: true
    },
    createdOn: {
       type: Date,
        default: Date.now
    }
});

const roomSchema = new mongoose.Schema({
   type: String,
   number: Number,
   description: String,
   photos: [String],
   price: Number
});

const hotelSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    stars : {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    services :  [String],
    description : String,
    photos: [String],
    currency: String,
    reviews: [reviewSchema],
    rooms: [roomSchema],
    location: {
        address: String,
        // Always store coordinates longitude(E/W) and latitude(N/S)
        coordinates: {
            type: [Number],
            index: '2dsphere'
        }
    }
});

mongoose.model('Hotel', hotelSchema);


