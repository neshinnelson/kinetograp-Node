const express = require('express')
const mongoose = require('mongoose');

const newReleasesSchema = new mongoose.Schema({
    movie:{type: String, required: true},
    movieCategory:{type: String, required: true},
    movieImgLandscape:{type: Array, required: true},
    movieImgPortrait:{type:Array, required: true},
    movieDescription:{type: String, required: true},
    movieDirector:{type: String, required: true},
    movieActors:{type: Array, required: true},
    moviePrice:{type: Number, required: true},
    movieButton:{type: String, required: true},
})

module.exports = new mongoose.model('new releases',newReleasesSchema);