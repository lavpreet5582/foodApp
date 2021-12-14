const mongoose = require('mongoose');

const { db_link } = require('../../secrets');
mongoose.connect(db_link).then(function (db) {
    // console.log(db);
    console.log('Database connected');
}).catch(function (err) {
    console.log(err);
});

const planSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        maxlength:[20,'Plan name should not exceed more than 20 characters']
    },
    duration:{
        type:Number,
        required:[true,'price not entered']
    },
    price:{
        type:Number,
        required:true
    },
    rating:{
        type:Number
    },
    discount:{
        type:Number,
        validate:[function(){
            return this.discount<100;
        },'discount should not exceed price']
    },
    noOfReviews:{
        type:Number,
        default:0
    }
});



const planModel = mongoose.model('planModel',planSchema);
// (async function createPlan(){
//     let planObj = {
//         name:'Super',
//         duration:30,
//         price:1000,
//         rating:5,
//         discount:20
//     }
//     let data  = await planModel.create(planObj);
//     console.log(data);
//     // const doc = new planModel(plan);
//     // await doc.save();
// })();
module.exports = planModel;