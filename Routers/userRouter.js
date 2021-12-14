const express = require('express');
// const { appendFile } = require('fs');
const userRouter = express.Router();
const { getUser, getAllUser, updateUser, deleteUser, postUser, updateProfileImage } = require('../controller/userController');
// const protectRoute = require('./authHelper');
// const app = express();
// const {isAuthorized} = require('../controller/userController');
const { userSignup, loginUser, isAuthorized, protectRoute, forgetPassword, resetPassword, logoutUser } = require('../controller/authController');
const multer = require('multer');

userRouter
    .route('/:id')
    .patch(updateUser)
    .delete(deleteUser)

userRouter.route('/signup').post(userSignup);
userRouter.route('/login').post(loginUser);
userRouter.route('/logout').get(logoutUser);


userRouter.route('/forgetPassword')
    .post(forgetPassword);
userRouter.route('/resetPassword/:token')
    .post(resetPassword);


//multer 

const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'C:/Users/lavpreet singh/OneDrive/Desktop/gtbit web dev/Backend/learn/public');
    },
    filename: function (req, file, cb) {
        cb(null, `user-${Date.now()}.jpeg`);
    }
});

const filter = function (req, file, cb) {
    if (file.mimetype.startsWith("image")) {
        cb(null, true)
    } else {
        cb(new Error("Not an image:please upload an image"), false)
    }
}
const upload = multer({
    storage: multerStorage,
    fileFilter: filter
});
userRouter.post("/ProfileImage", upload.single("photo"), updateProfileImage);

userRouter.get('/ProfileImage', (req, res) => {
    res.sendFile("C:/Users/lavpreet singh/OneDrive/Desktop/gtbit web dev/Backend/learn/multer.html");
})
userRouter.use(protectRoute);
userRouter
    .route('/userProfile')
    .get(getUser)



//admin specific function

userRouter.use(isAuthorized(['admin']));
userRouter
    .route('/')
    .get(getAllUser)




// let flag = false;


module.exports = userRouter;
