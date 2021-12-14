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
        const reviews = await reviewModel.find();
        const review = reviews.filter(rev=>{
            return rev.plan._id==planId;
        })
        // console.log(review);
        if (review) {
            return res.json({
                message: "reviews retrieved",
                data: review
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
            plan.rating = ((plan.rating * plan.noOfReviews) + req.body.rating) / (plan.noOfReviews + 1);
            plan.noOfReviews = plan.noOfReviews + 1;
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
        const deletedReview = await reviewModel.findByIdAndDelete(id);
        if (deletedReview) {
            return res.json({
                message: 'review deleted successfully'
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