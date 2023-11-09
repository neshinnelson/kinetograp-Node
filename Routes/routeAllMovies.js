const express = require('express');
const router = express.Router();
const randomstring = require('randomstring')

//importing MODEL newreleases
let ModelAllMovies = require('../Models/modelAllMovies')
 
//get request handle
router.get('/',async(req,res)=>{
    const category = req.query.category && {movieCategory:req.query.category}
    const name = req.query.name && {movie:req.query.name}
    const status = req.query.status && {movieStatus:req.query.status}
    const id = req.query.id && {movieId:req.query.id}
    const director = req.query.director && {movieDirector:req.query.director}
    const year = req.query.year && {movieReleaseYear:parseInt(req.query.year)}

    const serarchQuery = category?category:name?name:status?status:id?id:director?director:year?year:{}
    console.log(serarchQuery);

    try{
        let data = await ModelAllMovies.find(serarchQuery)
        console.log('All data collected');
        res.json({ response:'success',data, message: 'All data collected' })
        
        // res.send('yes')
    }
    catch(error){
        console.log(error + ' data was unable to fetch');
        res.status(500).json({ error: 'Data was unable to fetch' });
    }
})

//post request handle
router.post('/',async(req,res)=>{
    try{
        let data = ModelAllMovies(req.body);
        data.movieId = randomstring.generate()+Math.round(Math.random()*4)
        await data.save()
        res.json({ response:'success',data, message: 'Movie is posted' });
        console.log('Movie is posted in /all-movies');
    }
    catch(error){
        console.log(error + ' Movie was unable to post');
        res.status(500).json({ error: 'Movie was unable to post' });
    }
})

//put request handle
// router.put('/:id',async(req,res)=>{
//     try{
//         let data = await ModelAllMovies.findByIdAndUpdate(req.params.id,req.body);
//         await data.save()
//         res.json({ data, message: 'Movie is updated' });
//     }
//     catch(error){
//         console.log(error + ' Movie was unable to update');
//         res.status(500).json({ error: 'Movie was unable to update' });
//     }
// })

// router.put('/update-all',async(req,res)=>{

//     try{
//        const all = await ModelAllMovies.find()
//        all.forEach(async elem=>
//         await ModelAllMovies.updateOne({movie: elem.movie},{movieStatus:'new release'})
//         )
//         res.json({response:'success'})
//     }catch(err){
//         console.log('error in updating all movie');
//         console.error(err);
//     }
// })

router.put('/:id',async(req,res)=>{
    if(Object.keys(req.body).length<1)return  res.status(404).json({
        response:'failed',message:'no req body found'})

    const id = req.params.id
    const update = req.body.retailers && {retailers:req.body.retailers}

    try{
        const data = await ModelAllMovies.updateOne({movieId:id},update)
        res.json({response:'updated',data})
    }catch(err){
        console.log(err);
    }
})

module.exports = router