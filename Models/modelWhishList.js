
const mongoose = require('mongoose');

const userWishListSchema = new mongoose.Schema({
    // userCart:{type: Object, required: true},
    currentUserId:{type:String,required:true},
    movieName:{type:String, required : true},
    moviePortraitImg:{type:String, required : true},
    movieDescription:{type:String, required : true},
    moviePrice:{type:Number, required : true},
    movieButton:{type: String,required: true}      
})

module.exports = new mongoose.model('user wishlist',userWishListSchema);