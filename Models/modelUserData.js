const express = require('express')
const mongoose = require('mongoose');

const userDataSchema = new mongoose.Schema({
    userFName:{type: String, required: [true, 'why no first name ?']},
    userSName:{type: String, required: [true, 'why no second name ?']},
    userName:{type: String, required: [true, 'why no username ?']},
    userPass:{type: String, required: [true, ' why no password ?']},
    userEMail:{type: String, required: [true, 'why no email ?']},
    userId:{type:String,required:[true, 'why no user id ?']},
    boughtItems:{type:Array},
    address:{type:Object}
})

module.exports = new mongoose.model('user data',userDataSchema);