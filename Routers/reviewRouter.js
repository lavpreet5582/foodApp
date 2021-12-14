// const reviewModel = require('../models/reviewModel');
const express = require('express');
const reviewRouter = express.Router();
const { protectRoute } = require('../controller/authController');
const {getAllReviews,getPlanReviews,updateReview,deleteReview,createReview,top3Reviews} = require('../controller/reviewController');

reviewRouter.route('/all')
    .get(getAllReviews);



reviewRouter
    .route('/top3')
    .get(top3Reviews);


reviewRouter
    .route('/:id')
    .get(getPlanReviews);


reviewRouter.use(protectRoute);
reviewRouter
    .route('/crud/:plan')
    .post(createReview);

reviewRouter
    .route('/crud/:id')
    .patch(updateReview)
    .delete(deleteReview);

module.exports = reviewRouter;