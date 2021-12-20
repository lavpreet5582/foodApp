const reviewModel = require('../models/reviewModel');
const planModel = require('../models/planModel');
module.exports.getAllReviews = async function getAllReviews(req, res) {

    try {
        const allReviews = await reviewModel.find();
        if (allReviews) {
            return res.json({
                message: "reviews retrieved",
                data: allReviews
            });
        } else {
            return res.json({
                message: 'reviews not found'
            });
        }

    } catch (error) {
        return res.json({
            message: error.message
        });
    }


}

module.exports.top3Reviews = async function top3Reviews(req, res) {

    try {
        const top3 = await reviewModel.find().sort({
            rating: -1
        }).limit(3);
        if (top3) {
            return res.json({
                message: "reviews retrieved",
                data: top3
            });
        } else {
            return res.json({
                message: 'reviews not found'
            });
        }

    } catch (error) {
        return res.json({
            message: error.message
        });
    }

}

module.exports.getPlanReviews = async function getPlanReviews(req, res) {

    try {
        let planId = req.params.id;
        let reviews = await reviewModel.find();
        reviews = reviews.filter(rev => {
            // console.log(rev.plan);
            return rev.plan._id == planId;
        })
        // console.log(review);
        if (reviews) {
            return res.json({
                message: "reviews retrieved",
                data: reviews
            });
        } else {
            return res.json({
                message: 'reviews not found'
            });
        }

    } catch (error) {
        return res.json({
            message: error.message
        });
    }

}


module.exports.createReview = async function createReview(req, res) {
    try {
        let id = req.params.plan;
        // console.log(id);
        let plan = await planModel.findById(id);
        // console.log(plan);
        let review = await reviewModel.create(req.body);
        // console.log(review);
        if (plan) {
            plan.rating = Math.round(((plan.rating + req.body.rating) / 2) * 10 / 10);
            plan.noOfReviews = plan.noOfReviews + 1;
            // plan.noOfReviews  = 1;
            await plan.save();
            return res.json({
                message: 'review created successfully',
                data: review
            });

        } else {
            return res.json({
                message: 'plan not found'
            });
        }

    } catch (error) {
        return res.json({
            message: error.message
        });
    }

}

module.exports.updateReview = async function updateReview(req, res) {
    try {
        let id = req.params.id;
        let dataToBeUpdated = req.body;
        let keys = [];
        for (let key in dataToBeUpdated) {
            keys.push(key);
        }
        let review = await reviewModel.findById(id);
        console.log(review);
        if (review) {
            for (let i = 0; i < keys.length; i++) {
                review[keys[i]] = dataToBeUpdated[keys[i]];
            }
            await review.save();
            return res.json({
                message: 'review updated successfully',
                data: review
            })
        } else {
            return res.json({
                message: 'review not found'
            })
        }

    } catch (error) {
        res.json({
            message: error.message
        });
    }
}

module.exports.deleteReview = async function deleteReview(req, res) {
    try {
        let id = req.params.id;
        // console.log(id);
        // let review = await reviewModel.findById(id);
        // console.log(planId);
        const deletedReview = await reviewModel.findByIdAndDelete(id);
        let planId = deletedReview.plan._id;
        console.log(planId);
        let plan = await planModel.findById(planId);
        plan.noOfReviews = plan.noOfReviews - 1;
        await plan.save();
        if (deletedReview) {
            return res.json({
                message: 'review deleted successfully',
                data: deletedReview
            });
        } else {
            return res.json({
                message: 'review not found'
            });
        }

    } catch (err) {
        return res.json({
            message: err.message
        });
    }

}