const userModel = require('../models/userModel');


module.exports.getAllUser = async function getAllUser(req, res) {
    let allUsers = await userModel.find();
    // let user = await userModel.findOne({name:'Lavpreet Singh'});
    if(allUsers){
        res.json({
            message:"users retrieved",
            data:allUsers
        });
    }else {
        res.json({
            message:'users not found'
        });
    }
    
}

module.exports.postUser = function postUser(req, res) {
    let users = req.body;
    res.json({
        messgae: 'data recieved',
        user: users
    });
}

module.exports.updateUser = async function updateUser(req, res) {
    // console.log('req.body -> ', req.body);
    try {
        let dataToBeUpdated = req.body;
        let id = req.params.id;
        let user = await userModel.findById(id);
        // let user = await userModel.findOneAndUpdate({ email: 'abcde@gmail.com' }, dataToBeUpdated);
        if (user) {
            const keys = [];

            for (let key in dataToBeUpdated) {
                keys.push(key);
            }

            for (let i = 0; i < keys.length; i++) {
                user[keys[i]] = dataToBeUpdated[keys[i]];
            }
            const updatedData = await user.save();
            res.json({
                message: "data updated successfully"
            })
        } else {
            res.json({
                message: "user not found"
            })
        }
    } catch (error) {
        res.json({
            message: error.message
        })
    }

    // for (key in dataToBeUpdated) {
    //     users[key] = dataToBeUpdated[key];
    // }
}

module.exports.deleteUser = async function deleteUser(req, res) {
    // users = {};
    try {
        let id = req.params.id;
        let user = await userModel.findByIdAndDelete(id);
        if (!user) {
            res.json({
                message: 'user not found'
            });
        }
        res.json({
            message: "data has been deleted"
            , data: user
        });

    } catch (error) {
        res.json({
            message: error.message
        });
    }

}

module.exports.getUser = async function getUser(req, res) {
    // console.log(req.id);
    let id = req.id;
    let user = await userModel.findById(id);
    // console.log(req.params.username);
    if (user) {
        return res.json(user);
    } else {
        return res.json({
            message: 'users not found'
        });
    }

}

module.exports.updateProfileImage = function updateProfileImage(req,res){
    res.json({
        message:'file Uploaded'
    });
}

// function setCookies(req, res) {
//     // res.setHeader('Set-Cookie','isLoggedIn=true');
//     res.cookie('isLoggedIn', true, { maxAge: 1000 * 60 * 60 * 24, secure: true, httpOnly: true });
//     res.cookie('isPrimeMember', false);

//     res.send('cookies has been set');
// }
// function getCookies(req, res) {
//     let cookies = req.cookies;
//     console.log(cookies);
//     res.send('cookies Recieved');

// }

