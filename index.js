const express = require('express');
const app = express()
const mongoose = require('mongoose')
const port = 4002
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config();

const mongodbConnection = process.env.MONGOBD_CONNECTION_STRING
mongoose.connect(mongodbConnection, { useNewUrlParser: true, useUnifiedTopology: true })

// Handling MongoDB connection events
const db = mongoose.connection;
db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});
db.once('open', () => {
  console.log('Connected to MongoDB successfully!');
});
//importing ROUTES
const routeNewRelase = require('./Routes/routeNewReleases')
const routeUpComingReleases = require('./Routes/routeUpComingReleases')
const routeNewsLinks = require('./Routes/routeNewsLink')
const routeUserData = require('./Routes/routeUserData')
const routeUserCart = require('./Routes/routeUserCart')
const routeUserCartTotal = require('./Routes/routeUserCartTotal')
const routeAllMovies = require('./Routes/routeAllMovies')
const routeWishList = require('./Routes/routeUserWishList')

app.use(cors())
app.use(express.json());
app.use(morgan('tiny'))
app.use(express.static('public'))

//using imported ROUTES
app.use('/new-releases',routeNewRelase)
app.use('/all-movies',routeAllMovies)
app.use('/upcoming-releases',routeUpComingReleases)
app.use('/news-links',routeNewsLinks)
app.use('/user',routeUserData)
app.use('/user-cart',routeUserCart)
app.use('/user-cart-total',routeUserCartTotal)
app.use('/user-wish-list',routeWishList)


app.listen(port,()=>{
    console.log(`example app running on port ${port}`)
})