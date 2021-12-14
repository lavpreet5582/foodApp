const mongoose = require('mongoose');
const emailValidator = require('email-validator');
// const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { db_link } = require('../../secrets');
mongoose.connect(db_link).then(function (db) {
    // console.log(db);
    console.log('Database connected');
}).catch(function (err) {
    console.log(err);
});

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: function () {
            return emailValidator.validate(this.email);
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    confirmPassword: {
        type: String,
        required: true,
        minLength: 8,
        validate: function () {
            return this.confirmPassword == this.password;
        }
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'restaurantowner', 'deleveryboy'],
        default: 'user'
    },
    profileImage: {
        type: String,
        default: 'img/users/default.jpeg'
    },
    resetToken: String

});

//mongoose hooks

userSchema.pre('save', function () {
    this.confirmPassword = undefined;
    // console.log('before saving in database',this);
});
// userSchema.pre('save',async function(){
//     let salt = await bcrypt.genSalt();
//     let hashedString =await bcrypt.hash(this.password,salt);
//     // console.log(hashedString);
//     this.password = hashedString;
// })
// userSchema.post('save',function(doc){
//     console.log('After saving in database');
//     // console.log(doc);
// });

userSchema.methods.createResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.resetToken = resetToken;
    return resetToken;
}


userSchema.methods.resetPasswordHandler = function(password,confirmPassword){
    this.password = password;
    this.confirmPassword = confirmPassword;

    this.resetToken = undefined;
}
//modal

const userModel = mongoose.model('userModel', userSchema);


// (async function createUser() {
// let user = {
//     name: 'Neeraj Singh',
//     email: 'abcd@gmail.com',
//     password: '12345678',
//     confirmPassword: '12345678'
// }

//     let data = await userModel.create(user);
//     console.log(data);

// })();
module.exports = userModel;