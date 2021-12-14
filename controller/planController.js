const planModel = require('../models/planModel');


module.exports.getAllPlans = async function getAllPlans(req, res) {
    try {
        let plans = await planModel.find();
        if (plans) {
            return res.json({
                message: 'all plans retrieved',
                data: plans
            });
        } else {
            return res.json({
                message: 'plans not found'
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

module.exports.getPlan = async function getPlan(req, res) {
    try {
        let id = req.params.id;
        let plan = await planModel.findById(id);
        if (plan) {
            return res.json({
                message: 'plan retrieved',
                data: plan
            });
        } else {
            return res.json({
                message: 'plan not found'
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

module.exports.createPlan = async function createPlan(req, res) {
    try {
        let planData = req.body;

        let createdPlan = await planModel.create(planData);


        return res.json({
            message: 'Plan created successfully',
            data: createdPlan
        })
    } catch (error) {
        res.json({
            message: error.message
        });
    }

}

module.exports.deletePlan = async function deletePlan(req, res) {
    try {
        let id = req.params.id;

        let plan = await planModel.findByIdAndDelete(id);
        if (plan) {
            return res.json({
                message: 'Plan deleted successfully'
            })
        } else {
            return res.json({
                message: 'plan not found'
            })
        }


    } catch (error) {
        res.json({
            message: error.message
        });
    }

}

module.exports.updatePlan = async function updatePlan(req, res) {
    try {
        let id = req.params.id;
        let dataToBeUpdated = req.body;
        let keys = [];
        for (let key in dataToBeUpdated) {
            keys.push(key);
        }
        let plan = await planModel.findById(id);
        if (plan) {
            for (let i = 0;i < keys.length;i++) {
                plan[keys[i]] = dataToBeUpdated[keys[i]];
            }
            await plan.save();
            return res.json({
                message: 'Plan updated successfully',
                data: plan
            })
        } else {
            return res.json({
                message: 'plan not found'
            })
        }


    } catch (error) {
        res.json({
            message: error.message
        });
    }

}

module.exports.top3Plans  = async function top3Plans(req,res){
    try {
        const t3plans = await planModel.find().sort({
            rating:-1
        }).limit(3);

        return res.json({
            message:'top 3 plans',
            data:t3plans
        })
    } catch (error) {
        return res.statue(500).json({
            message:error.message
        });
    }
}

