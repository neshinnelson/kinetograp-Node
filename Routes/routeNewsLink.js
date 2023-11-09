const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

//importing MODEL newreleases
let ModelNewsLink = require('../Models/modelNewsLinks')
 
//get request handle
router.get('/',async(req,res)=>{
    try{
        let data = await ModelNewsLink.find();
        res.json({ data, message: 'All data collected' })
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
        let data = ModelNewsLink(req.body);
        await data.save()
        res.json({ data, message: 'Data is posted' });
    }
    catch(error){
        console.log(error + ' data was unable to post');
        res.status(500).json({ error: 'Data was unable to post' });
    }
})

module.exports = router