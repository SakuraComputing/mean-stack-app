const express = require('express');
const router = express.Router();
const ctrlHotels = require('../controllers/hotels.controllers');
const ctrlReviews = require('../controllers/reviews.controllers');
const ctrlUsers = require('../controllers/users.controllers');

router
    .route("/hotels")
    .get(ctrlUsers.authenticate, ctrlHotels.hotelsGetAll)
    .post(ctrlHotels.hotelsAddOne);

router
    .route("/hotels/:hotelId")
    .get(ctrlHotels.hotelsGetOne)
    .put(ctrlHotels.hotelsUpdateOne)
    .delete(ctrlHotels.hotelsDeleteOne);

//Reviews

router
    .route("/hotels/:hotelId/reviews")
    .get(ctrlReviews.reviewsGetAll)
    .post(ctrlReviews.reviewsAddOne);

router
    .route("/hotels/:hotelId/reviews/:reviewId")
    .get(ctrlReviews.reviewsGetOne)
    .put(ctrlReviews.reviewsUpdateOne)
    .delete(ctrlReviews.reviewsDeleteOne);

router
    .route("/users/register")
    .post(ctrlUsers.register);

router
    .route("/users/login")
    .post(ctrlUsers.login);

module.exports = router;
