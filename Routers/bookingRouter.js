const express = require('express');
const { createSession } = require("../controller/bookingController");
const bookingRouter = express.Router();
const { protectRoute } = require('../controller/authController');
bookingRouter.post('/createSession', protectRoute, createSession);
bookingRouter.get('/createSession', function (req, res) {
    res.sendFile('C:/Users/lavpreet singh/OneDrive/Desktop/gtbit web dev/Backend/learn/public/index.html');
});

module.exports = bookingRouter;