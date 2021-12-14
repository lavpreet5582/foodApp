const { JWT_Key } = require('../../secrets');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const { sendMail } = require('../nodemailer');


// function getSignup(req, res) {
//     res.sendFile('/public/index.html', { root: __dirname });
// }

// async function postSignup(req, res) {
//     let obj = req.body;
//     let user = await userModel.create(obj);
//     res.json({
//         message: "user signed up",
//         data: user
//     });
// }


module.exports.userSignup = async function userSignup(req, res) {
    try {
        let data = req.body;
        let user = await userModel.create(data);
        sendMail("signup",user);
        if (user) {
            return res.json({
                message: "user Signed Up",
                data: user
            })
        } else {
            return res.json({
                message: "Error while signing up"
            })
        }

    } catch (error) {
        return res.json({
            message: error.message
        })
    }
}


module.exports.loginUser = async function loginUser(req, res) {
    try {
        let data = req.body;
        if (data.email) {
            let user = await userModel.findOne({ email: data.email });
            if (user) {
                if (user.password == data.password) {
                    // res.cookie('isLoggedIn',true,{httpOnly:true});
                    let uid = user['_id']; //uid
                    let token = jwt.sign({ payload: uid }, JWT_Key);
                    res.cookie('isLoggedIn', token, { httpOnly: true });


                    return res.json({
                        message: 'User logged in',
                        userDetail: data
                    })
                } else {
                    return res.json({
                        message: 'Credentials are wrong'
                    })
                }

            } else {
                return res.json({
                    message: 'user not found'
                });
            }
        } else {
            return res.json({
                message: 'Empty field found'
            })
        }

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }


}


module.exports.isAuthorized = function isAuthorized(roles) {
    return function (req, res, next) {
        if (roles.includes(req.role) == true) {
            next();
        } else {
            res.status(401).json({
                message: "Operation not allowed"
            });
        }
    }
}

module.exports.protectRoute = async function protectRoute(req, res, next) {
    try {
        let token;

        if (req.cookies.isLoggedIn) {
            token = req.cookies.isLoggedIn;
            let payload = jwt.verify(token, JWT_Key);
            // console.log('payload',payload);
            if (payload) {
                const user = await userModel.findById(payload.payload);
                // console.log(user);
                req.role = user.role;
                req.id = user.id;
                // console.log(req.id);
                next();
            } else {
                return res.json({
                    message: "user not verified"
                })
            }

        } else {
            const client = req.get('User-Agent');
            if(client.includes("Chrome") == true){
                return res.redirect('/login');
            }
            res.json({
                message: "plz Login"
            });
        }
    } catch (error) {
        return res.json({
            message: error.message
        })
    }

}


module.exports.forgetPassword = async function forgetPassword(req, res) {
    let { emailv } = req.body;
    try {
        const user = await userModel.findOne({ email: emailv });

        if (user) {
            const resetToken = user.createResetToken();
            let resetPassLink = `${req.protocol}://${req.get('host')}/resetPassword/${resetToken}`;
            let obj = {
                resetPassLink:resetPassLink,
                email:emailv
            }
            sendMail("resetPassword",obj);
        } else {
            res.json({
                message: 'Please Signup'
            });
        }

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

module.exports.resetPassword = async function resetPassword(req, res) {
    try {
        const token = req.params.token;
        let { password, confirmPassword } = req.body;

        const user = await userModel.findOne({ resetToken: token });
        if (user) {
            user.resetPasswordHandler(password, confirmPassword);
            await user.save();

            res.json({
                message: 'Password changed successfully Plz login again'
            });
        } else {
            res.json({
                message: 'user not valid'
            });
        }

    } catch (error) {
        res.json({
            message: error.message
        })
    }

}

module.exports.logoutUser = function logoutUser(req,res){
    res.cookie('isLoggedIn','',{maxAge:1});
    res.json({
        message:'user logged out successfully'
    });
}