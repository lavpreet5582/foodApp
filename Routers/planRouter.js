const express = require('express');
const { protectRoute, isAuthorized } = require('../controller/authController');
// const { appendFile } = require('fs');
const planRouter = express.Router();
const { getAllPlans, getPlan, updatePlan, deletePlan, createPlan, top3Plans } = require('../controller/planController');


//all plans 
planRouter.route('/allPlans')
    .get(getAllPlans);


planRouter.route('/top3').get(top3Plans);
//own plan
planRouter.use(protectRoute);
planRouter.route('/plan/:id')
    .get(getPlan);



planRouter.use(isAuthorized(['admin', 'restaurantowner']));
planRouter.route('/crudPlan')
    .post(createPlan);

planRouter.route('/crudPlan/:id')
    .patch(updatePlan)
    .delete(deletePlan);


module.exports = planRouter;