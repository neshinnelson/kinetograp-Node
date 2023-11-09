const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//importing MODEL newreleases
let ModelUserWishlist = require("../Models/modelWhishList");

//get request handle
router.get("/", async (req, res) => {
  try {
    let data = await ModelUserWishlist.find();
    res.json({ data, message: "All data collected" });
    // res.send('yes')
  } catch (error) {
    console.log(error + " data was unable to fetch");
    res.status(500).json({ error: "Data was unable to fetch" });
  }
});

//post request handle
router.post("/", async (req, res) => {
  try {
    let data = ModelUserWishlist(req.body);
    await data.save();
    res.json({ data, message: "Data is posted" });
  } catch (error) {
    console.log(error + " data was unable to post");
    res.status(500).json({ error: "Data was unable to post" });
  }
});

//put request handle
router.put("/:id", async (req, res) => {
  try {
    let data = await ModelUserWishlist.findByIdAndUpdate(req.params.id, req.body);
    await data.save();
    res.json({ data, message: "Data is updated" });
  } catch (error) {
    console.log(error + " data was unable to update");
    res.status(500).json({ error: "Data was unable to update" });
  }
});

//Delte request handle
router.delete("/:id", async (req, res) => {
    let id = req.params.id
    // console.log(id)
  try {
    let data = await ModelUserWishlist.findByIdAndDelete(id);
    // let data = await ModelUserCart.deleteOne({_id:id});
    // await data.save();
    res.json({ data, message: "Data is deleted" });
  } catch (error) {
    console.log(error + " data was unable to delete");
    res.status(500).json({ error: "Data was unable to delete" });
  }
});

module.exports = router;
