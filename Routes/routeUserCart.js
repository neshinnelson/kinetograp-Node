const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//importing MODEL newreleases
let ModelUserCart = require("../Models/modelCart");

//get request handle
router.get("/:id", async (req, res) => {
  //checkig whether id exists ?
  const userId = req.params.id && req.params.id
  if(!userId)return res.status(406).json({
    response:'failed',message:'no user id in params !'
  })

  try {
    const data = await ModelUserCart.find({userId:userId});
    // if no data found
    if(data.length<1) return res.json({
      response:'failed',message:'no cart found for the user !'
    })
    res.json({ response:'success',message: "user cart collected",data });

  } catch (error) {
    console.log(error + " data was unable to fetch");
    res.status(500).json({ error: "Data was unable to fetch" });
  }
});

//post request handle
router.post("/", async (req, res) => {
  console.log(req.body);
  //checking whether req.body exists ? 
  if(Object.keys(req.body).length<1)return res.status(404).json({
    response:'failed',message:'no req body fopund !'
  })
  //checking user id and movie name exists ? 
  if(!req.body.userId||!req.body.movieName) return res.status(404).json({
    response:'failed',message:'no userName or movieName found !'
  })
  try {
    let data = ModelUserCart(req.body);
    await data.save();

    res.json({ response:'success',message: "Data is posted"});
  } catch (error) {
    console.log(error + " data was unable to post");
    res.status(500).json({ error: "Data was unable to post! check data entered!" });
  }
});

//put request handle
router.put("/:id", async (req, res) => {
  try {
    let data = await ModelUserCart.findByIdAndUpdate(req.params.id, req.body);
    await data.save();
    res.json({ data, message: "Data is updated" });
  } catch (error) {
    console.log(error + " data was unable to update");
    res.status(500).json({ error: "Data was unable to update" });
  }
});

//Delte from cart
router.delete("/:id", async (req, res) => {
    const id = req.params.id && req.params.id
    //checking whether user id exists ?
    if(!id) return res.status(404).json({
      response:'failed',message:'no user id found !'
    })

  try {
    const data = await ModelUserCart.findByIdAndDelete(id);

    res.json({ response:'success',message: "Data is deleted",data });
  } catch (error) {
    console.log(error + " data was unable to delete");
    res.status(500).json({ error: "Data was unable to delete" });
  }
});

module.exports = router;
