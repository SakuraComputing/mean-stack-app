const mongoose = require('mongoose');
const Hotel = mongoose.model('Hotel');

module.exports.reviewsGetAll = function (req, res) {
    const hotelId = req.params.hotelId;
    console.log("GET the hotel " + hotelId);

    Hotel
        .findById(hotelId)
        .select('reviews')
        .exec(function(err,doc) {
            console.log("Returned document" + doc);
            res
                .status(200)
                .json( doc.reviews );
        });

};

module.exports.reviewsGetOne = function (req, res) {
    const hotelId = req.params.hotelId;
    const reviewId = req.params.reviewId;
    console.log("GET reviewId " + reviewId + " for hotelId " + hotelId);

    Hotel
        .findById(hotelId)
        .select('reviews')
        .exec(function(err,hotel) {
            console.log("Returned document" + hotel);
            const review = hotel.reviews.id(reviewId);
            res
                .status(200)
                .json( review );
        });


};
