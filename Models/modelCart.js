
const mongoose = require('mongoose');

const userCartSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:[true,'why no userId']
    },
    movieName:{
        type:String, 
        required : [true,'why no movie name']
    },
    moviePortraitImg:{
        type:String, 
        required : [true, 'why no img']
    },
    movieDescription:{
        type:String, 
        required : [true,'why no description']
    },
    moviePrice:{
        type:Number, 
        required : [true, 'why no movie price']
    },
    movieButton:{
        type: String,
        required: [true, 'why no movie button']
    },
    quantity:{
        type:Number,
    }      
})

module.exports = new mongoose.model('user cart',userCartSchema);