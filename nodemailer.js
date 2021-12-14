const nodemailer = require('nodemailer');
const {email,mailpass} = require('../secrets');

// let testAccount = await nodemailer.createTestAccount();
module.exports.sendMail = async function sendMail(str, data) {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: email, // generated ethereal user
            pass: mailpass, // generated ethereal password
        },
    });
    var Osubject,Otext,Ohtml;

    if(str == "signup"){
        Osubject = `Thank You For signing ${data.name}`;
        Ohtml = `
        <h1>Welcome to FoodApp.com</h1>
        Hope you have a good time !
        Here are your details
        Name - ${data.name}
        Email - ${data.email}`
    }else {
        if(str == 'resetPassword'){
            Osubject = `Reset Password`;
            Ohtml=`
            <h1>FoodApp.com<h1>
            Here is your link to reset your password !
            ${data.resetPasswordLink}
            `
        }
    }

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"FoodApp 👻" <lsv2885657@gmail.com>', // sender address
        to: data.email, // list of receivers
        subject: Osubject, // Subject line
        text: "Hello world?", // plain text body
        html: Ohtml, // html body
    });

    console.log("Message sent: %s", info.messageId);
}