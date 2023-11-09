const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

//importing MODEL newreleases
let ModelupComing = require('../Models/modelUpComingReleases')
 
//get request handle
router.get('/',async(req,res)=>{
    try{
        let data = await ModelupComing.find();
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
        let data = ModelupComing(req.body);
        await data.save()
        res.json({ data, message: 'Data is posted' });
    }
    catch(error){
        console.log(error + ' data was unable to post');
        res.status(500).json({ error: 'Data was unable to post' });
    }
})

//put request handle
router.put("/:id", async (req, res) => {
    try {
      let data = await ModelupComing.findByIdAndUpdate(req.params.id, req.body);
      await data.save();
      res.json({ data, message: "Data is updated" });
    } catch (error) {
      console.log(error + " data was unable to update");
      res.status(500).json({ error: "Data was unable to update" });
    }
  });


module.exports = router