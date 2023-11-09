
const mongoose = require('mongoose');

const userCartTotalSchema = new mongoose.Schema({
    userCartTotal:{type: Number, required: true},
    
})

module.exports = new mongoose.model('user cart total',userCartTotalSchema);