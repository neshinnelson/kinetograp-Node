
const mongoose = require('mongoose');

const allMoviesSchema = new mongoose.Schema({
    movie:{type: String, required: true},
    movieCategory:{type: String, required: true},
    movieImgLandscape:{type: Array, required: true},
    movieImgPortrait:{type:Array, required: true},
    movieDescription:{type: String, required: true},
    movieDirector:{type: String, required: true},
    movieActors:{type: Array, required: true},
    moviePrice:{type: Number, required: true},
    movieButton:{type: String, required: true},
    movieReleaseYear:{type: Number, required: true},
    movieRoute:{type:String, required: true},
    movieId:{type:String,required:true},
    movieStatus:{type:String,
                required:[true,'must have a status'],
                enum:{
                    values:['new release','upcomming','released'],
                    message: '{VALUE} is not supported'},
                default:'new release'},
    trailerLink:{type:String},
    retailers:{type:Array}            
})

module.exports = new mongoose.model('all movie',allMoviesSchema);