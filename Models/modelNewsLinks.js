const express = require('express')
const mongoose = require('mongoose');

const newsLinksSchema = new mongoose.Schema({
    newsTitle:{type:String,required: true},
   newsLink:{type:String,required: true}
})

module.exports = new mongoose.model('news-link',newsLinksSchema);