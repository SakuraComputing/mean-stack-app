const mongoose = require('mongoose');
const Hotel = mongoose.model('Hotel');

const runGeoQuery = function (req, res) {
    const lng = parseFloat(req.query.lng);
    const lat = parseFloat(req.query.lat);

    const point = {
        type: "Point",
        coordinates: [lng,lat]
    };

    const geoOptions = {
        spherical: true,
        maxDistance: 2000,
        num: 5
    };

    Hotel
        .geoNear(point, geoOptions, function (err, results, stats) {
            console.log('Geo results', results);
            console.log('Geo stats', stats);
            res
                .status(200)
                .json(results);
        });
};


module.exports.hotelsGetAll = function (req, res) {

    var offset = 0;
    var count = 5;

    if(req.query && req.query.lat && req.query.lng) {
        runGeoQuery(req, res);
        return;
    }

    if(req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }

    if(req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }

    Hotel
        .find()
        .skip(offset)
        .limit(count)
        .exec(function (err, hotels) {
            console.log("Found Hotels", hotels.length);
            res
                .json(hotels);
        });
};

module.exports.hotelsGetOne = function (req, res) {

    var hotelId = req.params.hotelId;
    console.log("GET the hotel " + hotelId);

    Hotel
        .findById(hotelId)
        .exec(function(err,doc) {
            res
                .status(200)
                .json( doc );
    });

};

var _splitArray = function (input) {
    var output;
    if(input && input.length > 0) {
        output = input.split(";");
    } else {
        output = []
    }
    return output;
 };

module.exports.hotelsAddOne = function (req, res) {

    Hotel
        .create({
            name: req.body.name,
            desciption: req.body.desciption,
            stars: parseInt(req.body.stars,10),
            services: _splitArray(req.body.services),
            photos: _splitArray(req.body.photos),
            currency: req.body.currency,
            location: {
                address: req.body.address,
                coordinates: [
                    parseFloat(req.body.lng),
                    parseFloat(req.body.lat)
                ]
            }
        }, function (err, hotel) {
            if(err) {
                console.log("Error creating hotel");
                res.status(400)
                    .json(err);
            } else {
                console.log("Hotel created", hotel);
                res
                    .status(201)
                    .json(hotel)
            }
        });
};

module.exports.hotelsUpdateOne = function (req, res) {

    var hotelId = req.params.hotelId;
    console.log("GET the hotel " + hotelId);

    Hotel
        .findById(hotelId)
        .select("-reviews -rooms")
        .exec(function(err,doc) {
            var response = {
                status: 200,
                message: doc
            };
            if(err) {
                console.log("Error finding hotel");
                response.status = 500;
                response.message = err;
            } else if(!doc) {
                response.status = 404;
                response.messsage = {
                    message: "Hotel Id not found"
                };
            }
            if (response.status !== 200) {
                res
                    .status(response.status)
                    .json(response.message);
            } else {
                doc.name = req.body.name;
                doc.desciption =  req.body.desciption;
                doc.stars = parseInt(req.body.stars,10);
                doc.services =  _splitArray(req.body.services);
                doc.photos =  _splitArray(req.body.photos);
                doc.currency =  req.body.currency;
                doc.location = {
                address: req.body.address,
                    coordinates: [
                    parseFloat(req.body.lng),
                    parseFloat(req.body.lat)
                ]
            };

            doc.save(function (err, hotelUpdated) {
                if(err) {
                    res
                        .status(500)
                        .json(err);
                } else {
                    res
                        .status(204)
                        .json()
                }
            });

            }
        });
};

module.exports.hotelsDeleteOne = function (req, res) {
    const hotelId = req.params.hotelId;

    Hotel
        .findByIdAndRemove(hotelId)
        .exec(function (err, hotel) {
           if(err) {
               res
                   .status(404)
                   .json(err)
           } else {
               console.log("Hotel Deleted, id: ", hotelId);
               res
                   .status(204)
                   .json();
           }
        });
};
